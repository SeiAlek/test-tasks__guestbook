import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment } from './components/AddComment';
import { Comments } from './components/Comments';
import { Preloader } from './components/Preloader/Preloader';
import * as store from './store';
import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store.isLoading);
  const isLoaded = useSelector(store.isLoaded);
  const errorMessage = useSelector(store.getError);

  const load = () => {
    dispatch(store.loadComments());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="App container">
      <h1>
        Guestbook
      </h1>
      {isLoading && !isLoaded && <Preloader />}
      {isLoaded && (
        <>
          <AddComment />
          <Comments />
        </>
      )}
      {errorMessage && (
        <div className="App__Error">
          <h2 className="App__ErrorTitle">
            Oops..
          </h2>
          <div className="App__ErrorBody">
            {errorMessage}
          </div>
          <button
            type="button"
            className="App__Button"
            onClick={load}
          >
            Try Again
          </button>
        </div>
      )}
    </main>
  );
};
