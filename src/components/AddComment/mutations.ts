import { gql } from 'apollo-boost';

export const addCommentMutation = gql`
  mutation addComment($author: String!, $body: String!, $date: Float!) {
    addComment(author: $author, body: $body, date: $date) {
      author
      id
    }
  }
`;
