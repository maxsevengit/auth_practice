import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { handleError, handleSucces } from '../utils'
function Signup() {
  
  const[signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e)=>{
    const{name,value} = e.target;
    console.log(name, value)
    const copysignupInfo = {...signupInfo};
    copysignupInfo[name] = value;
    setSignupInfo(copysignupInfo)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const{name, email, password} = signupInfo
    if(!name || !email || !password){
      return handleError("All fields are mandatory.")
    }
    try{
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method : "Post",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json()
      const{success,message, error} = result;
      if(success){
        handleSucces(message);
        setTimeout(()=>{
          navigate('/login')
        },3000)
      }else if(error){
        const details = error?.details[0].message;
        handleError(details)
      }else if(!success){
        handleError(message);
      }
      console.log(result)
    }
    catch(err){
      handleError(err);
    }
  }

  return (
    <div className='container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='name'>Name</label>
            <input
                onChange={handleChange}
                type='text'
                autoFocus
                name='name'
                placeholder='Enter you name here...'
                value={signupInfo.name}
            />
        </div>

        <div>
            <label htmlFor='email'>Email</label>
            <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter you email here...'
                value={signupInfo.email}
            />
        </div>

        <div>
            <label htmlFor='password'>Password</label>
            <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Create Password...'
                value={signupInfo.password}
            />
            <button>Submit</button>
            
            <ToastContainer/>   
        </div>
        <div>Already have an account?
                <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
