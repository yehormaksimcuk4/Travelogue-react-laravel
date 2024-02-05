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


const SavedList = () => {
  const { loading, error, data } = useQuery(GET_MY_SAVED_ITEMS);

  useEffect(() => {
    // Handle loading and error states if needed
  }, [loading, error]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.me;

  console.log(user);

  return (
    <div className="container">
      <div className="album py-5 bg-light mt-3">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
            {user.savedItems.map((item) => (
              <div key={item.id} className="col">
                <div className="card shadow-sm">
                  <div className="card-body">
                    {/* <h2 className="card-title">{item.user ? item.user.name : 'Unknown User'}</h2> */}
                    <h2 className="card-title">{user.name}</h2>
                    {/* <p className="card-text m-0">User ID: {item.user ? item.user.id : 'Unknown ID'}</p> */}
                  </div>

                    <div className="card-body">
                      <h3>Posts</h3>
                      
                          <p>{item?.post?.content}</p>
                      
                    </div>

                    <div className="card-body">
                      <h3>Itineraries</h3>
                      
                          <p>{item?.itinerary?.description}</p>
                      
                    </div>

                    <div className="card-body">
                      <h3>Photos</h3>
                      {item.photo ? (
                    <img src={`${apiUrl}${item.photo.image_path}`} alt={`Photo`} />
                  ) : (
                    <p>No photo available</p>
                  )}
                    </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedList;
