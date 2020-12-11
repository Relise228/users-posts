import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPostsList, selectPosts} from '../../features/postsSlice';
import Modal from './Modal/Modal';
import PostBox from './PostBox/PostBox';
import './Posts.css';

function Posts({match, history}) {
  const idUser = match.params.id;
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getPostsList(idUser));
  }, []);

  const posts = useSelector(selectPosts);

  return (
    <div className='posts'>
      <div className='posts__title'>
        <button onClick={() => history.push('/')}>&#10229;</button>
        Posts
      </div>
      <button className='posts__addButton' onClick={() => setShowPopup(true)}>
        Add new post
      </button>
      <div className='posts__wrapper'>
        {posts.map((post) => (
          <PostBox key={post.id} post={post} history={history} />
        ))}
      </div>
      {showPopup && <Modal closeModal={setShowPopup} userId={idUser} />}
    </div>
  );
}

export default Posts;
