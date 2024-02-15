import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_USER_COLLECTIONS = gql`
  query GetMyCollections {
    me {
      id
      collections {
        id
        name
        savedItems {
          id
          image_path
        }
      }
    }
  }
`;

const UserCollections = () => {
  const { loading, error, data } = useQuery(GET_USER_COLLECTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.me;

  return (
    <div className="container">
      <div className="album py-5 bg-light mt-3">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {user.collections.map(collection => (
              <UserCollectionItem key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCollectionItem = ({ collection }) => {
  const thumbnailImage = collection.savedItems.length > 0 ? collection.savedItems[0].image_path : null;

  return (
    <div key={collection.id} className="col">
      <div className="card shadow-sm p-3">
        {/* {thumbnailImage ? (
          <img src={`${thumbnailImage}`} className="card-img-top p-5" alt={`Thumbnail`} />
        ) : (
          <div className="placeholder-image">No Image Available</div>
        )} */}
        <div className="card-body">
          <h2 className="card-title">{collection.name}</h2>
        </div>
        <Link to={`/collections/${collection.id}`} className="btn btn-danger m-3">
          View Collection
        </Link>
      </div>
    </div>
  );
};

export default UserCollections;
