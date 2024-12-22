import React, {useEffect, useState} from "react";

import "../styles/Home.css";
import Menu from "../components/Menu.jsx";
import api from "../api.js";
import {useNavigate} from "react-router-dom";

export const Home = () => {
  const [news, setNews] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/api/v1/news?limit=5");
        setNews(response.data.results);
      } catch (error) {
        console.error("Ошибка при получении новостей:", error);
      }
    };
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/v1/posts?limit=5");
        setPosts(response.data.results);
      } catch (error) {
        console.error("Ошибка при получении постов:", error);
      }
    };
    fetchNews();
    fetchPosts()
  }, []);

  return (
    <div id="webcrumbs">
      <div className="flex h-[100vh]">
        <Menu/>
        <section className="flex-grow p-6 flex flex-col space-y-6 overflow-hidden">
          <header>
            <h1 className="text-4xl font-title font-semibold text-center">
              ГастоБлог
            </h1>
          </header>
          <div className="flex-grow flex flex-col gap-6">
            <article className="rounded-lg shadow-md bg-white p-6 relative">
              <h2 className="text-2xl font-semibold mb-4">News</h2>
              <button
                  onClick={() => {navigate("/news")}}
                  className="absolute top-6 right-6 bg-primary-500 text-white font-semibold rounded-md px-4 py-2">
                Посмотреть все
              </button>
              <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
                {news.map((item, i) => (
                    <div
                        key={i}
                        className="rounded-md bg-gray-200 p-4 space-y-2 w-[40%] basis-[40%] shrink-0 flex-none h-[300px]"
                    >
                      {/*<p className="font-semibold text-center">{item.author}</p>*/}
                      <h3 className="font-semibold text-center">{item.title}</h3>
                      <p className="text-sm text-center line-clamp-10 break-words">{item.body}</p>
                    </div>
                ))}
              </div>
            </article>
            <article className="rounded-lg shadow-md bg-white p-6 relative">
              <h2 className="text-2xl font-semibold mb-4">Posts</h2>
              <button
                  onClick={() => {navigate("/posts")}}
                  className="absolute top-6 right-6 bg-primary-500 text-white font-semibold rounded-md px-4 py-2">
                Посмотреть все
              </button>
              <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
                {posts.map((item, i) => (
                    <div
                        key={i}
                        className="rounded-md bg-gray-200 p-4 space-y-2 w-[40%] basis-[40%] shrink-0 flex-none h-[300px]"
                    >
                      <p className="font-semibold text-center">{item.user}</p>
                      <h3 className="font-semibold text-center">{item.title}</h3>
                      <p className="text-sm text-center line-clamp-10 break-words">{item.body}</p>
                    </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
