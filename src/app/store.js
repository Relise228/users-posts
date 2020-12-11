import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});
