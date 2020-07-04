import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment } from './components/AddComment';
import { Comments } from './components/Comments';
import { Preloader } from './components/Preloader/Preloader';
import * as store from './store';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(store.isLoading);
  const isLoaded = useSelector(store.isLoaded);

  useEffect(() => {
    dispatch(store.loadComments());
  }, [dispatch]);

  return (
    <main className="container">
      <h1>
        Guestbook
      </h1>
      <AddComment />
      {isLoading && !isLoaded && <Preloader />}
      {isLoaded && <Comments />}
    </main>
  );
};
