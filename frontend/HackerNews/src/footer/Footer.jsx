import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search}`);
      setSearch("");
    }
  };

  return (
    <footer style={{
      backgroundColor: "#ffffff",
      borderTop: "1px solid #eee",
      padding: "10px 0",
      marginTop: "2rem",
      fontSize: "12px",
      color: "#828282",
      textAlign: "center",
      width: "100%",
      height: "50vh"
    }}>
      
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: "8px" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          style={{
            padding: "4px 8px",
            fontSize: "11px",
            border: "1px solid #d3d3d3",
            borderRadius: "2px",
            width: "160px",
            marginRight: "6px"
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #d3d3d3",
            fontSize: "11px",
            padding: "4px 8px",
            cursor: "pointer",
            borderRadius: "2px"
          }}
        >
          Search
        </button>
      </form>

      <div style={{ marginTop: "4px" }}>
        <span>© {new Date().getFullYear()} Hacker News Clone</span> |
        <a href="#" style={{ color: "#828282", textDecoration: "none", marginLeft: "5px" }}>About</a> |
        <a href="#" style={{ color: "#828282", textDecoration: "none", marginLeft: "5px" }}>Contact</a> |
        <a href="#" style={{ color: "#828282", textDecoration: "none", marginLeft: "5px" }}>API</a>
      </div>
    </footer>
  );
};

export default Footer;
