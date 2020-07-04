import { Action } from 'redux';

const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

type SetErrorMessage = Action<typeof SET_ERROR_MESSAGE> & { errorMessage: string };

export const setErrorMessage = (errorMessage: string) => ({
  type: SET_ERROR_MESSAGE,
  errorMessage,
});

const reducer = (errorMessage = '', action: SetErrorMessage) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.errorMessage;

    default:
      return errorMessage;
  }
};

export default reducer;
