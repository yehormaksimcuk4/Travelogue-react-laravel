import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';

const GET_USER_DATA = gql`
  query GetUserProfile($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      profile {
        profile_pic_path
      }
    }
  }
`;

const apiUrl = import.meta.env.VITE_API_URL;

const Profile = ({ refetch }) => {
  const [profilePic, setProfilePic] = useState();
  const userId = localStorage.getItem('user_id')
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { userId },
  });

  useEffect(() => {
    // Optional: Handle loading or error states if needed
  }, [loading, error]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSaveProfile = () => {
    const formData = new FormData();
    formData.append('profile_pic', profilePic);

    axios.post('http://localhost:8000/api/profile/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        // refetch();
        console.log(response.data.message);
        window.location.href='/profile';
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  const { name, email, profile } = data.user;
  const profilePicPath = profile?.profile_pic_path || 'No profile picture';

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <div>
              {profilePicPath && (
                <img src={`${apiUrl}/${profilePicPath}`} style={{ width: 'auto', height: '100%', maxHeight: '200px', borderRadius: '50%' }} alt="Profile" className="img-fluid mb-2" />
              )}
            </div>
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" name="profile_pic" onChange={handleFileChange} />
          </div>
          <button className="btn btn-danger" onClick={handleSaveProfile}>Save Profile</button>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <p className="form-control-static">{name}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <p className="form-control-static">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
