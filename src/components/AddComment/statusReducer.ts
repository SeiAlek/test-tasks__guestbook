import { Action } from 'redux';
import { StatusType } from '../../helpers';

const SET_STATUS_SUCCESS = 'SET_STATUS_SUCCESS';
const SET_STATUS_ERROR = 'SET_STATUS_ERROR';
const CLEAR_STATUS = 'CLEAR_STATUS';

export const initialStatus: AddStatus = {
  statusType: '',
  title: '',
  body: '',
};

type SetStatusSuccess = Action<typeof SET_STATUS_SUCCESS> & { title: string; body: string };
type SetStatusError = Action<typeof SET_STATUS_ERROR> & { title: string; body: string };
type ClearStatus = Action<typeof CLEAR_STATUS>;
type AvailableActions = SetStatusSuccess | SetStatusError | ClearStatus;

export const setStatusSuccess = (title: string, body: string): SetStatusSuccess => ({
  type: SET_STATUS_SUCCESS,
  title,
  body,
});

export const setStatusError = (title: string, body: string): SetStatusError => ({
  type: SET_STATUS_ERROR,
  title,
  body,
});

export const clearStatus = (): ClearStatus => ({ type: CLEAR_STATUS });

const errorReducer = (state = initialStatus, action: AvailableActions): AddStatus => {
  switch (action.type) {
    case SET_STATUS_SUCCESS:
      return {
        ...state,
        statusType: StatusType.SUCCESS,
        title: action.title,
        body: action.body,
      };

    case SET_STATUS_ERROR:
      return {
        ...state,
        statusType: StatusType.ERROR,
        title: action.title,
        body: action.body,
      };

    case CLEAR_STATUS:
      return { ...initialStatus };

    default:
      return state;
  }
};

export default errorReducer;
