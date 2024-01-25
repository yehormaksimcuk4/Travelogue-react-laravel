import React from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const Navbar = () => {
    const [logout] = useMutation(LOGOUT_MUTATION);

    const handleLogout = async () => {
        try {
          const response = await logout();
      
          if (response.data.logout) {
            // Logout successful
      
            // Clear the token from local storage or perform any other cleanup
            localStorage.removeItem('token');
      
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
                <a className="navbar-brand" href="#">
                    Travelogue Trips
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Itineraries
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Blog
                            </a>
                        </li>
                        {/* <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
                Disabled
              </a>
            </li> */}
                    </ul>
                    <div className="ms-auto">
                        <div className='btn btn-outline-light'onClick={() => handleLogout()}>Sign out</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
