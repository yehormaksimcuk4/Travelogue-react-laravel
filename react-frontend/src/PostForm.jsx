import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($user_id: ID!, $content: String!) {
    createPost(user_id: $user_id, content: $content) {
      id
      content
      created_at
    }
  }
`;

const PostForm = () => {
  const [content, setContent] = useState('');
  const user_id = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      // Handle successful form submission, e.g., show a success message or update the post list
      console.log('Post created successfully!');
      setContent(''); // Clear the content field
      window.location.href = '/';
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields if needed

    // Call the mutation
    createPost({
      variables: {
        user_id,
        content,
      },
    });
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Post Content
          </label>
          <textarea
            id="content"
            className="form-control"
            placeholder="Enter your post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
        {error && <p className="text-danger mt-3">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default PostForm;
