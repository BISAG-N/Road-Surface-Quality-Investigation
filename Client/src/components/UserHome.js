import React from "react";

import Navbar from './Nabar';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';

//Component
import Dashboard from "./Dashboard";
import Login from "./Login";

const UserHome = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap bg-gray-100 w-full h-screen">
        <Rightbar component={<Dashboard/>}/>
        <Leftbar />
      </div>
    </div>
  );
};

export default UserHome;
