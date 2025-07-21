import { useState } from "react";

export default function Template({ setTemplateInfo }) {
  const [template, setTemplate] = useState("");
  const [pages, setPages] = useState(1);

  const handleTemplateChange = (e) => {
    const selected = e.target.value;
    setTemplate(selected);
    setTemplateInfo({ template: selected, pages });
  };

  const handlePagesChange = (e) => {
    const pageCount = parseInt(e.target.value) || 0;
    setPages(pageCount);
    setTemplateInfo({ template, pages: pageCount });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Template Selection
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Template
          </label>
          <select
            value={template}
            onChange={handleTemplateChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a Template --</option>
            <option value="default">Default (Details + QR)</option>
            <option value="qr-only">QR Code Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pages per Employee
          </label>
          <input
            type="number"
            value={pages}
            onChange={handlePagesChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            placeholder="Enter number of pages"
          />
        </div>
      </div>
    </div>
  );
}
