import React, { useState, useContext, useEffect } from "react";
import axios from 'axios'
import Details from './Details';
import {useLocation,useHistory} from 'react-router-dom'
import AdminControl from './AdminControl';
import Dashboard from "./Dashboard";
import UserHome from './UserHome';
const ShowData=()=>{
    const location=useLocation();
    // console.log("just checking the id",location.state.datacheck._id)
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

  
    return(
        <>
        {userData.role===0?<UserHome RenComponent={Dashboard} />:<UserHome RenComponent={AdminControl} />}
        </>
    )
}
export default ShowData;