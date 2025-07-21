import AllPdfs from "./components/AllPdfs";
import Dashboard from "./components/Dashboard";
import EmployeeCard from "./components/EmployeeCard";
import Template from "./components/Template";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import QRScanner from "./components/QRScanner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="scan-qr" element={<QRScanner/>}/>
          <Route path="/pdf" element={<AllPdfs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
