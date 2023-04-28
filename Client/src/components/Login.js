import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Nabar';
import { ApiContext } from './ApiContext';
import MapImg from '../images/mapimg.jpg'
import Logo from '../images/Logopng.png'
const Login = () => {
    const [value, setValue] = useState({ role: 0, active: true, email:"loqyrofi@lyricspad.net",password:"Abcd@1234" })
    const [props, setProps] = useState({})
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const { truevalue, settruevalue, isAuth, setIsAuth,userData,setUserData} = useContext(ApiContext);
    console.log("isAuth", isAuth)
    var usercheck = '';
    var datacheck = '';
    var rolecheck = '';
    var activeDeactive = ''
    var adminCheck='';
    let history = useHistory();
    const handleChange = (key, value) => {
        setValue((prev) => ({ ...prev, [key]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        console.log(value)
        try {
            console.log('okk')
            const res = await axios.post('http://localhost:8000/login/', value)
                .then(res => {
                    sessionStorage.setItem("auth-token", res.headers['auth-token'])
                    sessionStorage.setItem("userid", res.data.user)
                    
                    datacheck=res.data
                    setUserData(datacheck)
                    usercheck = res.data.user
                    rolecheck = res.data.role
                    activeDeactive = res.data.active
                    console.log("Login response", res.data)
                })
            const data = await res;
            console.log("Check", res)
            console.log("Active user", activeDeactive)
            if (rolecheck === 1) {
                settruevalue(!truevalue);
                setIsAuth(!isAuth)
               return history.push({
                    pathname: '/dashboard',
                    state: {datacheck}
                })
                // return history.push('/all-details');
            }
            else {
                if (usercheck && activeDeactive === true) {
                    try {
                        const port = 'http://localhost:8000/user-details';
                        const userdetails = await axios.get(`${port}/${usercheck}`)
                            .then(res => {
                                datacheck = res.data
                                setProps(() => { setProps(res.data) })
                            })
                        await console.log("value form ser", userdetails)
                        const user = await userdetails;
                        console.log("Before history", {datacheck})
                        console.log("push")
                        settruevalue(!truevalue);
                        setIsAuth(!isAuth)

                        history.push({
                            pathname: '/dashboard',
                            state: {datacheck}
                        })
                        // history.push({
                        //     pathname: '/detail',
                        //     state: {datacheck}
                        // })
                    } catch (err) {
                        console.log({ err })
                        console.log({ err })
                    }
                    console.log('all right')
                } else {
                    sessionStorage.removeItem('auth-token')
                    alert("User is Not present")
                }
            }

        } catch (err) {
            console.log({ err })
            setEmailError(err.response.data.errors.email)
            setPasswordError(err.response.data.errors.password)
            console.log(emailError)
        }
        // bg-gray-400
    }
    return (
        <body className="font-mono ">

        {/* <Navbar /> */}
		
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				{/* <!-- Row --> */}
				<div className="w-full xl:w-3/4 lg:w-11/12 flex p-">
					{/* <!-- Col --> */}
					<img
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        src={MapImg}
						// style={{backgroundImage: "url('https://source.unsplash.com/K4mSJ7kc0As/600x800')"}}
					>
                        {/* <img src={MapImg} className="h-fit w-fit"/> */}
                    </img>
					{/* <!-- Col --> */}
					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <img className="" src={Logo}></img>
						<h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
						<form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" for="username">
									Username
								</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									placeholder="Username"
                                    type="text" name="email" required
                                    value={value.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
								/>
							</div>
                            <p className="text-xs italic text-red-500">{emailError}</p>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" for="password">
									Password
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
									placeholder="******************"
                                    type="password" name="password" required
                                    value={value.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
								/>
								<p className="text-xs italic text-red-500">{passwordError}</p>
							</div>
							{/* <div className="mb-4">
								<input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
								<label className="text-sm" for="checkbox_id">
									Remember Me
								</label>
							</div> */}
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Sign In
								</button>
							</div>
							<hr className="mb-6 border-t" />
							{/* <div className="text-center">
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>
									Create an Account!
								</a>
							</div> */}
							<div className="text-center">
                                    <Link to="/reset" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">Forgot Password?
                                    </Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
        
	</body>
    )
}

export default Login

