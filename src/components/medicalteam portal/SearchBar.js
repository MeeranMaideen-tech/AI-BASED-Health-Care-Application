import React from "react";

function SearchBar() {
  return (
    <div className="relative flex items-center">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
      />
      
      {/* Search Button Inside Input */}
      <button className="absolute right-3 text-gray-500 hover:text-blue-600">
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
