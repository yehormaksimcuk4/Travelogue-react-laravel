import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import ImageFullScreen from './ImageFullScreen';
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const GET_SAVED_COLLECTION_ITEMS = gql`
  query GetSavedCollectionItems($collectionId: ID!) {
    savedCollectionItems(id: $collectionId) {
      id
      image_path
    }
  }
`;

const DELETE_SAVED_ITEM = gql`
  mutation DeleteSavedItem($id: ID!) {
    deleteSavedItem(id: $id) {
      success
      message
    }
  }
`;
// const handleDeleteItem = async (id) => {
//   try {
//     await deleteSavedItemMutation({
//       variables: { id },
//     });

//     // Refetch user activities after deletion
//     refetch();
//   } catch (error) {
//     console.error('Error deleting item:', error.message);
//   }
// };

const SavedCollectionList = () => {
  const { collectionId } = useParams();
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const { loading, error, data } = useQuery(GET_SAVED_COLLECTION_ITEMS, {
    variables: { collectionId },
  });

  
  
  const [deleteSavedItemMutation] = useMutation(DELETE_SAVED_ITEM, {
    refetchQueries: [{ query: GET_SAVED_COLLECTION_ITEMS, variables: { collectionId } }],
  });

  const handleDeleteItem = async (id) => {
    try {
      await deleteSavedItemMutation({
        variables: { id },
      });
  
      // Refetch user activities after deletion
      // refetch();
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const savedItems = data?.savedCollectionItems || [];

  
  return (
    <div className="container">
      <div className="album py-5 bg-light mt-3">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {savedItems.map((savedItem) => (
              <SavedCollectionItem key={savedItem.id} savedItem={savedItem} setFullScreenImage={setFullScreenImage}  handleDeleteItem={handleDeleteItem} />
              ))}
          </div>
        </div>
      </div>
      {fullScreenImage && <ImageFullScreen imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />}
    </div>
  );
};

const SavedCollectionItem = ({ savedItem, setFullScreenImage, handleDeleteItem }) => {
  const openFullScreen = () => {
    setFullScreenImage(`${apiUrl}${savedItem.image_path}`);
  };

  return (
    <div key={savedItem.id} className="col">
      <div className="card shadow-sm">
        <img src={`${apiUrl}${savedItem.image_path}`} className="card-img-top p-2" alt={`Saved Item`} onClick={openFullScreen} />
        <div className="card-body">
          <h2 className="card-title">Saved Item no: {savedItem.id}</h2>
        <button className="btn btn-danger" onClick={() => handleDeleteItem(savedItem.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SavedCollectionList;
