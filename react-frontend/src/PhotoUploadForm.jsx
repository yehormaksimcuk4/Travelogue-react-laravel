import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PHOTO = gql`
  mutation CreatePhoto($user_id: ID!, $image: Upload!) {
    createPhoto(user_id: $user_id, image: $image) {
      id
      image_path
      created_at
    }
  }
`;

const PhotoUploadForm = () => {
  const [image, setImage] = useState(null);
  const user_id = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage

  const [createPhoto, { loading, error }] = useMutation(CREATE_PHOTO, {
    onCompleted: () => {
      // Handle successful form submission, e.g., show a success message or update the photo list
      console.log('Photo created successfully!');
      setImage(null); // Clear the selected image
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields if needed

    // Call the mutation
    createPhoto({
      variables: {
        user_id,
        image: image,
      },
    });
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Choose Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading || !image}>
          {loading ? 'Uploading...' : 'Upload Photo'}
        </button>
        {error && <p className="text-danger mt-3">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default PhotoUploadForm;
