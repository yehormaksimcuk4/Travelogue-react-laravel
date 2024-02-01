import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PHOTO = gql`
  mutation CreatePhoto($user_id: ID!, $image: Upload!) {
    createPhoto(user_id: $user_id, image: $image) {
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
    const filename = `photo_${user_id}_${Date.now()}_${file.name}`;

    try {
      const { data } = await createPhoto({
        variables: {
          user_id: user_id,
          image: file,
          image_path: filename,
        },
        // This is essential to tell Apollo Client to treat 'image' as a File
        context: {
          useMultipart: true,
        },
      });

      console.log('Uploaded Photo:', data.createPhoto);
      window.location.href = '/'; // Redirect to the home page after a successful upload
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
