import React from 'react';
import {useDispatch} from 'react-redux';
import {setCurrentPost} from '../../../features/postsSlice';
import './PostBox.css';

function PostBox({post, history}) {
  const dispatch = useDispatch();
  function openDetails() {
    history.push(`/post/${post.id}`);
    dispatch(setCurrentPost(post.id));
  }

  return (
    <div className='postBox'>
      <div className='postBox__title'>{post.title}</div>
      <button onClick={openDetails}>Details</button>
    </div>
  );
}

export default PostBox;
