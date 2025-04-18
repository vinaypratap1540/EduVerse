import React, { useEffect, useState } from 'react';
import "./login.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginUserMutation, useRegisterUserMutation } from '../features/api/authApi.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [registerUser, { data: registerData,error: registerError, isLoading: registerIsLoading,isSuccess: registerIsSuccess, }] = useRegisterUserMutation();
  const [loginUser, { data: loginData,error: loginError,isLoading: loginIsLoading,isSuccess: loginIsSuccess, }] = useLoginUserMutation();

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    let inputData;

    if (type === "register") {
      inputData = { name, email, password, address };
      try {
        await registerUser(inputData);
      } catch (error) {
        console.log("Register Error:", error);
      }
    } else {
      inputData = { email, password };
      try {
        await loginUser(inputData);
      } catch (error) {
        console.log("Login Error:", error);
      }
    }

    // Clear fields after submission
    setName("");
    setEmail("");
    setPassword("");
    setAddress("");
  };
   useEffect(()=>{
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Registration successful!");
      navigate("/")
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful!");
      navigate("/")
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Registration failed. Please try again!");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login failed. Please check your credentials!");
    }
   },[loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,loginIsSuccess,registerIsSuccess])
  return (
    <div className='card1'>
      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link" onClick={() => setMessage("register")}>SignUp</button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => setMessage("login")}>Signin</button>
        </li>
      </ul>

      {/* Conditional Rendering */}
      {message === "register" ? (
        <div className='register'>
          <form className="row g-3" onSubmit={(e) => handleSubmit(e, "register")}>
            <div className="col-md-8">
              <label htmlFor="inputName4" className="form-label">Name</label>
              <input type="text" className="form-control" id="inputName4" placeholder="Eg. Vinay"
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-8">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4" placeholder="Eg. vinay@gmail.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-8">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" placeholder="Eg. xyz"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col-md-8">
              <label htmlFor="inputAddress" className="form-label">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder='Eg. sector 12,Noida'
                value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary" disabled={registerIsLoading}>
                {registerIsLoading ? (
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                ) : "SignUp"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='login'>
          <form className="row g-3" onSubmit={(e) => handleSubmit(e, "login")}>
            <div className="col-md-6">
              <label htmlFor="loginEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="loginEmail" placeholder="Eg. pratap@gmail.com"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="loginPassword" placeholder="Eg. xyz"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary" disabled={loginIsLoading}>
                {loginIsLoading ? (
                  <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                ) : "LogIn"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;


