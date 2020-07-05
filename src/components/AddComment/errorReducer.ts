import { Action } from 'redux';

const ADD_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const REMOVE_ERROR_MESSAGE = 'REMOVE_ERROR_MESSAGE';

export const initialErrors = {
  author: '',
  body: '',
};

type AddError = Action<typeof ADD_ERROR_MESSAGE> & { fieldName: string; message: string };
type RemoveError = Action<typeof REMOVE_ERROR_MESSAGE> & { fieldName: string };
type AvailableActions = AddError | RemoveError;

export const addError = (fieldName: string, message: string): AddError => ({
  type: ADD_ERROR_MESSAGE,
  fieldName,
  message,
});

export const removeError = (fieldName: string): RemoveError => ({
  type: REMOVE_ERROR_MESSAGE,
  fieldName,
});

const errorReducer = (state = initialErrors, action: AvailableActions) => {
  switch (action.type) {
    case ADD_ERROR_MESSAGE:
      return {
        ...state,
        [action.fieldName]: action.message,
      };

    case REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        [action.fieldName]: '',
      };

    default:
      return state;
  }
};

export default errorReducer;
