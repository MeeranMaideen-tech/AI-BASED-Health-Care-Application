import React from "react";
import "./doctorportalcss/SearchBar.css";

const SearchBar = () => {
  const handleSearch = () => {
    console.log("Search button clicked!");
    // Add search logic here
  };

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." className="search-input" />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
