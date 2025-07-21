import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import Template from "./Template";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [templateInfo, setTemplateInfo] = useState({ template: "", pages: 1 });

  const totalPages = selectedEmployees.length * templateInfo.pages;

 const handleGenerate = async () => {
   if (!templateInfo.template) {
     toast.error("Please select a template before generating.");
     return;
   }

   const loadingToast = toast.loading("Generating QR codes...");
   try {
     const response = await fetch(
       "https://extentedqr-backend-production.up.railway.app/qr/generate",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           employeeIds: selectedEmployees.map((emp) => emp._id),
           pagesPerEmployee: templateInfo.pages,
           templateType: templateInfo.template,
         }),
       }
     );

     if (!response.ok) throw new Error("Failed to generate QR codes");

     const { files } = await response.json();
     toast.success(`${files.length} QR codes added!`, { id: loadingToast });
   } catch (error) {
     console.error("Error generating QR codes:", error);
     toast.error("Failed to generate QR codes.", { id: loadingToast });
   }
 };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
          Employee Dashboard
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage your team and generate QR codes effortlessly.
        </p>
      </div>

      {/* Main content layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employee Directory Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Employee Directory
              </h2>
              <span className="text-sm text-gray-500">
                {selectedEmployees.length} selected
              </span>
            </div>

            {/* Employee List */}
            <EmployeeCard setSelectedEmployees={setSelectedEmployees} />
          </div>
        </div>

        {/* Template & Generator */}
        <div className="space-y-6">
          {/* Template Settings */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Template Settings
            </h2>

            <Template setTemplateInfo={setTemplateInfo} />

            <div className="mt-4 text-sm text-gray-600">
              <p>
                📋 Selected Employees:{" "}
                <strong>{selectedEmployees.length}</strong>
              </p>
              <p>
                📄 Total Pages: <strong>{totalPages}</strong>
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Generate QR Codes
            </h2>

            <button
              onClick={handleGenerate}
              disabled={!selectedEmployees.length || !templateInfo.template}
              className={`w-full px-5 py-2.5 rounded-md font-semibold transition duration-300 ${
                selectedEmployees.length && templateInfo.template
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              🚀 Generate & Print QR Codes
            </button>

            <p className="text-xs text-gray-500 mt-2">
              QR codes will be generated based on your selections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
