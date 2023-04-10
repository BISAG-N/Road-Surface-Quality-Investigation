import React, { useContext } from 'react';
import { Link,useHistory} from 'react-router-dom';
import {ApiContext} from './ApiContext';
import Logo from '../images/Logopng.png'

const Navbar=()=>{
    let history=useHistory();
  const { truevalue, settruevalue } = useContext(ApiContext);
    const handleOut=()=>{
        sessionStorage.removeItem('auth-token')
        settruevalue(!truevalue)
        history.push('/')
          }
    return(
        
      <div className="mb-2 md:border-b py-2">
      <div className="container mx-auto">
          <div className="flex justify-between gap-2">
              <img
                  className="w-32 ml-2"
                  src={Logo}
                  alt="Logo"
              />
              <ul className="hidden md:flex">
                  
              </ul>
          </div>
      </div>
  </div>

    )
}
export default Navbar;

