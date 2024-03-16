import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import ImageFullScreen from './ImageFullScreen';

const apiUrl = import.meta.env.VITE_API_URL;

// GraphQL queries
const GET_ITINERARIES = gql`
  query GetItineraries {
    itinerary {
      id
      description
      likes 
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
      likes 
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
      likes
      user {
        id
        name
      }
      created_at
    }
  }
`;

const GET_PHOTOS_WITH_LIKES = gql`
  query {
    photosWithLikes {
      id
      image_path
      likes
    }
  }
`;

const GET_ITINERARIES_WITH_LIKES = gql`
  query {
    itinerariesWithLikes {
      id
      description
      likes  
    }
  }
`;

const GET_POSTS_WITH_LIKES = gql`
  query {
    postsWithLikes {
      id
      content
      likes
    }
  }
`;


export const SAVE_ITEM_TO_COLLECTION_MUTATION = gql`
  mutation addToCollection($collectionId: ID!, $itemId: ID!) {
    addToCollection(collectionId: $collectionId, photoId: $itemId) {
      id
      image_path
      collection {
        id
        name
      }
    }
  }
`;

export const CREATE_NEW_COLLECTION_MUTATION = gql`
  mutation createCollection($name: String!, $user_id: ID!) {
    createCollection(name: $name, user_id: $user_id) {
      id
      name
      created_at
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;

export const GET_MY_COLLECTIONS = gql`
query GetMyCollections { me { id collections { id name user { id name } savedItems { id image_path } } } }
`;

const LIKE_PHOTO_MUTATION = gql`
  mutation LikePhoto($photoId: ID!) {
    likePhoto(photoId: $photoId) {
      likes
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      likes
    }
  }
`;

const LIKE_ITINERARY_MUTATION = gql`
  mutation LikeItinerary($itineraryId: ID!) {
    likeItinerary(itineraryId: $itineraryId) {
      likes
    }
  }
