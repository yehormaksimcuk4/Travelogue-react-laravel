import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Navbar from './NavBar';
import ImageFullScreen from './ImageFullScreen';
import { Link } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;



// GraphQL queries
const GET_ITINERARIES = gql`
  query GetItineraries {
    itinerary {
      id
      description
      user {
        id
        name
      }
      created_at
    }
  }
`;

const GET_POSTS = gql`
  query GetPosts {
    post {
      id
      content
      user {
        id
        name
      }
      created_at
    }
  }
`;

const GET_PHOTOS = gql`
  query GetPhotos {
    photo {
      id
      image_path
      user {
        id
        name
      }
      created_at
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

const Home = () => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  // Fetch itineraries
  const { loading: itinerariesLoading, error: itinerariesError, data: itinerariesData } = useQuery(GET_ITINERARIES);

  // Fetch posts
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);

  // Fetch photos
  const { loading: photosLoading, error: photosError, data: photosData } = useQuery(GET_PHOTOS);

  const [saveItem] = useMutation(SAVE_ITEM_MUTATION);

  // Combine data from itineraries, posts, and photos
  const combinedData = [
    ...(itinerariesData?.itinerary || []),
    ...(postsData?.post || []),
    ...(photosData?.photo || []),
  ];

  // Sort combinedData by created_at in descending order
  const sortedData = combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const Token = localStorage.getItem('token');



  const handleSaveItem = (itemId) => {
    const yourAccessToken = localStorage.getItem('token');
  
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

  // console.log('Sorted data:', sortedData);

  const openFullScreen = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <div className="album py-5 bg-light mt-3">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
              {/* Display sorted and combined data */}
              {sortedData.map((item) => (
                <div key={item.id} className="col">
                  <div className="card shadow-sm">
                    {item.__typename === 'Photo' && item.image_path && (
                      <img src={`${apiUrl}${item.image_path}`} className="card-img-top p-5" alt={`Thumbnail for ${item.__typename}`} onClick={() => openFullScreen(`${apiUrl}${item.image_path}`)} />
                    )}
                    <div className="card-body" >
                      <h2 className="card-title">{item.__typename}</h2>
                      {/* <p className="card-text m-0">from {item?.user?.name}</p> */}
                      <p className="card-text m-0">
                        from{' '}
                        <Link to={`/user/${item?.user?.id}`} className="text-danger">
                          {item?.user?.name}
                        </Link>
                      </p>

                      {item.__typename === 'Post' && <p className="card-text">{item?.content}</p>}
                      {item.__typename === 'Itinerary' && <p className="card-text">{item?.description}</p>}
                      <p className="card-text">Created At: {item?.created_at}</p>
                      {/* Add other content or buttons as needed

                      <button className='btn btn-danger' onClick={() => handleSaveItem(item.id)}>Save This</button> */}
                          {item.__typename === 'Photo' && (
                <button
                  className={`btn ${savedItems.includes(item.id) ? 'btn-secondary' : 'btn-danger'}`}
                  onClick={() => handleSaveItem(item.id)}
                  disabled={savedItems.includes(item.id)}
                >
                  {savedItems.includes(item.id) ? 'Saved' : 'Save This'}
                </button>
              )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {fullScreenImage && <ImageFullScreen imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />}
      </div>
    </>
  );
};

export default Home;