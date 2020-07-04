import { Dispatch } from 'react';
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import * as api from '../helpers/api';
import commentReducer, { setComments } from './comments';
import errorReducer, { setErrorMessage } from './error';
import loadingReducer, { finishLoading, setLoaded, startLoading } from './loading';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  loading: loadingReducer,
  errorMessage: errorReducer,
  comments: commentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading.isLoading;
export const isLoaded = (state: RootState) => state.loading.isLoaded;
export const getError = (state: RootState) => state.errorMessage;
export const getComments = (state: RootState) => (
  [...state.comments].sort((a, b) => b.date - a.date)
);

export const loadComments = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const data = await api.getData<CommentItem>();

      dispatch(setComments(data));
      dispatch(setLoaded());
    } catch (error) {
      dispatch(setErrorMessage(`Error occurred when loading data: ${error}`));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
