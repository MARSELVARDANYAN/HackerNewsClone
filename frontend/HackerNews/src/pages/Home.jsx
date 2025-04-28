import React, { useEffect, useState } from "react";
import PostList from '../components/PostsList'; 
import { fetchPosts } from "../services/api"; 

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      fetchPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <PostList posts={posts} />;
};

export default Home;