import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.scss';
import { Comments } from './components/Comments';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER}/graphql`,
});

export const App = () => (
  <ApolloProvider client={client}>
    <main className="App container">
      <h1>
        Guestbook
      </h1>
      <Comments />
    </main>
  </ApolloProvider>
);
