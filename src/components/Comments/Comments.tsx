import { useSubscription } from '@apollo/react-hooks';
import React, { ReactElement } from 'react';

import './Comments.scss';
import { AddComment } from '../AddComment';
import { Preloader } from '../Preloader';
import { CommentsItem } from './CommentsItem';
import { commentsQuery } from './queries';

interface CommentData {
  comments: CommentItem[];
}

export const Comments = (): ReactElement => {
  const { loading, data } = useSubscription<CommentData>(commentsQuery);

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
