import {createSlice} from '@reduxjs/toolkit';
import {api} from '../api/api';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    addedPosts: [],
    currentPost: [],
    comments: [],
    deletedPosts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    pushPost: (state, action) => {
      const post = action.payload;
      state.addedPosts = [...state.addedPosts, post];

      state.posts = [
        ...state.posts,
        ...state.addedPosts.filter((p) => p.id === post.id),
      ];
    },
    setCurrentPost: (state, action) => {
      state.currentPost = state.posts.filter(
        (post) => post.id == action.payload
      );
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    mergePosts: (state) => {
      state.posts = [
        ...state.posts,
        ...state.addedPosts.filter((p) => p.userId == state.posts[0].userId),
      ];
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((p) => {
        if (p.id === action.payload.id) {
          return {...p, ...action.payload};
        }
        return p;
      });
      state.currentPost = [action.payload];
    },
    setDeletedPosts: (state, action) => {
      state.deletedPosts = [...state.deletedPosts, action.payload];
    },
    mergeDeletedPosts: (state) => {
      state.posts = [
        ...state.posts.filter(
          ({id: id1}) => !state.deletedPosts.some(({id: id2}) => id2 === id1)
        ),
      ];
    },
  },
});

export const {
  setPosts,
  pushPost,
  setCurrentPost,
  setComments,
  mergePosts,
  updatePost,
  setDeletedPosts,
  mergeDeletedPosts,
} = postsSlice.actions;

export const getPostsList = (id) => (dispatch) => {
  api.getPosts(id).then((data) => {
    dispatch(setPosts(data));
    dispatch(mergePosts()); /////////////// Злиття з addedPost
    dispatch(mergeDeletedPosts());
  });
};

export const addPost = (title, body, id) => (dispatch) => {
  api.addPost(title, body, id).then((data) =>
    dispatch(
      pushPost({
        ...data,
        id: data.id + Math.round(Math.random() * 1000),
      }) /////////////// API Не запам'ятовує зміни тому є додатковий масив(addedPost), він зливається з масивом який приходить з API
    )
  );
};

export const editPost = (id, userId, title, body) => (dispatch) => {
  api
    .putPost(id, userId, title, body) //////// API НЕ ЗБЕРІГАЄ ЗМІНИ
    .then((data) => dispatch(updatePost({id, userId, title, body}))); //////// Не використовую відповіть сервера оскільки він надисилає не коректне userId,
  //////// Пост оновлюється в state, але при кожному новому рендерингу компоненти Posts
  //////// дані приходять з API, тому додані пости не будуть відображені при ререндерингу
};

export const getComments = (postId) => (dispatch) => {
  api.getCommentsToPost(postId).then((data) => dispatch(setComments(data)));
};

export const deletePost = (post) => (dispatch) => {
  api.deletePost().then((data) => {
    dispatch(setDeletedPosts(post));
    dispatch(mergeDeletedPosts());
  });
};

export const selectPosts = (state) => state.posts.posts;

export const selectPost = (state) => state.posts.currentPost;

export const selectComments = (state) => state.posts.comments;

export default postsSlice.reducer;
