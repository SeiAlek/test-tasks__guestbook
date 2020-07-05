import { gql } from 'apollo-boost';

export const commentsQuery = gql`
  query commentsQuery {
    comments {
      id
      author
      body
      date
    }
  }
`;
