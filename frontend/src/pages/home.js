import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  
  const[loggedInUser, setLoggedInUser] = useState("");
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  })

  const navigate = useNavigate();

  const handleLogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }

  return (
    <div>
      <h1>Hello! {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
