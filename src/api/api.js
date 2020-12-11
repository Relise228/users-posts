export const api = {
  geUsers: () => {
    return fetch(
      'https://jsonplaceholder.typicode.com/users'
    ).then((response) => response.json());
  },
  getPosts: (id) => {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    ).then((response) => response.json());
  },
  addPost: (title, body, id) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
  },
  getCommentsToPost: (postId) => {
    return fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    ).then((response) => response.json());
  },
  putPost: (id, userId, title, body) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
  },
  deletePost: () => {
    return fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    }).then((response) => response.json());
  },
};
