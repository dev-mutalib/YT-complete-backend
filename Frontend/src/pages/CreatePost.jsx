import React from 'react';
import axios from 'axios';

const CreatePost = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    axios
      .post('http://localhost:3000/create-post', formdata)
      .then((res) => console.log(res.data))
      .catch((err) => {});
  };

  return (
    <>
      <section className='create-post-section'>
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
          <input
            type='file'
            name='image'
            accept='image/*'
          />
          <input
            type='text'
            name='caption'
            placeholder='Enter caption'
            required
          />
          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  );
};

export default CreatePost;
