import React from "react";
import { useEffect,useRef } from "react";
import DataTable from "react-data-table-component";

const InvestigationReport = () => {
  

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const canvasRef=useRef();

  const drawRectangle= ()=>{
    const context=canvasRef.current.getContext("2d");
    context.strokeStyle = "white"
    context.lineWidth = 2
    context.strokeRect(230,104,8,7)
  }
  useEffect(()=>{
    drawRectangle();
  },[])

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
  <DataTable columns={columns} data={data} />

  <div>
    <canvas ref={canvasRef} style={{width: "600px",height:"600px",background:"url('https://res.cloudinary.com/dpof5vyxf/image/upload/v1681849409/BISAG/mayesdnlo6eabjisj1pq.jpg')"}}/>
  </div>
    </>
  );
};

export default InvestigationReport;
