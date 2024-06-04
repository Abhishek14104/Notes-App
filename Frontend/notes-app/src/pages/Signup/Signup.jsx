import React, { useState } from 'react'
import NavbarLP from '../../components/Navbar/NavbarLP';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter yout name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }

    if(!password) {
      setError("Plaease enter the passowrd")
      return;
    }

    setError('')

    //SignUp API
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //* Handle successful Registration Response
      if ( response.data && response.data.error ) {
        setError(response.data.message)
        return
      }

      if ( response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An unpexted Error occurred")
        }
    }
  };

  return (
    <div className='bg-black text-zinc-100 overflow-y-hidden overflow-hidden h-[100vh]' >
      <NavbarLP />

      <div className='flex items-center justify-center mt-40'>
        <div className='w-96 border rounded-2xl bg-slate-600 px-7 py-10'>

          <form onSubmit={(handleSignUp)}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder='Name'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <PasswordInput value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              Create Account
            </button>

            <p className='text-sm text-center mt-4'>
              Already have account? {" "}
              <Link to="/login" className='font-medium text-primary underline'>
                Login
              </Link>
            </p>

          </form>
          
        </div>
      </div>
    </div>
  )
}

export default Signup
