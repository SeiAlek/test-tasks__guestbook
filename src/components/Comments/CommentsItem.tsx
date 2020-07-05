import React, { ReactElement, useCallback } from 'react';

interface Props {
  comment: CommentItem;
}

export const CommentsItem = ({ comment }: Props): ReactElement => {
  const { author, date } = comment;

  const addZero = useCallback((num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  }, []);

  const formatTime = useCallback((ms: number): string => {
    const time = new Date(ms);
    const year = time.getFullYear();
    const month = Number(time.getMonth()) + 1;
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();

    return `${addZero(day)}.${addZero(month)}.${addZero(year)} ${addZero(hours)}:${addZero(minutes)}`;
  }, [addZero]);

  return (
    <article className="CommentsItem">
      <div className="CommentsItem__Author">
        {author}
      </div>
      <div className="CommentsItem__Date">
        {formatTime(date)}
      </div>
      <div className="CommentsItem__Text">
        {comment.body}
      </div>
    </article>
  );
};
