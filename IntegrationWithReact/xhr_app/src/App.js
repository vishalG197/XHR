import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = event => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => {
        if (response.status === 201) {
          setSuccessMessage('Post added successfully');
          setNewPost({ title: '', body: '' });
        } else {
          setError('Error adding post');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}
      <form id="postForm" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={newPost.title} onChange={handleInputChange} required />
        <textarea name="body" placeholder="Body" value={newPost.body} onChange={handleInputChange} required />
        <button type="submit">Add Post</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div id="posts">
        {posts.map(post => (
          <div key={post.id} className="post">
            {post.title}
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default App;
