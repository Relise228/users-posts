import React from 'react';
import './Comment.css';

function Comment({comment}) {
  return (
    <div className='comment'>
      <div className='comment__name'>{comment.name}</div>
      <div className='comment__email'>{comment.email}</div>
      <div className='comment__body'>{comment.body}</div>
    </div>
  );
}

export default Comment;
