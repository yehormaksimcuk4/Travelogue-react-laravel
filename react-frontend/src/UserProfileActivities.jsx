// src/components/UserActivities.jsx
import React, {useState} from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Navbar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import UpdatePostForm from './UpdatePost';
import UpdateItineraryForm from './UpdateItinerary';
import ImageFullScreen from './ImageFullScreen';


const GET_USER_ACTIVITIES = gql`
  query GetUserActivities($userId: ID) {
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

export const SAVE_ITEM_MUTATION = gql`
  mutation SaveItem($itemId: ID!) {
    saveItem(itemId: $itemId) {
      id
      author_id
      user_id
      image_path
      created_at
    }
  }
`;


const userId = localStorage.getItem('user_id');
console.log('user ID', userId);

const UserProfileActivities = ({ userId }) => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  const [saveItem] = useMutation(SAVE_ITEM_MUTATION);

  const { loading, error, data} = useQuery(GET_USER_ACTIVITIES, {
    variables: { userId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;
  const apiUrl = import.meta.env.VITE_API_URL;

  const openFullScreen = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const handleSaveItem = (itemId) => {
    const yourAccessToken = localStorage.getItem('token');
    const Token = localStorage.getItem('token');

  
    saveItem({
      variables: {
        itemId
      },
      context: {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
      // You can add an update function to update the cache if needed
    });
    setSavedItems((prevItems) => [...prevItems, itemId]);
  };

  return (
    <div>
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
                
                </div>
              </div>
            </div>
          </div>
        ))}
        {user.photos.map((photo) => (
          <div key={photo.id} className="col">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Photo</h5>
                <img src={`${apiUrl}${photo.image_path}`} className="card-img-top" alt={`Photo ${photo.id}`} onClick={() => openFullScreen(`${apiUrl}${photo.image_path}`)} />
                <p className="card-text">Created At: {photo.created_at}</p>
                <div className="d-flex justify-content-between">
                </div>
                {/* {item.__typename === 'Photo' && ( */}
                <button
                  className={`btn ${savedItems.includes(photo.id) ? 'btn-secondary' : 'btn-danger'}`}
                  onClick={() => handleSaveItem(photo.id)}
                  disabled={savedItems.includes(photo.id)}
                >
                  {savedItems.includes(photo.id) ? 'Saved' : 'Save This'}
                </button>
              
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
            
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {fullScreenImage && <ImageFullScreen imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />}
    </div>
    </div>
  );
};

export default UserProfileActivities;
