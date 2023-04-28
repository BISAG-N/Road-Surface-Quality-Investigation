import React from "react";
import { useEffect,useRef,useState } from "react";
// import DataTable from "react-data-table-component";
import axios from "axios";
import Logo from '../images/Logopng.png'

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function InvestigationReport() {
  const [tableData, setTableData] = useState([]);
  const uid = sessionStorage.getItem("userid");
  const [isLoaded, setLoaded] = useState(false);
  // Function to generate PDF when button is clicked
  const generatePDF = () => {
    // const doc = new jsPDF();
    // doc.autoTable({ html: '#my-table' });
    var doc = new jsPDF();

    doc.setFontSize(40);
    doc.text("Octonyan loves jsPDF", 35, 25);
    doc.addImage(Logo, "PNG", 15, 40, 180, 180);
    // doc.addImage()
    doc.save('table.pdf');
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    axios.get(`http://localhost:8000/road/get-report/${uid}`)
      .then(response => {
        setTableData(response.data);
        setLoaded(true)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded my-6">
        <table id="my-table" className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">City</th>
              <th className="py-3 px-6 text-left">Report</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tableData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{row.road.name}</td>
                <td className="py-3 px-6 text-left">{row.road.district}</td>
                <td className="py-3 px-6 text-left">{row.city}</td>
                <td className="py-3 px-6 text-left"><button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate PDF
      </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate PDF
      </button>
    </div>
  );
}


export default InvestigationReport;
