import React, { useState, createContext } from 'react';

export const ApiContext = createContext();


export const ApiProvider = (props) => {
    const [truevalue, settruevalue] = useState(false);
    const [isAuth,setIsAuth]=useState(true);
    const [drop, setDrop]=useState();
    const [userData,setUserData]= useState({});
    
    return (
        <ApiContext.Provider value={{ truevalue, settruevalue, isAuth, setIsAuth,drop,setDrop,userData,setUserData}}>
            {props.children}
        </ApiContext.Provider>
    )
}