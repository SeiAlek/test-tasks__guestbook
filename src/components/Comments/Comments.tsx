import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getComments } from '../../store';
import { CommentsItem } from './CommentsItem';
import './Comments.scss';

export const Comments = (): ReactElement => {
  const comments = useSelector(getComments);

  return (
    <section className="Comments">
      <ul className="Comments__List">
        {comments.map(comment => (
          <li className="Comments__Item" key={comment.id}>
            <CommentsItem comment={comment} />
          </li>
        ))}
      </ul>
    </section>
  );
};
