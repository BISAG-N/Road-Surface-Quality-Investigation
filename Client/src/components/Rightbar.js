import React from 'react'
import { useLoadScript } from "@react-google-maps/api";
import Dashboard from "./Dashboard";

const Rightbar = ({component}) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: ["drawing"],
      });


  return (
    <div className="w-10/12">
            <div className="p-4 text-gray-500">
            <div>{!isLoaded ? <h1>Loading...</h1> : component}</div>
            </div>
        </div>
                
            
  )
}

export default Rightbar