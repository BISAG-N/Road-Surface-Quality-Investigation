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


// const InvestigationReport = () => {

//   const uid = sessionStorage.getItem("userid");
//   const [reportData, setReportData] = useState({});
//   const [isLoaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const fetchData = async ()=>{
      
//       await axios
//         .get(`http://localhost:8000/road/get-report/${uid}`)
//         .then(report=>{
//           setReportData(report.data)
//           setLoaded(true)
//         })

//         .catch((er) => {
//           console.log(er);
//         });
//     }

//     fetchData();
//   }, [uid]);
//   console.log(reportData)
  
  
//   const columns = [
//     {
//       name: "Road Name",
//       selector: (row) => row.road.name,
//     },
//     {
//       name: "District",
//       selector: (row) => row.road.district,
//     },
//     {
//       name: "Action",
//       render: function () {
//         return `<button   class='btn btn-info btn-sm'>Edit</button>`;
//       },
//     }
//   ];
//   const data=[]
//   if(isLoaded){

//     reportData.forEach((report)=>{
//         data.push({id:report._id,road:report.road.name,district:report.road.district})
//     })

//   }
//   // const data = [
//   //   {
//   //     id: 1,
//   //     road: reportData[0].road.name,
//   //     district: reportData[0].road.district,
//   //   },
//   //   {
//   //     id: 2,
//   //     road: reportData[1].road.name,
//   //     district: reportData[1].road.district,
//   //   },
//   // ];

//   // const canvasRef=useRef();

//   // const drawRectangle= ()=>{
//   //   const context=canvasRef.current.getContext("2d");
//   //   context.strokeStyle = "white"
//   //   context.lineWidth = 2
//   //   context.strokeRect(474/2,214/4,109/2,285/2)
//   // }
//   // useEffect(()=>{
//   //   drawRectangle();
//   // },[])

//   // function MyComponent() {
//   //     return (
//   //         <DataTable
//   //             columns={columns}
//   //             data={data}
//   //         />
//   //     );
//   // };

//   return (
//     <>
//     {isLoaded ? (<DataTable />) : (<h1> Loading... </h1>)}
//   {/* <DataTable columns={columns} data={data} /> */}

//   {/* <div>
//     <canvas ref={canvasRef} style={{width: "600px",height:"600px",background:"url('https://res.cloudinary.com/dpof5vyxf/image/upload/v1682459548/BISAG/opeiqs12idv41dvxr87l.png')"}}/>
//   </div> */}
//     </>
//   );
// };

export default InvestigationReport;
