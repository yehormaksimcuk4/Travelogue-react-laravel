import { useState } from 'react'
import Login from './Login'
import Signup from './Register'
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  let logged_in = localStorage.getItem('token');

  return (
    <>
    <Router>
        {logged_in == null ?

          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
          :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            </Routes>
        }
      </Router>
    </>
  )
}

export default App
