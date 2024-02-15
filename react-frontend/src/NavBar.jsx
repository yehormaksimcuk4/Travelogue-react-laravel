import React from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const loggedIn = localStorage.getItem('token');

const Navbar = () => {
    const [logout] = useMutation(LOGOUT_MUTATION);

    const handleLogout = async () => {
        try {
            const response = await logout();

            if (response.data.logout) {
                // Logout successful

                // Clear the token from local storage or perform any other cleanup
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');

                // Redirect to the login page or any other desired page
                window.location.href = '/login';
            } else {
                // Logout failed, handle accordingly
                console.error('Logout failed');
            }
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger py-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{ fontSize: '3em' }}>
                    Travelogue
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto p-3">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/profile">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/useractivities">
                                User Activities
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/itineraryform">
                                Itinerary
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/photouploadformrest">
                                Photo
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/photouploadformgraphql">
                                Photo GraphQL
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/postform">
                                Post
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/mysaved">
                               My Saved
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/usercollections">
                             My Collections
                            </a>
                        </li>
                        {/* <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
                Disabled
              </a>
            </li> */}
                    {loggedIn ? (
                        <>
                            <div className="ms-auto">
                                {/* <p style={{color: 'white'}}>Welcome User</p> */}
                                <div className='btn btn-outline-light' onClick={() => handleLogout()}>Sign out</div>
                            </div>
                        </>
                    ) : (
                        <>
                             <div className="ms-auto">
                                   <li className="nav-item">
                            <a className="nav-link" href="/login">
                               Sign in
                            </a>
                        </li>
                        </div>
                        </>
                    )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
