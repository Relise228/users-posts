import {createSlice} from '@reduxjs/toolkit';
import {api} from '../api/api';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {setUsers} = usersSlice.actions;

export const getUsersList = () => (dispatch) => {
  api.geUsers().then((data) => dispatch(setUsers(data)));
};

export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;
