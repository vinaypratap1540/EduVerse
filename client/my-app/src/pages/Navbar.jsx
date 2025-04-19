import React from 'react'
import "./navbar.css";
import { useState } from 'react';
import {Avatar} from "@mui/material"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from '../features/api/authApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [logoutUser,{data,isSuccess}]=useLogoutUserMutation();
  const navigate = useNavigate()
  const logoutHandler = async()=>{
    await logoutUser()
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);
  const {user} = useSelector(store=>store.auth)
  return (
    <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01" style={{gap:"30px"}}>
      <img src="/photos/eduverse.png" alt="" />
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"><Link style={{textDecoration:"none",color:"black"}} to="/">Home</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active">About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active">Contact Us</a>
        </li>
      </ul>
      {user ? (
         <div class="dropdown">
         <div data-bs-toggle="dropdown" aria-expanded="false">
          {user.photoUrl ? (
                      <Avatar
                        style={{ cursor: "pointer", height: "35px", width: "35px", marginLeft: "180px", marginTop: "10px" }}
                        alt={user.name}
                        src={user.photoUrl}
                      />
                    ) : (
                      <Avatar
                        style={{ cursor: "pointer", height: "35px", width: "35px", marginLeft: "180px", marginTop: "10px" }}
                        alt="Default Avatar"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png"
                      />
                    )}
         </div>
         <ul class="dropdown-menu">
           <li><a class="dropdown-item">My Account</a></li>
           <li><hr class="dropdown-divider"/></li>
           <li><a class="dropdown-item"><Link style={{textDecoration:"none",color:"black"}} to="/my-learning">My Learning</Link></a></li>
           <li><a class="dropdown-item"><Link style={{textDecoration:"none",color:"black"}} to="/profile">Edit Profile</Link></a></li>
           <li><a class="dropdown-item" onClick={logoutHandler}>Log out</a></li>
           <li><hr class="dropdown-divider"/></li>
           {user.role === 'instructor' && (<li><a class="dropdown-item"><Link to="/admin" style={{textDecoration:"none",color:"black"}}>Dashboard</Link></a></li>)}
         </ul>
       </div>
      ):<button type="button" class="btn btn-outline-success"><Link to="/login" style={{textDecoration:"none",color:"white"}}>SignUp/Login</Link></button>}
      { darkMode===false ?
      <a onClick={()=>setDarkMode(!darkMode)}><LightModeIcon style={{marginRight:"80px",cursor:"pointer"}}/></a>
      : <a onClick={()=>setDarkMode(!darkMode)}><DarkModeIcon style={{marginRight:"80px",cursor:"pointer"}}/></a> }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
