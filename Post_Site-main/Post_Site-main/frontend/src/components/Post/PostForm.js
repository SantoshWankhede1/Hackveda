import React, { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin:50px;
  margin-top:10px;

  label {
    font-size: 1.2rem;
    margin-bottom: 10px;
    display: block;
  }

  input,
  textarea {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 20px;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
  }
`;

const PostForm = () => {
    const [data, setData] = useState({
		title: "",
		imageUrl: "",
		description: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/post";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      window.location.reload();
    
    } catch (error) {
      console.log("Error at post page:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <h3 className="text-1xl font-bold mb-1">Post Title:</h3>
      <input
        type="text"
        id="postTitle"
        name="title"
        value={data.title}
        onChange={handleChange}
      />
      <h3 className="text-1xl font-bold mb-1"> Image URL:</h3>
      <input
        type="text"
        id="postImage"
        name="imageUrl"
        value={data.imageUrl}
        onChange={handleChange}
      />
      <h3 className="text-1xl font-bold mb-1">Post Description:</h3>
      <textarea
        id="postDescription"
        name="description"
        value={data.description}
        onChange={handleChange}
      />
      <button type="submit">Create Post</button>
    </Form>
  );
};

export default PostForm;
