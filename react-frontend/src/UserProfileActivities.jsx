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


const userId = localStorage.getItem('user_id');
console.log('user ID', userId);

const UserProfileActivities = ({ userId }) => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [itemId, setItemId] = useState(null);
  const [isItemSaved, setIsItemSaved] = useState(false);
  

  //Fetch user data
  const { loading: userLoading, error: userError, data: userData } = useQuery(ME_QUERY);

   // Fetch user's collections
   const { loading: collectionsLoading, error: collectionsError, data: collectionsData } = useQuery(GET_MY_COLLECTIONS);



  const [saveItem] = useMutation(SAVE_ITEM_MUTATION);
  const [saveItemToCollectionMutation] = useMutation(SAVE_ITEM_TO_COLLECTION_MUTATION);
  const [createNewCollectionMutation] = useMutation(CREATE_NEW_COLLECTION_MUTATION);

  const Token = localStorage.getItem('token');
  // const user = userData?.user;


  const { loading, error, data} = useQuery(GET_USER_ACTIVITIES, {
    variables: { userId },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;
  const apiUrl = import.meta.env.VITE_API_URL;

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
  
  // const userId = localStorage.getItem('user_id');

  const createNewCollection = async (name, user_id) => {
    try {
      const { data } = await createNewCollectionMutation({
        variables: { name, user_id },
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
  
    handleCloseModal();
  };

  const openFullScreen = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  // const handleSaveItem = (itemId) => {
  //   const yourAccessToken = localStorage.getItem('token');
  //   const Token = localStorage.getItem('token');

  
  //   saveItem({
  //     variables: {
  //       itemId
  //     },
  //     context: {
  //       headers: {
  //         Authorization: `Bearer ${Token}`,
  //       },
  //     },
  //     // You can add an update function to update the cache if needed
  //   });
  //   setSavedItems((prevItems) => [...prevItems, itemId]);
  // };

  return (
    <>
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
                    className={`btn ${savedItems[photo.id] ? 'btn-secondary' : 'btn-danger'}`}
                  onClick={() => handleSaveItemToCollection(selectedCollection, photo.id)}
                  // onClick={() => handleSaveItem(photo.id)}
                  // disabled={savedItems.includes(photo.id)}
                  disabled={savedItems[photo.id]}
                >
               {savedItems[photo.id] ? 'Saved' : 'Save This'}
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
  {/* </div> */}
</>
  );
};

export default UserProfileActivities;
