import React,{useState,useContext,useEffect} from 'react'
import { useLocation} from 'react-router-dom';
import axios from 'axios';

import Navbar from './Nabar';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';


const Details = () => {
    let location=useLocation();
    const [check,setCheck]=useState(true);
    const userData=location.state;
    console.log("The data is from the showData",userData)
    const [email,setEmail]=useState(location.state.datacheck.email);
    const [passsword,setPassword]=useState(location.state.datacheck.password);
    const [fullname,setFullName]=useState(location.state.datacheck.fullname);
    const [category,setCategory]=useState(location.state.datacheck.category.category)
    const [value, setValue] = useState({})
    const [_id,setId]=useState(location.state.datacheck._id)
    const [resetHide,setResetHide]=useState(false);
    const [warning,setWarning]=useState("");
    const [drop, setDrop] = useState({ "category": "Actor" });
    const [filter, setFilter] = useState();
    const [fitlerDrop, setFilterDrop] = useState();
    const [emailError, setEmailError] = useState("")
    const [fullnameError, setFullNameError] = useState("")
    const [categoryError, setCategoryError] = useState("")


    useEffect(async () => {
        try {
            console.log("hello sign")
            const dropval = await axios.get('http://localhost:8000/dropdownvalue')
            const storeddrop = dropval.data
            setDrop(storeddrop)
            setFilterDrop(storeddrop)
            console.log("The Value of drop", drop)
        } catch (er) {
            console.log(er)
        }
    }, [])
    const handleSubmit=(e)=>{
        e.preventDefault()
        setWarning("")
        const token = sessionStorage.getItem('auth-token');
        console.log("Submit",value)

        axios.patch(`http://localhost:8000/reset-password/${_id}`,value, token && {
            headers: {
                "auth-token":
                    token
            },
        })
            .then(result => {
                console.log("Result after submit", result)
                // setValue({currentPassword:"",newPassword:"",confirmPassword:""})
                alert("Password Updated Successfully...!!")
            })
            .catch(err=>{console.log({err})
            setWarning(err.response.data)
            })
    }
    const Edit=()=>{
        console.log(check)
        setCheck((prev)=>(!prev))
    }
    const upDate=async ()=>{
        setEmailError("");
        setFullNameError("");
        setCategoryError("")
        console.log(check)
        console.log("Detail filter",filter)
        // setCategory(filter);
        const data=JSON.stringify({email,passsword})
        console.log(data)
        try{
            console.log("Working..")
            const port = 'http://localhost:8000/user-details';
            const token = sessionStorage.getItem('auth-token');

            const res = await axios.patch(`${port}/${_id}`, { "email": email, "fullname": fullname ,"category":filter}, token && {
                headers: {
                    "auth-token":
                        token
                },
            });
            setCheck((prev) => !prev)

            const data1=await res;
            console.log("Just checking....", res.data.user.category.category)
            setCategory(res.data.user.category.category)
            console.log("The data value",data1)
        }catch(err){
            console.log("Detail error",{err});
            if (err.response.data.err.hasOwnProperty("path")) {
                setCategoryError("Select Category");
            } else {
                if (err.response.data.err.hasOwnProperty("code") && err.response.data.err.code === 11000) {
                    setEmailError("Email is already Registered")
                } else {

                    if (err.response.data.err.errors.hasOwnProperty("fullname")) {

                        setFullNameError(err.response.data.err.errors.fullname.message)
                    }
                    if (err.response.data.err.errors.hasOwnProperty("email")) {

                        setEmailError(err.response.data.err.errors.email.message)
                    }
                    if (err.response.data.err.errors.hasOwnProperty("category")) {
                        console.log("category Erro",err.response.data.err.errors.category.message)
                        setCategoryError(err.response.data.err.errors.category.message)
                    }
                }
            }
        } 
    }
    
    const hideFunction=()=>{
        console.log("From hide function",resetHide)
        setResetHide(!resetHide);
    }

    return (
        <div>
        <Navbar/>
        <div className="flex flex-wrap bg-gray-100 w-full h-screen">
        <Leftbar/>
        <Rightbar/>
        </div>
        </div>
    )
}   

export default Details;

