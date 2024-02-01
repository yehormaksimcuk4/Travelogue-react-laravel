// UpdatePostForm.jsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_POST = gql`
  mutation UpdatePost($postId: ID!, $newContent: String!) {
    updatePost(id: $postId, content: $newContent) {
      id
      content
    }
  }
`;

const UpdatePostForm = ({ postId, currentContent, onClose }) => {
  const [newContent, setNewContent] = useState(currentContent);
  const [updatePost] = useMutation(UPDATE_POST);

  const handleUpdate = async () => {
    try {
      const { data } = await updatePost({
        variables: {
          postId,
          newContent,
        },
      });

      console.log('Updated Post:', data.updatePost);
      onClose(); // Close the form after updating
    //   window.location.href = '/useractivities';

    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  const handleCancel = () => {
    // Simply close the form without triggering a refetch
    onClose();
  };

  return (
    <div>
      <h2>Update Post</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="newContent" className="form-label">
            New Content:
          </label>
          <textarea
            id="newContent"
            className="form-control"
            rows="3"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary m-2" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
