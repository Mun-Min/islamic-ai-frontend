// Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const tabStyle = (path) =>
    `px-4 py-2 rounded-full text-base md:text-lg font-medium transition ${
      location.pathname === path
        ? "bg-white text-black"
        : "text-white hover:bg-white hover:text-black"
    }`;

  return (
    <header className="w-full bg-black bg-opacity-70 shadow-md px-4 py-3 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Islamic AI</div>

      <nav className="space-x-2 md:space-x-4 flex">
        <Link to="/" className={tabStyle("/")}>
          Home
        </Link>
        <Link to="/chat" className={tabStyle("/chat")}>
          Chat
        </Link>
      </nav>
    </header>
  );
};

export default Header;
