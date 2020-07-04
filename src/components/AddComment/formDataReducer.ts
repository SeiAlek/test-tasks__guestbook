import { Action } from 'redux';

const SET_DATA = 'SET_DATA';
const CLEAR_DATA = 'CLEAR_DATA';

export const initialFormData = {
  id: '',
  author: '',
  comment: '',
};

type SetData = Action<typeof SET_DATA> & { fieldName: string; fieldValue: string };
type ClearData = Action<typeof CLEAR_DATA>;
type AvailableActions = SetData | ClearData;

export const setFieldData = (fieldName: string, fieldValue: string): SetData => ({
  type: SET_DATA,
  fieldName,
  fieldValue,
});

export const clearData = (): ClearData => ({ type: CLEAR_DATA });

const errorReducer = (state = initialFormData, action: AvailableActions) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };

    case CLEAR_DATA:
      return initialFormData;

    default:
      return state;
  }
};

export default errorReducer;
