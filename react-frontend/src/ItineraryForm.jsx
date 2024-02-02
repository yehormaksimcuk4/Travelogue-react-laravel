import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Navbar from './NavBar';

const CREATE_ITINERARY = gql`
  mutation CreateItinerary($user_id: ID!, $description: String!) {
    createItinerary(user_id: $user_id, description: $description) {
      id
      description
      created_at
    }
  }
`;

const ItineraryForm = () => {
  const [description, setDescription] = useState('');
  const user_id = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage

  const [createItinerary, { loading, error }] = useMutation(CREATE_ITINERARY, {
    onCompleted: () => {
      // Handle successful form submission, e.g., show a success message or redirect
      console.log('Itinerary created successfully!');
      setDescription(''); // Clear the description field
      window.location.href = '/';
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields if needed

    // Call the mutation
    createItinerary({
      variables: {
        user_id,
        description,
      },
    });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className='container p-4'>

      <h2>Create Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          {/* <input
            type="textarea"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          /> */}
            <textarea
            id="description"
            className="form-control"
            placeholder="Enter your post content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? 'Creating...' : 'Create Itinerary'}
        </button>
        {error && <p className="text-danger mt-3">Error: {error.message}</p>}
      </form>
    </div>
    </div>
  );
};

export default ItineraryForm;
