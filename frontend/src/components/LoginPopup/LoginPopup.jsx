import { useContext, useEffect, useState } from 'react'
import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/Storecontext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState,setState] = useState("Sign Up")
    const [data,setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChaneHandler=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const onLogin=async(e)=>{
        e.preventDefault()
        let newUrl = url;
        if(currState === "Login"){
            newUrl += '/api/user/login'
        }else{
            newUrl += '/api/user/register'
        }
        const res = await axios.post(newUrl, data)
        if(res.data.success){
            setToken(res.data.token)
            localStorage.setItem("token", res.data.token)
            setShowLogin(false)
        }else{
            alert(res.data.message)
        }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={(e)=>onLogin(e)} action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>{
                setShowLogin(false)
            }} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input"> 
            <input name='name' onChange={onChaneHandler} type="text" placeholder='Your Name' required className='login-popup-inputs' />
            <input name='email' onChange={onChaneHandler} type="email" placeholder='Your Email' required className='login-popup-inputs' />
            <input name='password' onChange={onChaneHandler} type="password" placeholder='Password' required className='login-popup-inputs' />
        </div>
        <button type='submit' className="login-popup-button">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" name="" id="" required/>
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? <p>Create a new account? <span onClick={()=>setState("Sign Up")}>Click here</span></p> 
        : <p>Already have an account? <span onClick={()=>setState("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
