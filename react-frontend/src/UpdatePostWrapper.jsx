import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdatePostForm from './UpdatePost';

const UpdatePostFormWrapper = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const closeForm = () => {
    // Perform any necessary actions, e.g., navigate back to the post or another page
    navigate(`/post/${postId}`);
  };

  return <UpdatePostForm postId={postId} onClose={closeForm} />;
};

export default UpdatePostFormWrapper;