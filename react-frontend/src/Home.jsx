import React,{useState} from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from './NavBar';
import ImageFullScreen from './ImageFullScreen';

// const GET_USER_DATA = gql`
//   query {
//     users {
//       data {
//         id
//         name
//         posts {
//           id
//           content
//           created_at
//         }
//         photos {
//           id
//           image_path
//           created_at
//         }
//         itineraries {
//           id
//           description
//           created_at
//         }
//       }
//     }
//   }
//   `;
  
//   const Home = () => {
//     const { loading, error, data } = useQuery(GET_USER_DATA);
    
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
    
//     const users = data.users.data;
//     // console.log('process-env', process.env)
    const apiUrl = import.meta.env.VITE_API_URL;

//   return (
//     <div>
//       <NavBar />
//       <div className="row row-cols-1 row-cols-sm-3 g-4 p-4">
//         {users.map((user) => (
//           <div key={user.id} className="col">
//             <div className="card shadow">
//               <div className="card-body">
//                 <h5 className="card-title">{user.name}</h5>
//                 <h6 className="card-subtitle mb-2 text-muted">User ID: {user.id}</h6>
//                 <div className="card-text">
//                   <h6>Activities</h6>
//                   {user.posts.map((post) => (
//                     <div key={post.id} className="card mb-3">
//                       <div className="card-body">
//                         <p className="card-text">{post.content}</p>
//                         <p className="card-text">Created At: {post.created_at}</p>
//                       </div>
//                     </div>
//                   ))}
//                     {user.photos.map((photo) => (
//                       <div key={photo.id} className="card mb-3">
//                       <img src={`${apiUrl}${photo.image_path}`} className="card-img-top" alt={`Photo ${photo.id}`} />
//                         <div className="card-body">
//                           <p className="card-text">Created At: {photo.created_at}</p>
//                         </div>
//                       </div>
//                     ))}
//                   {user.itineraries.map((itinerary) => (
//                     <div key={itinerary.id} className="card mb-3">
//                       <div className="card-body">
//                         <p className="card-text">{itinerary.description}</p>
//                         <p className="card-text">Created At: {itinerary.created_at}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

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

const Home = () => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  // Fetch itineraries
  const { loading: itinerariesLoading, error: itinerariesError, data: itinerariesData } = useQuery(GET_ITINERARIES);

  // Fetch posts
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);

  // Fetch photos
  const { loading: photosLoading, error: photosError, data: photosData } = useQuery(GET_PHOTOS);

  // Combine data from itineraries, posts, and photos
  const combinedData = [
    ...(itinerariesData?.itinerary || []),
    ...(postsData?.post || []),
    ...(photosData?.photo || []),
  ];

  // Sort combinedData by created_at in descending order
  const sortedData = combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  console.log('Sorted data:', sortedData);

  const openFullScreen = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="album py-5 bg-light mt-3">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
              {/* Display sorted and combined data */}
              {sortedData.map((item) => (
                <div key={item.id} className="col">
                  <div className="card shadow-sm">
                    {item.__typename === 'Photo' && item.image_path && (
                      <img src={`${apiUrl}${item.image_path}`} className="card-img-top p-5" alt={`Thumbnail for ${item.__typename}`}  onClick={() => openFullScreen(`${apiUrl}${item.image_path}`)}/>
                    )}
                    <div className="card-body" >
                      <h2 className="card-title">{item.__typename}</h2>
                      <p className="card-text m-0">from {item?.user?.name}</p>
                      {item.__typename === 'Post' && <p className="card-text">{item?.content}</p>}
                      {item.__typename === 'Itinerary' && <p className="card-text">{item?.description}</p>}
                      <p className="card-text">Created At: {item?.created_at}</p>
                      {/* Add other content or buttons as needed */}
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