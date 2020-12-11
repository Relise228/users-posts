import React from 'react';
import './User.css';

function User({user, history}) {
  return (
    <div className='user'>
      <div className='user__imgDiv'>
        <img src='https://html5css.ru/w3css/img_avatar3.png' alt='' />
      </div>
      <div className='user__infoContainer'>
        <div className='user__name'>
          {user.name}({user.username})
        </div>
        <div className='user__city'>
          City: <strong>{user.address.city}</strong>
        </div>
        <div className='user__email'>
          Email: <strong>{user.email}</strong>
        </div>
        <button onClick={() => history.push(`/posts/${user.id}`)}>
          Show Posts
        </button>
      </div>
    </div>
  );
}

export default User;
