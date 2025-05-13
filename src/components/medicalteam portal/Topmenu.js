import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Notification from "./Notification";

function Topmenu({ toggleSidebar }) {
  return (
    <div className="fixed top-0 w-full h-16 bg-blue-900 text-white flex items-center justify-between px-4 z-50 border-b-2" style={{ borderBottomColor: "#07a794" }}>
      {/* Left: Logo + Hamburger Button */}
      <div className="flex items-center">
        <Logo />
        <button onClick={toggleSidebar} className="ml-4 text-2xl">☰</button>
      </div>

      {/* Middle: SearchBar */}
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      {/* Right: Notifications */}
      <div>
        <Notification />
      </div>
    </div>
  );
}

export default Topmenu;
