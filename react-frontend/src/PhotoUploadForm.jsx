import React from 'react';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit } = useForm();
  const [createPhoto, { loading, error }] = useMutation(CREATE_PHOTO);

  const onSubmit = async (data) => {
    const user_id = "2"; // You can get it from wherever you need (localStorage, state, etc.)
    const image = data.image[0];

    try {
      const { data: { createPhoto: photo } } = await createPhoto({
        variables: {
          user_id,
          image,
        },
      });

      console.log('Uploaded Photo:', photo);
    } catch (error) {
      console.error('Error uploading photo:', error.message);
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register('image')} />
        <button type="submit" disabled={loading}>Upload Photo</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default PhotoUploadForm;
  