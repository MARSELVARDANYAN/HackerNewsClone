import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navBar"> 
      <Link className="item" to="/" style={{ marginRight: "10px", color: "black" }}><strong>Hacker News</strong></Link>
      <Link to="/newest" style={{ marginRight: "10px", color: "black" }}>new</Link>
      <Link to="/front" style={{ marginRight: "10px", color: "black" }}>past</Link>
      <Link to="/comments" style={{ marginRight: "10px", color: "black" }}>comments</Link>
      <Link to="/ask" style={{ marginRight: "10px", color: "black" }}>ask</Link>
      <Link to="/show" style={{ marginRight: "10px", color: "black" }}>show</Link>
      <Link to="/jobs" style={{ marginRight: "10px", color: "black" }}>jobs</Link>
      <Link to="/submit" style={{ marginRight: "10px", color: "black" }}>posts</Link>
      <Link to="/register" style={{ marginRight: "10px", color: "black" }}>register</Link>
      <Link to="/login" style={{ marginRight: "10px", color: "black" }}>login</Link>
      <Link to="/logout" style={{ marginRight: "100px", color: "black" }}>logout</Link>
    </nav>
  );
};

export default NavBar;
