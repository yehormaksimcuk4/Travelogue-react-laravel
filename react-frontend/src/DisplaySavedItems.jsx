import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const apiUrl = import.meta.env.VITE_API_URL;

const GET_MY_SAVED_ITEMS = gql`
  query GetMySavedItems {
    me {
      id
      name
      savedItems {
        id
        author_id
        user_id
        image_path
        created_at
        post {
          id
          content
        }
        itinerary {
          id
          description
        }
        photo {
          id
          image_path
        }
      }
    }
  }
`;

const GET_USER = gql`
  query GetUser($authorId: ID!) {
    user(id: $authorId) {
      id
      name
      email
    }
  }
`;

const SavedList = () => {
  const { loading, error, data } = useQuery(GET_MY_SAVED_ITEMS);

  useEffect(() => {
    // Handle loading and error states if needed
  }, [loading, error]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.me;

  if (!user) {
    return <p>User not authenticated.</p>;
  }

  console.log(user);

  return (
    <div className="container">
      <div className="album py-5 bg-light mt-3">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
            {user.savedItems.map((item) => (
              <SavedItem key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SavedItem = ({ item, user }) => {
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
    variables: { authorId: item.author_id },
    fetchPolicy: 'cache-and-network',
  });

  const author = userData?.user;

  return (
    <div key={item.id} className="col">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{user.name}</h2>
        </div>

        <div className="card-body">
          <h3>Saved Item Details</h3>
          <p>ID: {item.id}</p>
          <p>Author ID: {item.author_id}</p>
          <p>Author: {author ? author.name : 'Unknown Author'}</p>
          <img src={`${apiUrl}${item.image_path}`} className="card-img-top p-5" alt={`Photo`} />
          <p>Created At: {item.created_at}</p>
        </div>

        {item.post && (
          <div className="card-body">
            <h3>Post</h3>
            <p>{item.post.content}</p>
          </div>
        )}

        {item.itinerary && (
          <div className="card-body">
            <h3>Itinerary</h3>
            <p>{item.itinerary.description}</p>
          </div>
        )}

        {item.photo && (
          <div className="card-body">
            <h3>Photo</h3>
            <img src={`${apiUrl}${item.photo.image_path}`} alt={`Photo`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedList;
