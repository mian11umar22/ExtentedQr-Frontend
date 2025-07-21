import Select from "react-select";
import { useEffect, useState } from "react";

export default function EmployeeCard({ setSelectedEmployees }) {
  const [emp, setEmp] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [localSelected, setLocalSelected] = useState([]);

  // Fetch employees
  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(
          "https://extentedqr-backend-production.up.railway.app/employee"
        );
        const data = await response.json();
        setEmp(data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchEmployee();
  }, []);

  // Convert to react-select format
  const options = emp.map((e) => ({
    label: e.Name,
    value: e.Email,
    ...e, // spread full object
  }));

  const handleSelectChange = (selectedOptions) => {
    const selectedEmployees = selectedOptions || [];
    setLocalSelected(selectedEmployees);
    setSelectedEmployees(selectedEmployees);
  };

  // Handle Add Employee
 const handleSubmit = async (e) => {
   e.preventDefault();
   const formData = new FormData(e.target);
   const newEmployee = {
     Name: formData.get("name"),
     Department: formData.get("department"),
     Email: formData.get("email"),
   };

   try {
     const response = await fetch(
       "https://extentedqr-backend-production.up.railway.app/employee/create",
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newEmployee),
       }
     );

     if (!response.ok) throw new Error("Failed to create employee");

     const result = await response.json(); // 👈 get the saved employee from response
     setEmp((prev) => [...prev, result.data]); // 👈 add full saved employee object
     e.target.reset();
     setShowForm(false);
   } catch (error) {
     console.error("Error submitting form:", error.message);
   }
 };


  return (
    <div className="w-full md:w-1/2 p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* 🔍 Multi-select dropdown */}
      <Select
        isMulti
        options={options}
        value={localSelected}
        onChange={handleSelectChange}
        placeholder="Search & select employees..."
        className="mb-6"
      />

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {showForm ? "Cancel" : "Add Employee"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded shadow space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <input
              type="text"
              name="department"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
