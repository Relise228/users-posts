import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPost} from '../../../features/postsSlice';
import './Modal.css';

function Modal({closeModal, userId}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const sendPost = () => {
    dispatch(addPost(title, body, userId));
  };

  return (
    <div className='modal'>
      <div className='modal__title'>Add new Post</div>
      <div className='modal__close'>
        <button onClick={() => closeModal(false)}>&#10006;</button>
      </div>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button
        onClick={() => {
          sendPost();
          closeModal(false);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default Modal;
