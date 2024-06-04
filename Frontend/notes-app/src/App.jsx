import React from 'react'
import {BrowserRouter as Router ,Routes ,Route, BrowserRouter } from "react-router-dom"

import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

const routes = 
  (<Router>
    <Routes>
      <Route path = "/" exact element={<LandingPage />} />
      <Route path = "/dashboard" exact element={<Home />} />
      <Route path = "/login" exact element= { <Login /> } />
      <Route path = "/signup" exact element={<Signup />} />
    </Routes>
  </Router>)



function App() {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
