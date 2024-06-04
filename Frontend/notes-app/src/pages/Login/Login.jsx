import React, { useState } from 'react'
import NavbarLP from '../../components/Navbar/NavbarLP'
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login Procedure API calling Begins here
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //for correcet login credentials
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }      
    } 
    //? catch (error) {
      //?  if (error.response && error.response.data && error.response.message) {
        //?     setError(error.response.data.message);
        //?   } else {
          //?     setError ( "Something unexpected happened, Please try again later" )
          //?   }
          
      // if there is any error in logging in
      catch (error) {
        if (error.response) {
          // Log the entire error response for debugging
          console.error("Error response:", error.response);
          if (error.response.data && error.response.data.message) {
            setError(error.response.data.message);
          } else {
            setError("An error occurred. Please try again.");
          }
        } else if (error.request) {
          console.error("Error request:", error.request);
          setError("No response received from the server. Please check your network connection.");
        } else {
          console.error("Error message:", error.message);
          setError("An error occurred. Please try again.");
        }
    }
  };

  return (
    <div className='bg-black text-slate-100 h-[100vh]'>
      <NavbarLP />

      <div className='flex items-center justify-center mt-40 '>
        <div className='w-96 border rounded-2xl bg-slate-700 px-7 py-10'>
          
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7"> Login</h4>

            <input 
              type="text" 
              placeholder='Email' 
              className='input-box' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              Login
            </button>

            <p className='text-sm text-center mt-4'>
              Not Registered yet? {" "}
              <Link to="/signup" className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login;
