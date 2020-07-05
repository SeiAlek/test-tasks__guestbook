import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/react-hooks';

import './Comments.scss';
import { AddComment } from '../AddComment';
import { Preloader } from '../Preloader';
import { CommentsItem } from './CommentsItem';
import { commentsQuery } from './queries';

interface CommentData {
  comments: CommentItem[];
}

export const Comments = (): ReactElement => {
  const { loading, data } = useQuery<CommentData>(commentsQuery);

  return (
    <section className="Comments">
      {loading && <Preloader />}
      {data && (
        <>
          <AddComment />
          <ul className="Comments__List">
            {data.comments.map(comment => (
              <li className="Comments__Item" key={comment.id}>
                <CommentsItem comment={comment} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
