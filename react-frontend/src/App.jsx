import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Register';
import Home from './Home';
import ItineraryForm from './ItineraryForm';
import PostForm from './PostForm';
import PhotoUploadFormRest from './PhotoUploadFormRest';
import UserActivities from './UserActivities';
import { useParams } from 'react-router-dom';
import UpdatePostFormWrapper from './UpdatePostWrapper';
import Profile from './Profile';
import UserProfile from './UserProfile';
import Navbar from './NavBar';
import UserProfileActivities from './UserProfileActivities';
import SavedList from './DisplaySavedItems';
import AuthenticatedUserProfile from './AuthenticatedUserProfile';
import UserCollections from './DisplayCollections';
import SavedCollectionList from './SavedCollectionList';


function App() {
  const loggedIn = localStorage.getItem('token');
  const user = localStorage.getItem('user_id');

  return (
    <Router>
       <div>
        <Navbar />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Routes requiring authentication */}
        {loggedIn ? (
          <>
            <Route path="/useractivities" element={<UserActivities userId={user} />} />
            <Route path="/itineraryform" element={<ItineraryForm />} />
            <Route path="/postform" element={<PostForm />} />
            <Route path="/photouploadformrest" element={<PhotoUploadFormRest />} />
            <Route path="/updatepost/:postId" element={<UpdatePostFormWrapper />} />
            <Route path="/profileupdate" element={<Profile />} />
            <Route path="/profile" element={<AuthenticatedUserProfile />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/mysaved" element={<SavedList />} />
            <Route path="/usercollections" element={<UserCollections />} />
            <Route path="/collections/:collectionId" element={<SavedCollectionList />} />
          </>
        ) : (
          <>
            {/* Unauthenticated routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />

            {/* Redirect any unknown routes to login */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      </div>
    </Router>
  );
}

export default App;

