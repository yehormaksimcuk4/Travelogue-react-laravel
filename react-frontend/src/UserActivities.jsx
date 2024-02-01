// src/components/UserActivities.jsx
import React, {useState} from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Navbar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import UpdatePostForm from './UpdatePost';
import UpdateItineraryForm from './UpdateItinerary';

const GET_USER_ACTIVITIES = gql`
  query GetUserActivities($userId: ID!) {
    user(id: $userId) {
      id
      name
      posts {
        id
        content
        created_at
      }
      photos {
        id
        image_path
        created_at
      }
      itineraries {
        id
        description
        created_at
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(id: $postId) {
      success
      message
    }
  }
`;
const DELETE_ITINERARY = gql`
  mutation DeleteItinerary($itineraryId: ID!) {
    deleteItinerary(id: $itineraryId) {
      success
      message
    }
  }
`;

const DELETE_PHOTO = gql`
  mutation DeletePhoto($photoId: ID!) {
    deletePhoto(id: $photoId) {
      success
      message
    }
  }
`;

const userId = localStorage.getItem('user_id');
console.log('user ID', userId);

const UserActivities = ({ userId }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [isEditingPost, setIsEditingPost] = useState(false);  
  const [editingItineraryId, setEditingItineraryId] = useState(null);
  const [isEditingItinerary, setIsEditingItinerary] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_USER_ACTIVITIES, {
    variables: { userId },
  });

  const [deletePost] = useMutation(DELETE_POST);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost({
        variables: { postId },
      });
      // Refetch user activities after deletion
      refetch();
    //   window.location.href = "/useractivities";
    // navigate('/useractivities');
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const [deleteItinerary] = useMutation(DELETE_ITINERARY);

  const handleDeleteItinerary = async (itineraryId) => {
    try {
      await deleteItinerary({
        variables: { itineraryId },
      });

      // Refetch user activities after deletion
      refetch();
    } catch (error) {
      console.error('Error deleting itinerary:', error.message);
    }
  };

  const [deletePhoto] = useMutation(DELETE_PHOTO);

const handleDeletePhoto = async (photoId) => {
  try {
    await deletePhoto({
      variables: { photoId },
    });

    // Refetch user activities after deletion
    refetch();
  } catch (error) {
    console.error('Error deleting photo:', error.message);
  }
};

 // State to track if editing post

const handleEditPost = (postId) => {
  // Set the postId in the state and toggle the editing state
  setEditingPostId(postId);
  setIsEditingPost(true);
};

const handleCancelEdit = () => {
  // Reset the editing state without triggering a refetch
  setEditingPostId(null);
  setIsEditingPost(false);
};

const handleEditItinerary = (itineraryId) => {
  setEditingItineraryId(itineraryId);
  setIsEditingItinerary(true);
};

const handleCancelEditItinerary = () => {
  setEditingItineraryId(null);
  setIsEditingItinerary(false);
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div>
        <Navbar />
        <div className='container py-4'>
      <h2>{user.name}'s Activities</h2>
      <div className="row row-cols-1 row-cols-sm-3 g-4 p-4">
        {user.posts.map((post) => (
          <div key={post.id} className="col">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Post</h5>
                <p className="card-text">{post.content}</p>
                <p className="card-text">Created At: {post.created_at}</p>
                <div className="d-flex justify-content-between">
                  {/* <button className="btn btn-primary">Edit</button> */}
                  {/* <Link to={`/updatepost/${post.id}`} className="btn btn-primary">
                      Edit
                    </Link> */}
                     {/* <UpdatePostForm postId={post.id} currentContent={post.content} onClose={refetch} /> */}
                      {/* Conditionally render the UpdatePostForm */}
                    {isEditingPost && editingPostId === post.id ? (
                      <UpdatePostForm postId={post.id} currentContent={post.content} onClose={handleCancelEdit} />
                    ) : (
                      <button className="btn btn-primary m-2" onClick={() => handleEditPost(post.id)}>
                        Edit
                      </button>
                    )}
                </div>
                  <button className="btn btn-danger m-2" onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {user.photos.map((photo) => (
          <div key={photo.id} className="col">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Photo</h5>
                <img src={`${apiUrl}${photo.image_path}`} className="card-img-top" alt={`Photo ${photo.id}`} />
                <p className="card-text">Created At: {photo.created_at}</p>
                <div className="d-flex justify-content-between">
                  {/* <button className="btn btn-primary">Edit</button> */}
                  <button className="btn btn-danger" onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {user.itineraries.map((itinerary) => (
          <div key={itinerary.id} className="col">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Itinerary</h5>
                <p className="card-text">{itinerary.description}</p>
                <p className="card-text">Created At: {itinerary.created_at}</p>
                <div className="d-flex justify-content-between">
                  {/* <button className="btn btn-primary">Edit</button> */}
                  {/* <Link to={`/updatepost/${post.id}`} className="btn btn-primary">
                      Edit
                    </Link> */}
                        {isEditingItinerary && editingItineraryId === itinerary.id ? (
                      <UpdateItineraryForm itineraryId={itinerary.id} currentDescription={itinerary.description} onClose={handleCancelEditItinerary} />
                    ) : (
                      <button className="btn btn-primary m-2" onClick={() => handleEditItinerary(itinerary.id)}>
                        Edit
                      </button>
                    )}
                </div>
                  <button className="btn btn-danger m-2"onClick={() => handleDeleteItinerary(itinerary.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UserActivities;
