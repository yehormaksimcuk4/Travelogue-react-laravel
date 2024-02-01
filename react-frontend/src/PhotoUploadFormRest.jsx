// src/components/UploadImage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';

const UploadImage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('user_id');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_id', user_id);

    try {
      const response = await axios.post('http://localhost:8000/api/uploadphotorest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Upload successful:', response.data);
      window.location.href = '/';
      // Add any additional logic you need after a successful upload
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <div>
        <Navbar />
        <div className='container py-3'>

      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Choose File:
          <input type="file" accept="image/*" className='form-control' onChange={handleFileChange} />
        </label>
        <button type="submit" className='btn btn-danger m-1'>Post Photo</button>
      </form>
        </div>
    </div>
  );
};

export default UploadImage;
