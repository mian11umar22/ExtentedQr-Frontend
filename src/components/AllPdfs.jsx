import { useState, useEffect } from "react";

export default function AllPdfs() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    async function fetchPdfs() {
      try {
        const response = await fetch(
          "https://extentedqr-backend-production.up.railway.app/qr/all-pdfs"
        );
        const data = await response.json();
        setPdfs(data.data); // access `data` key from { success: true, data: [...] }
      } catch (error) {
        console.error("Failed to fetch PDFs:", error);
      }
    }

    fetchPdfs();
  }, []);

  return (
    <div>
      {pdfs.map((employee, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{employee.name}</h3>
          <p>Email: {employee.email}</p>
          <p>Department: {employee.department}</p>

          <ul>
            {employee.pdfFiles.map((file, idx) => (
              <li key={idx}>
                <strong>File Name:</strong>{" "}
                <a
                  href={file.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.fileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
