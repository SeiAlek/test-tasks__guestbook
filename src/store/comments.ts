import { Action } from 'redux';

const SET_COMMENTS = 'SET_COMMENTS';

type SetComments = Action<typeof SET_COMMENTS> & { comments: CommentItem[] };

const commentsState: CommentItem[] = [];

export const setComments = (comments: CommentItem[]): SetComments => ({
  type: SET_COMMENTS,
  comments,
});

const reducer = (comments = commentsState, action: SetComments): CommentItem[] => {
  switch (action.type) {
    case SET_COMMENTS:
      return [...action.comments];

    default:
      return comments;
  }
};

export default reducer;
