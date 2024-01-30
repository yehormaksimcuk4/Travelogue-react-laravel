// import necessary modules
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

// create an Apollo Client instance with a name
const client = new ApolloClient({
  name: 'myUploadClient', // Set a name for your client instance
  link: createUploadLink({
    uri: 'http://localhost:8000/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;
