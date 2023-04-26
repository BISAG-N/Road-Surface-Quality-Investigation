import React from "react";
import { useEffect,useRef,useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const InvestigationReport = () => {

  const uid = sessionStorage.getItem("userid");
  const [reportData, setReportData] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async ()=>{
      
      await axios
        .get(`http://localhost:8000/road/get-report/${uid}`)
        .then(report=>{
          setReportData(report.data)
          setLoaded(true)
        })

        .catch((er) => {
          console.log(er);
        });
    }

    fetchData();
  }, [uid]);
  console.log(reportData)
  
  
  const columns = [
    {
      name: "Road Name",
      selector: (row) => row.road.name,
    },
    {
      name: "District",
      selector: (row) => row.road.district,
    },
  ];
  const data=[]
  if(isLoaded){

    reportData.forEach((report)=>{
        data.push({id:report._id,road:report.road.name,district:report.road.district})
    })

  }
  // const data = [
  //   {
  //     id: 1,
  //     road: reportData[0].road.name,
  //     district: reportData[0].road.district,
  //   },
  //   {
  //     id: 2,
  //     road: reportData[1].road.name,
  //     district: reportData[1].road.district,
  //   },
  // ];

  // const canvasRef=useRef();

  // const drawRectangle= ()=>{
  //   const context=canvasRef.current.getContext("2d");
  //   context.strokeStyle = "white"
  //   context.lineWidth = 2
  //   context.strokeRect(230,104,8,7)
  // }
  // useEffect(()=>{
  //   drawRectangle();
  // },[])

  // function MyComponent() {
  //     return (
  //         <DataTable
  //             columns={columns}
  //             data={data}
  //         />
  //     );
  // };

  return (
    <>
    {isLoaded ? (<DataTable columns={columns} data={reportData} />) : (<h1> Loading... </h1>)}
  {/* <DataTable columns={columns} data={data} /> */}

  {/* <div>
    <canvas ref={canvasRef} style={{width: "600px",height:"600px",background:"url('https://res.cloudinary.com/dpof5vyxf/image/upload/v1681849409/BISAG/mayesdnlo6eabjisj1pq.jpg')"}}/>
  </div> */}
    </>
  );
};

export default InvestigationReport;
