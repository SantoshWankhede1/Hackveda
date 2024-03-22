import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
import PostForm from "../Post/PostForm";
import PostDisplay from '../Post/PostDisplay';
import axios from "axios";

const Main = () => {
    const [showPostForm, setShowPostForm] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const togglePostForm = () => {
        setShowPostForm(!showPostForm);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const url = "http://localhost:5000/posts";
            const response = await axios.get(url);
            setPosts(response.data.PostDisplay || []); 
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div >
            <nav className="w-full h-20 bg-teal-500 flex items-center justify-between">
                <h1 className='text-white text-3xl ml-4 font-bold'>Welcome to Omkar's Insta</h1>
                <button className="border-none outline-none py-3 px-5 bg-white text-black rounded-full font-bold text-sm cursor-pointer mr-5" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className="flex w-full justify-center ">
                <button className="w-96 m-4" onClick={togglePostForm}>
                {showPostForm ? "Close This" : "Click Here To Create New Post"}
            </button>
            </div>
            
            {showPostForm && <PostForm />}
            {posts.map((post, index) => (
                <PostDisplay
                    key={index}
                    title={post.title}
                    image={post.imageUrl}
                    description={post.description}
                />
            ))}
        </div>
    );
};

export default Main;
