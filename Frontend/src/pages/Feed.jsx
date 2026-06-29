import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios.get('http://localhost:3000/posts').then((res) => {
      console.log(res.data);

      setPosts(res.data.data || []);
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='feed-page'>
      <header className='feed-header'>
        <div className='header-container'>
          <h1 className='logo-text'>InstaVibe</h1>
          <Link
            to='/create-post'
            className='create-btn'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='btn-icon'
            >
              <path
                fillRule='evenodd'
                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
                clipRule='evenodd'
              />
            </svg>
            Create Post
          </Link>
        </div>
      </header>

      <main className='feed-container'>
        <section className='feed-section'>
          {posts.length === 0 ? (
            <div className='no-posts'>
              <h2>No posts yet</h2>
              <p>Be the first to share something amazing!</p>
              <Link
                to='/create-post'
                className='create-btn-large'
              >
                Create a Post
              </Link>
            </div>
          ) : (
            posts.map((post) => {
              return (
                <article
                  key={post._id}
                  className='post-card'
                >
                  <div className='post-image-container'>
                    <img
                      src={post.image}
                      alt={post.caption}
                      className='post-image'
                    />
                  </div>
                  <div className='post-content'>
                    <p className='post-caption'>{post.caption}</p>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
};

export default Feed;
