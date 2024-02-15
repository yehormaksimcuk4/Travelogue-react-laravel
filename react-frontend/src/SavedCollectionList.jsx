import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
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

const SavedCollectionList = () => {
  const { collectionId } = useParams();
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const { loading, error, data } = useQuery(GET_SAVED_COLLECTION_ITEMS, {
    variables: { collectionId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const savedItems = data?.savedCollectionItems || [];

  return (
    <div className="container">
      <div className="album py-5 bg-light mt-3">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {savedItems.map((savedItem) => (
              <SavedCollectionItem key={savedItem.id} savedItem={savedItem} setFullScreenImage={setFullScreenImage} />
            ))}
          </div>
        </div>
      </div>
      {fullScreenImage && <ImageFullScreen imageUrl={fullScreenImage} onClose={() => setFullScreenImage(null)} />}
    </div>
  );
};

const SavedCollectionItem = ({ savedItem, setFullScreenImage }) => {
  const openFullScreen = () => {
    setFullScreenImage(`${apiUrl}${savedItem.image_path}`);
  };

  return (
    <div key={savedItem.id} className="col">
      <div className="card shadow-sm">
        <img src={`${apiUrl}${savedItem.image_path}`} className="card-img-top p-5" alt={`Saved Item`} onClick={openFullScreen} />
        <div className="card-body">
          <h2 className="card-title">Saved Item ID: {savedItem.id}</h2>
        </div>
      </div>
    </div>
  );
};

export default SavedCollectionList;
