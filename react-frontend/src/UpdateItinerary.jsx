// src/components/UpdateItineraryForm.jsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_ITINERARY = gql`
  mutation UpdateItinerary($itineraryId: ID!, $newDescription: String!) {
    updateItinerary(id: $itineraryId, description: $newDescription) {
      id
      description
    }
  }
`;

const UpdateItineraryForm = ({ itineraryId, currentDescription, onClose }) => {
  const [newDescription, setNewDescription] = useState(currentDescription);
  const [updateItinerary] = useMutation(UPDATE_ITINERARY);

  const handleUpdate = async () => {
    try {
      const { data } = await updateItinerary({
        variables: {
          itineraryId,
          newDescription,
        },
      });

      console.log('Updated Itinerary:', data.updateItinerary);
      onClose(); // Close the form after updating

    } catch (error) {
      console.error('Error updating itinerary:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Itinerary</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="newDescription" className="form-label">New Description:</label>
          <textarea
            id="newDescription"
            className="form-control"
            rows="3"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary m-2" onClick={handleUpdate}>Update</button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateItineraryForm;
