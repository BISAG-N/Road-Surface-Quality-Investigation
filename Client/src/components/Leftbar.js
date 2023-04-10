import React,{useState,useContext,useEffect} from 'react'
import { Link,useHistory} from 'react-router-dom';

//Icons
import {MdSatelliteAlt} from 'react-icons/md'
import {MdOutlineImageSearch} from 'react-icons/md'
import {MdVideoCameraBack} from 'react-icons/md'
import{MdLock} from 'react-icons/md'
import{MdExitToApp} from 'react-icons/md'
import {TbReport} from 'react-icons/tb'

import Profile from '../images/Profile.jpg'
import Dashboard from "./Dashboard";
import { useLocation} from 'react-router-dom';

import { useLoadScript } from "@react-google-maps/api";

//Logout
import {ApiContext} from './ApiContext';

const Leftbar = ({userd}) => {

    let location=useLocation();
    // const [check,setCheck]=useState(true);
    const userData=location.state;
    console.log(userData)
    console.log(userd)
    // const [fullname,setFullName]=useState(location.state.datacheck.fullname);
    const fullname=userd.fullname
    // const [category,setCategory]=useState(location.state.datacheck.category.category)
    const category=userd.category.category

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: ["drawing"],
      });

      let history=useHistory();
  const { truevalue, settruevalue } = useContext(ApiContext);
    const handleOut=()=>{
        sessionStorage.removeItem('auth-token')
        settruevalue(!truevalue)
        history.push('/')
          }

  return (
    
    <div className=" w-2/12 bg-white rounded p-3 shadow-lg">
        <div className="flex items-center space-x-4 p-2 mb-5">
            <img className="h-12 rounded-full" src={Profile} alt="User" />
            <div>
                <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">{fullname && fullname}</h4>
                <span className="text-sm tracking-wide flex items-center space-x-1">
                    <svg className="h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg><span className="text-gray-600">{category&& category}</span>
                </span>
            </div>
        </div>
        <ul className="space-y-2 text-sm">
            {/* <li>
                <Link href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline">
                    <span className="text-gray-600">
                       
                    </span>
                    <span>Dashboard</span>
                </Link>
            </li> */}
            <li>
                <Link to="/dashboard" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                    <span className="text-gray-600 h-5">
                        <MdSatelliteAlt/>
                    </span>
                    <span>Satellite Investigation</span>
                </Link>
            </li>
            <li>
                <Link to="/image-investigation" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                    <span className="text-gray-600 h-5">
                        <MdOutlineImageSearch/>
                    </span>
                    <span>Image Investigation</span>
                </Link>
            </li>
            <li>
                <Link to="/video-investigation" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                    <span className="text-gray-600 h-5">
                       <MdVideoCameraBack/>
                    </span>
                    <span>Video Investigation</span>
                </Link>
            </li>
            <li>
                <Link to="/investigation-report" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                    <span className="text-gray-600 h-5">
                        <TbReport />                        
                    </span>
                    <span>Investigation Report</span>
                </Link>
            </li>
            <li>
                <Link to="/reset" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                    <span className="text-gray-600">
                        <MdLock/>
                    </span>
                    <span>Change password</span>
                </Link>
            </li>
            <li>
                <button onClick={handleOut} className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                    <span className="text-gray-600">
                        <MdExitToApp/>
                    </span>
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    </div>

  )
}

export default Leftbar