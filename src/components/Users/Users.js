import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersList, selectUsers} from '../../features/usersSlice';
import User from './User/User';
import './Users.css';

function Users({history}) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  return (
    users && (
      <div className='users'>
        <div className='users__title'>Users</div>
        <div className='users__container'>
          {users.map((user) => (
            <User user={user} key={user.id} history={history} />
          ))}
        </div>
      </div>
    )
  );
}

export default Users;
