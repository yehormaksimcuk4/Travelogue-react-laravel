import React from 'react';
import { useQuery, gql } from '@apollo/client';
import NavBar from './NavBar';

const GET_USER_DATA = gql`
  query {
    users {
      data {
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
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_USER_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.users.data;

  return (
    <div>
      <NavBar />
      <div className="row row-cols-1 row-cols-sm-3 g-4 p-4">
        {users.map((user) => (
          <div key={user.id} className="col">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">User ID: {user.id}</h6>
                <div className="card-text">
                  <h6>Activities</h6>
                  {user.posts.map((post) => (
                    <div key={post.id} className="card mb-3">
                      <div className="card-body">
                        <p className="card-text">{post.content}</p>
                        <p className="card-text">Created At: {post.created_at}</p>
                      </div>
                    </div>
                  ))}
                    {user.photos.map((photo) => (
                      <div key={photo.id} className="card mb-3">
                      <img src={`${photo.image_path}`} className="card-img-top" alt={`Photo ${photo.id}`} />
                        <div className="card-body">
                          <p className="card-text">Created At: {photo.created_at}</p>
                        </div>
                      </div>
                    ))}
                  {user.itineraries.map((itinerary) => (
                    <div key={itinerary.id} className="card mb-3">
                      <div className="card-body">
                        <p className="card-text">{itinerary.description}</p>
                        <p className="card-text">Created At: {itinerary.created_at}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
