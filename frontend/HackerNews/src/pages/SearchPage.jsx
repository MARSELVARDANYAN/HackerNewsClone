import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPosts } from "../services/api";

const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <mark key={index} style={{ backgroundColor: "yellow", padding: "0 2px" }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const SearchPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const data = await getPosts();
        const filtered = data.data.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          (post.content && post.content.toLowerCase().includes(query.toLowerCase()))
        );
        setSearchResults(filtered);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h2>Search Results for "<em>{query}</em>"</h2>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        searchResults.map((post) => (
          <div key={post._id} style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #ddd" }}>
            <h3>{highlightText(post.title, query)}</h3>
            {post.url && (
              <p>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {highlightText(post.url, query)}
                </a>
              </p>
            )}
            {post.content && <p>{highlightText(post.content.slice(0, 150), query)}...</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default SearchPage;
