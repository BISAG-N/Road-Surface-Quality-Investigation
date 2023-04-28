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
  const generatePDF = (road) => {
    // const doc = new jsPDF();
    // doc.autoTable({ html: '#my-table' });
    var doc = new jsPDF();

    // var imgData = 'path/to/company/logo.png';
    doc.addImage(Logo, 'PNG', 60, 10, 100,40 );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Road Name', 105, 80, null, null, 'center');
    doc.setFontSize(14);
    doc.text(road.name, 130, 80, null, null, 'center');
    

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('District Name', 105, 90, null, null, 'center');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(road.district, 130, 90, null, null, 'center');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('State Name', 105, 100, null, null, 'center');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(road.state, 130, 100, null, null, 'center');
    

    var columns = ["Distress Type", "Distress Name", "Precision"];
    var data = [
      ["Type 1", "Name 1", "Precision 1"],
      ["Type 2", "Name 2", "Precision 2"],
      ["Type 3", "Name 3", "Precision 3"],
      // add more rows as necessary
    ];
    // var data=[]
    // road.distress.
    // data.push([])

    var startY = 110;
    var margin = { top: 10, right: 10, bottom: 10, left: 10 };
    doc.autoTable({
      head: [columns],
      body: data,
      startY: startY,
      margin: margin
    });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Severity', 105, doc.autoTable.previous.finalY + 10, null, null, 'center');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('High', 105, doc.autoTable.previous.finalY + 20, null, null, 'center');

    // var pdfOutput = doc.output();
    // var blob = new Blob([pdfOutput], { type: 'application/pdf' });
    // var url = URL.createObjectURL(blob);
    // window.open(url);
    doc.save('report.pdf');
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

      <div>
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
                <td className="py-3 px-6 text-left">{row.road.state}</td>
                <td className="py-3 px-6 text-left"><button onClick={()=>{generatePDF(row.road)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate PDF
      </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate PDF
      </button> */}
    </div>
    </div>

    
    
  );
}


export default InvestigationReport;

// var doc = new jsPDF();

// var imgData = 'path/to/company/logo.png';
// doc.addImage(imgData, 'PNG', 105, 10, 50, 50);

// doc.setFontSize(16);
// doc.setFontType('bold');
// doc.text('Road Name', 105, 80, null, null, 'center');
// doc.setFontSize(12);
// doc.setFontType('normal');
// doc.text('District Name, State Name', 105, 90, null, null, 'center');

// var columns = ["Distress Type", "Distress Name", "Precision"];
// var data = [
//   ["Type 1", "Name 1", "Precision 1"],
//   ["Type 2", "Name 2", "Precision 2"],
//   ["Type 3", "Name 3", "Precision 3"],
//   // add more rows as necessary
// ];

// doc.autoTable(columns, data, {
//   startY: 110,
//   margin: { top: 10, right: 10, bottom: 10, left: 10 }
// });

// doc.setFontSize(16);
// doc.setFontType('bold');
// doc.text('Severity', 105, doc.autoTable.previous.finalY + 10, null, null, 'center');
// doc.setFontSize(12);
// doc.setFontType('normal');
// doc.text('High', 105, doc.autoTable.previous.finalY + 20, null, null, 'center');