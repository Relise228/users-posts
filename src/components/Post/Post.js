import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {
  getComments,
  selectPost,
  selectComments,
  editPost,
  deletePost,
} from '../../features/postsSlice';
import Comment from './Comment/Comment';
import './Post.css';

function Post({history}) {
  const post = useSelector(selectPost);
  const dispatch = useDispatch();

  const comments = useSelector(selectComments);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(post[0]?.title);
  const [body, setBody] = useState(post[0]?.body);

  const onSavePost = () => {
    dispatch(editPost(post[0].id, post[0].userId, title, body));
    setEdit(false);
  };

  const deltePost = async () => {
    await dispatch(deletePost(post[0]));
    history.push('/posts/' + post[0].userId);
  };

  useEffect(() => {
    dispatch(getComments(post[0]?.id));
  }, []);

  return post.length == 0 ? (
    <Redirect to='/' />
  ) : (
    <div className='post'>
      <div className='post__header'>
        <button onClick={() => history.push('/posts/' + post[0].userId)}>
          &#10229;
        </button>
        Post
      </div>
      <div className='post__infoWrapper'>
        <div className='post__title'>
          {edit ? (
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            title
          )}
        </div>
        <div className='post__body'>
          {edit ? (
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          ) : (
            body
          )}
        </div>
        <div className='post__buttons'>
          {edit ? (
            <button onClick={onSavePost}>Save</button>
          ) : (
            <button onClick={() => setEdit(true)}>Edit</button>
          )}
          <button onClick={deltePost}>Delete</button>
        </div>
      </div>
      <div className='post__comments'>
        <div className='post__commentsTitle'>Comments</div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default Post;
