import React from "react";
import {ACCESS_TOKEN} from "../constants.js";
import {useNavigate} from "react-router-dom";

export const Menu = () => {
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            if (localStorage.getItem(ACCESS_TOKEN)){
                navigate("/logout")
            }
            else navigate("/login")
        } catch (error) {
            alert(error)
        }
    };

  return (
      <div className="bg-white min-w-[300px] rounded-lg shadow-lg sticky top-0 flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between p-4 border-b">
              <img
                  src="https://tools-api.webcrumbs.org/image-placeholder/40/40/avatar/1"
                  alt="Avatar"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  onClick={() => {navigate("/profile")}}
              />
              <button
                  onClick={handleClick}
                  className={`rounded-full bg-primary text-white w-[30px] h-[30px] flex items-center justify-center`}
              >
              <span className="material-symbols-outlined">
                {localStorage.getItem(ACCESS_TOKEN) ? "logout" : "login"}
              </span>
              </button>
          </div>
          <nav className="flex flex-col">
              <a
                  href="/"
                  className="flex items-center p-3 rounded-md hover:bg-gray-200 transition"
              >
                  <span className="material-symbols-outlined">home</span>
                  <span className="ml-2">Home</span>
              </a>
              <a
                  href="/news"
                  className="flex items-center p-3 rounded-md hover:bg-gray-200 transition"
              >
                  <span className="material-symbols-outlined">News</span>
                  <span className="ml-2">News</span>
              </a>
              <a
                  href="/posts"
                  className="flex items-center p-3 rounded-md hover:bg-gray-200 transition"
              >
                  <span className="material-symbols-outlined">Post</span>
                  <span className="ml-2">Posts</span>
              </a>
              <a
                  href="#"
                  className="flex items-center p-3 rounded-md hover:bg-gray-200 transition"
              >
                  <span className="material-symbols-outlined">help</span>
                  <span className="ml-2">Help</span>
              </a>
          </nav>
      </div>
  );
};

export default Menu