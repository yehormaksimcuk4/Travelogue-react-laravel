import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PHOTO = gql`
  mutation CreatePhoto($user_id: ID!, $image_path: Upload!) {
    createPhoto(user_id: $user_id, image_path: $image_path) {
      id
      image_path
      user {
        id
        name
        email
      }
      created_at
    }
  }
`;

const PhotoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [createPhoto, { loading, error }] = useMutation(CREATE_PHOTO);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem('user_id');

    try {
      const { data } = await createPhoto({
        variables: {
          user_id: user_id,
          image_path: file,
        },
      });

      console.log('Uploaded Photo:', data.createPhoto);
      window.location.href = '/'; // Redirect to home page after successful upload
    } catch (error) {
      console.error('Error uploading photo:', error.message);
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label>
          Upload Photo:
          <input type="file" accept="image/*" name="image" onChange={handleFileChange} />
        </label>

        <button type="submit">Post</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default PhotoUploadForm;