`;

const Home = () => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [itemId, setItemId] = useState(null);
  const [isItemSaved, setIsItemSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likedItems, setLikedItems] = useState({});
  const [likedPhotos, setLikedPhotos] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [likedItineraries, setLikedItineraries] = useState({});


  // Fetch itineraries
  const { loading: itinerariesLoading, error: itinerariesError, data: itinerariesData } = useQuery(GET_ITINERARIES);

  // Fetch posts
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);

  // Fetch photos
  const { loading: photosLoading, error: photosError, data: photosData } = useQuery(GET_PHOTOS);

  //Fetch user data
  const { loading: userLoading, error: userError, data: userData } = useQuery(ME_QUERY);

  // Fetch user's collections
  const { loading: collectionsLoading, error: collectionsError, data: collectionsData } = useQuery(GET_MY_COLLECTIONS);

  const { loading, error, data } = useQuery(GET_PHOTOS_WITH_LIKES);




  const [saveItemToCollectionMutation] = useMutation(SAVE_ITEM_TO_COLLECTION_MUTATION);
  const [createNewCollectionMutation] = useMutation(CREATE_NEW_COLLECTION_MUTATION);
  const [likePhoto] = useMutation(LIKE_PHOTO_MUTATION, {
    // Refetch photos after liking
    refetchQueries: [{ query: GET_PHOTOS_WITH_LIKES }],
  });
  const [likePostMutation] = useMutation(LIKE_POST_MUTATION, {
    // Refetch photos after liking
    refetchQueries: [{ query: GET_POSTS }],
  });
  const [likeItineraryMutation] = useMutation(LIKE_ITINERARY_MUTATION, {
    // Refetch photos after liking
    refetchQueries: [{ query: GET_ITINERARIES }],
  });

  // Combine data from itineraries, posts, and photos
  const combinedData = [
    ...(itinerariesData?.itinerary || []),
    ...(postsData?.post || []),
    ...(photosData?.photo || []),
  ];

  // Sort combinedData by created_at in descending order
  const sortedData = combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const Token = localStorage.getItem('token');
  const user = userData?.user;

  // Define your saveItemToCollection and createNewCollection mutations here
  const saveItemToCollection = async (collectionId, itemId) => {
    try {
      const { data } = await saveItemToCollectionMutation({
        variables: { collectionId, itemId },
      });

      // Handle the response after saving the item to the collection
      console.log('Saved item to collection:', data.addToCollection);

      // Assuming your GraphQL response has an 'addToCollection' field
      if (data.addToCollection) {
        // Handle the case where the item is successfully added to the collection
      } else {
        // Handle the case where the item could not be added to the collection
        console.error('Error saving item to collection:', data.errors);
      }
    } catch (error) {
      console.error('Error saving item to collection:', error.message);
    }
  };

  const userId = localStorage.getItem('user_id');

  const createNewCollection = async (name, user_id) => {
    try {
      const { data } = await createNewCollectionMutation({
        variables: { name, user_id },
        refetchQueries: [{ query: GET_MY_COLLECTIONS }],
      });

      // Handle the response after creating a new collection
      console.log('Created new collection:', data.createCollection);

      // If the new collection was created successfully, save the item to it
      if (data.createCollection) {
        saveItemToCollection(data.createCollection.id, itemId);
      }
    } catch (error) {
      console.error('Error creating new collection:', error.message);
    }
  };

  const handleSaveItemToCollection = (collectionId, itemId) => {
    setItemId(itemId);
    setSelectedCollection(collectionId || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCollection(null);
    setNewCollectionName('');
    setItemId(null);
    setIsItemSaved(false);
  };

  const handleSaveItemToCollectionConfirm = () => {
    if (selectedCollection) {
      saveItemToCollection(selectedCollection, itemId);  // Pass variables separately
      setSavedItems((prevSavedItems) => ({ ...prevSavedItems, [itemId]: true }));
      setSelectedCollection('');
    } else if (newCollectionName) {
      createNewCollection(newCollectionName, localStorage.getItem('user_id'));
      setSavedItems((prevSavedItems) => ({ ...prevSavedItems, [itemId]: true }));
      setSelectedCollection('');
    }
    setSelectedCollection(null);
    setNewCollectionName('');
    setItemId(null);
    handleCloseModal();
  };

  const openFullScreen = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const handleLikePhoto = async (photoId, userId) => {
    try {
      await likePhoto({ variables: { photoId: photoId, userId: userId } });
      setLikedPhotos(prevLikedPhotos => ({
        ...prevLikedPhotos,
        [photoId]: true
      }));
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const handleLikePost = async (postId, userId) => {
    try {
      await likePostMutation({ variables: { postId: postId, userId: userId } });
      setLikedPosts(prevLikedPosts => ({
        ...prevLikedPosts,
        [postId]: true
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleLikeItinerary = async (itineraryId, userId) => {
    try {
      await likeItineraryMutation({ variables: { itineraryId: itineraryId, userId: userId } });
      setLikedItineraries(prevLikedItineraries => ({
        ...prevLikedItineraries,
        [itineraryId]: true
      }));
    } catch (error) {
      console.error('Error liking itinerary:', error);
    }
  };


  return (
    <>
      <div className="container">
        <div className="album py-5 bg-light mt-3">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
              {sortedData.map((item) => (
                <div key={item.id} className="col">
                  <div className="card shadow-sm">
                    {item.__typename === 'Photo' && item.image_path && (
                      <img
                        src={`${apiUrl}${item.image_path}`}
                        className="card-img-top p-2"
                        alt={`Thumbnail for ${item.__typename}`}
                        onClick={() => openFullScreen(`${apiUrl}${item.image_path}`)}
                      />
                    )}

                    <div className="card-body">
                      <h2 className="card-title">{item.__typename}</h2>
                      <p className="card-text m-0">
                        from{' '}
                        <Link to={`/user/${item?.user?.id}`} className="text-danger">
                          {item?.user?.name}
                        </Link>
                      </p>
                      {item.__typename === 'Post' && <p className="card-text">{item?.content}</p>}



                      {item.__typename === 'Itinerary' && <p className="card-text">{item?.description}</p>}



                      <p className="card-text">Created At: {item?.created_at}
                        <div className='mb-3'>
                          {/* Display the number of likes */}
                          Likes: {item.likes}
                        </div>
                      </p>
                      <div className='d-flex gap-4'>

                        {item.__typename === 'Photo' && (
                          <button
                            className={`btn ${savedItems[item.id] ? 'btn-secondary' : 'btn-danger'}`}
                            onClick={() => handleSaveItemToCollection(selectedCollection, item.id)}
                            disabled={savedItems[item.id]}
                          >
                            {savedItems[item.id] ? 'Saved' : 'Save This'}
                          </button>
                        )}
                        <>
                          {/* Render Like button for Photos */}
                          {item.__typename === 'Photo' && (
                            <button
                              className={`btn ${likedPhotos[item.id] ? 'btn-secondary' : 'btn-danger'}`}
                              onClick={() => handleLikePhoto(item.id, userId)}
                            >
                              {likedPhotos[item.id] ? 'Liked' : 'Like'}
                            </button>
                          )}

                          {item.__typename === 'Post' && (
                            <button
                              className={`btn ${likedPosts[item.id] ? 'btn-secondary' : 'btn-danger'}`}
                              onClick={() => handleLikePost(item.id, userId)}
                            >
                              {likedPosts[item.id] ? 'Liked' : 'Like'}
                            </button>
                          )}

                          {item.__typename === 'Itinerary' && (
                            <button
                              className={`btn ${likedItineraries[item.id] ? 'btn-secondary' : 'btn-danger'}`}
                              onClick={() => handleLikeItinerary(item.id, userId)}
                            >
                              {likedItineraries[item.id] ? 'Liked' : 'Like'}
                            </button>
                          )}
                          {/* <button
                            className={`btn ${likedItems[item.id] ? 'btn-secondary' : 'btn-danger'}`}
                            onClick={() => handleLike(item.id, userId)}
                          >
                            {likedItems[item.id] ? 'Liked' : 'Like'}
                          </button> */}
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for collection selection */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="collectionModalLabel" aria-hidden={!showModal}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="collectionModalLabel">
                  Choose Collection
                </h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="collectionSelect">Select an existing collection:</label>
                  <select
                    className="form-control"
                    id="collectionSelect"
                    value={selectedCollection || ''}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select Collection
                    </option>
                    {/* Display user's collections in the dropdown */}
                    {collectionsData?.me?.collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="newCollectionName">Or create a new collection:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newCollectionName"
                    placeholder="Enter new collection name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-danger" onClick={handleSaveItemToCollectionConfirm}>
                  Save Item
                </button>
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}

        {fullScreenImage && <ImageFullScreen imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />}
      </div>
    </>
  );
};

export default Home;
