import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
            id
            name
            email
            password
            email_verified_at
            created_at
            updated_at
            }
        }
`;


const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signup, { data }] = useMutation(SIGNUP_MUTATION);

    const handleSignup = async () => {
        try {
            const response = await signup({ variables: { name, email, password } });
            console.log(response.data.createUser); // Access the response data
            window.location.href = '/';
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <section className="vh-100 d-flex align-items-center justify-content-center bg-danger">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <h1 className='text-light' style={{fontSize: '2em'}}>Welcome to Travelogue.</h1>
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <h1 className='text-primary py-3 text-center' style={{fontSize: '2em'}}>Sign up to use Travelogue</h1>
                        <form>
                            {/* <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div> */}

                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your Name and Lastname"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example3">
                                    Name and Lastname
                                </label>
                            </div>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example3">
                                    Email address
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example4">
                                    Password
                                </label>
                            </div>

                            {/* <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div> */}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    onClick={handleSignup}
                                >
                                    Sign up
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account? <a href="/login" className="link-light">Login</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright Travelogue © 2024. All rights reserved.
        </div>
      </div> */}
        </section>
    );
};

export default Signup;
