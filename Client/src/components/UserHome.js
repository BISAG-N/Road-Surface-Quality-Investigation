import React, { useState, useContext, useEffect } from "react";

import Navbar from "./Nabar";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import { ApiContext } from './ApiContext';

//Component
import Dashboard from "./Dashboard";
import Login from "./Login";
import axios from "axios";

const UserHome = ({ RenComponent }) => {
  const uid = sessionStorage.getItem("userid");
  const [userData, setUserData] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async ()=>{
      await axios
        .get(`http://localhost:8000/user-details/${uid}`)
        .then(userdata=>{
          setUserData(userdata.data)
          setLoaded(true)
        })

        .catch((er) => {
          console.log(er);
        });
 
    }

    fetchData();
  }, []);
  console.log(userData)

  // console.log(userData)
  // setLoaded(true)
  return (
    <div>
      <Navbar />
      {isLoaded ? (
        <div className="flex flex-wrap bg-gray-100 w-full h-screen">
          <Rightbar component={<RenComponent />} />
          <Leftbar userd={userData}/>
        </div>
      ) : (<h1>Loading...</h1>)}
      
    </div>
  )

};

export default UserHome;
