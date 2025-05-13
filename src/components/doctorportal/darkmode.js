import "./doctorportalcss/darkmode.css";

import React, { useState, useEffect } from "react";


const Darkmode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {darkMode ? "🌞" : "🌙"}
    </button>
  );
};

export default Darkmode;
