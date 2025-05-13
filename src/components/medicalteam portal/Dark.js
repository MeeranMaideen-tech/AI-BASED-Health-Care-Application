import React, { useEffect, useState } from "react";

function Dark() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode)); // Fix: Store as string
  }, [darkMode]);

  return (
    <button
      className="p-2 text-xl transition-all duration-300 rounded-full 
                 bg-gray-200 dark:bg-gray-800 dark:text-yellow-300 
                 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}

export default Dark;
