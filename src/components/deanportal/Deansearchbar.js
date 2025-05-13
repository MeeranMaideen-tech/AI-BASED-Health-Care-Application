import React from "react";
import "./deanportalcss/deansearchbar.css";

const SearchBar = () => {
  const handleSearch = () => {
    console.log("Search button clicked!");
    // Add search logic here
  };

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." className="search-input" />
      <button className="searchd-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
