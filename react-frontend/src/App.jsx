import { useState } from 'react'
import Login from './Login'
import Signup from './Register'
import Home from './Home'
import ItineraryForm from './ItineraryForm'
import PostForm from './PostForm'
// import PhotoUploadForm from './PhotoUploadForm'
import PhotoUploadFormRest from './PhotoUploadFormRest';
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
            <Route path="/itineraryform" element={<ItineraryForm />} />
            <Route path="/postform" element={<PostForm />} />
            {/* <Route path="/photouploadform" element={<PhotoUploadForm />} /> */}
            <Route path="/photouploadformrest" element={<PhotoUploadFormRest />} />
            </Routes>
        }
      </Router>
    </>
  )
}

export default App
