import React, {useEffect, useState} from "react";

import "../styles/Home.css";
import Menu from "../components/Menu.jsx";
import api from "../api.js";
import {USERNAME} from "../constants.js";
import {CustomModal} from "../components/CustomModal.jsx";

export const Profile = () => {
  const [news, setNews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDataNews, setModalDataNews] = useState({});

  const openModalNews = (data) => {
      setModalIsOpen(true);
      setModalDataNews(data);
  };

  const [modalDataPosts, setModalDataPosts] = useState({});

  const openModalPosts = (data) => {
      setModalIsOpen(true);
      setModalDataPosts(data);
  };
  const closeModal = () => {setModalIsOpen(false);};

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get(`/api/v1/news?author=${localStorage.getItem(USERNAME)}`);
        setNews(response.data);
      } catch (error) {
        console.error("Ошибка при получении новостей:", error);
      }
    };
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/api/v1/posts?username=${localStorage.getItem(USERNAME)}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Ошибка при получении постов:", error);
      }
    };
    fetchNews();
    fetchPosts();
  }, []);

  const modalContentNews = (
      <form style={{
        backgroundColor: '#f5f5f5',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '50vh',
        width: '50vh'
      }}
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await api.patch(`api/v1/news/${modalDataNews.id}/`, {title: modalDataNews.title, body: modalDataNews.body});
          } catch (error) {
            console.error("Ошибка при обновлении новочти:", error);
          }
          const fetchNews = async () => {
          try {
              const response = await api.get(`/api/v1/news?author=${localStorage.getItem(USERNAME)}`);
              setNews(response.data);
            } catch (error) {
              console.error("Ошибка при получении новостей:", error);
            }
          };
          await fetchNews();
          closeModal();
        }}>
        <h2 style={{fontSize: '24px', fontWeight: 600}}>Редактировать Новость</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <label htmlFor="edit-news-title" style={{fontWeight: 500}}>Название новости</label>
          <input
              type="text"
              id="edit-news-title"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #d1d5db'
              }}
              placeholder="Введите заголовок"
              value={modalDataNews.title || ''}
              onChange={(e) => {
                setModalDataNews(prevState => ({
                  ...prevState,
                  title: e.target.value
                }));
              }}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <label htmlFor="edit-news-content" style={{fontWeight: 500}}>Текст новости</label>
          <textarea
              id="edit-news-content"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                height: '150px',
                maxHeight: '250px',
                minHeight: '100px'
              }}
              placeholder="Введите текст"
              value={modalDataNews.body || ''}
              onChange={(e) => {
                setModalDataNews(prevState => ({
                  ...prevState,
                  body: e.target.value
                }));
              }}
          />
        </div>
        <button
            type="submit"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 600,
              borderRadius: '4px',
              padding: '8px',
              width: '100%',
              marginTop: 'auto'
            }}
        >
          Сохранить
        </button>
      </form>

  );

  const modalContentPosts = (
      <form style={{
        backgroundColor: '#f5f5f5',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '50vh',
        width: '50vh'
      }}
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await api.patch(`api/v1/posts/${modalDataPosts.id}/`, {title: modalDataPosts.title, body: modalDataPosts.body});
          } catch (error) {
            console.error("Ошибка при обновлении поста:", error);
          }
          const fetchPosts = async () => {
            try {
              const response = await api.get(`/api/v1/posts?username=${localStorage.getItem(USERNAME)}`);
              setPosts(response.data);
            } catch (error) {
              console.error("Ошибка при получении постов:", error);
              }
            };
          await fetchPosts();
          closeModal();
        }}>
        <h2 style={{fontSize: '24px', fontWeight: 600}}>Редактировать Пост</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <label htmlFor="edit-news-title" style={{fontWeight: 500}}>Название поста</label>
          <input
              type="text"
              id="edit-news-title"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #d1d5db'
              }}
              placeholder="Введите заголовок"
              value={modalDataPosts.title || ''}
              onChange={(e) => {
                setModalDataPosts(prevState => ({
                  ...prevState,
                  title: e.target.value
                }));
              }}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <label htmlFor="edit-news-content" style={{fontWeight: 500}}>Текст поста</label>
          <textarea
              id="edit-news-content"
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                height: '150px',
                maxHeight: '250px',
                minHeight: '100px'
              }}
              placeholder="Введите текст"
              value={modalDataPosts.body || ''}
              onChange={(e) => {
                setModalDataPosts(prevState => ({
                  ...prevState,
                  body: e.target.value
                }));
              }}
          />
        </div>
        <button
            type="submit"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 600,
              borderRadius: '4px',
              padding: '8px',
              width: '100%',
              marginTop: 'auto'
            }}
        >
          Сохранить
        </button>
      </form>

  );

  return (
      <div id="webcrumbs">
        <div className="flex h-[100vh]">
          <Menu/>
          <section className="flex-grow p-6 flex flex-col space-y-6 overflow-hidden">
            <header>
              <h1 className="text-4xl font-title font-semibold text-center">
                Ваш профиль
              </h1>
            </header>
            <div className="flex-grow flex flex-col gap-6">
              <article className="rounded-lg shadow-md bg-white p-6 relative">
                <h2 className="text-2xl font-semibold mb-4">News</h2>
                <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
                  {news.map((item, i) => (
                      <div
                          key={i}
                          className="rounded-md bg-gray-200 p-4 space-y-2 w-[40%] basis-[40%] shrink-0 flex-none h-[300px]"
                      >
                        {/*<p className="font-semibold text-center">{item.author}</p>*/}
                        <h3 className="font-semibold text-center break-words">{item.title}</h3>
                        <p className="text-sm text-center line-clamp-10 break-words">{item.body}</p>
                        <button
                            style={
                              {
                                marginTop: "180px",
                              }
                            }
                            onClick={() => openModalNews(item)}
                            className="bg-primary-500 text-white font-semibold rounded-md px-4 py-2 w-full mt-auto">
                          Редактировать
                        </button>
                        <CustomModal
                            isOpen={modalIsOpen}
                            onClose={closeModal}
                        >
                          {modalContentNews}
                        </CustomModal>
                      </div>
                  ))}
                </div>
              </article>
              <article className="rounded-lg shadow-md bg-white p-6 relative">
                <h2 className="text-2xl font-semibold mb-4">Posts</h2>
                <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
                  {posts.map((item, i) => (
                      <div
                          key={i}
                          className="rounded-md bg-gray-200 p-4 space-y-2 w-[40%] basis-[40%] shrink-0 flex-none h-[300px]"
                      >
                        {/*<p className="font-semibold text-center">{item.user}</p>*/}
                        <h3 className="font-semibold text-center">{item.title}</h3>
                        <p className="text-sm text-center line-clamp-10 break-words">{item.body}</p>
                        <button
                            style={
                              {
                                marginTop: "150px",
                              }
                            }
                            onClick={() => openModalPosts(item)}
                            className="bg-primary-500 text-white font-semibold rounded-md px-4 py-2 w-full mt-auto">
                          Редактировать
                        </button>
                        <CustomModal
                            isOpen={modalIsOpen}
                            onClose={closeModal}
                        >
                          {modalContentPosts}
                        </CustomModal>
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

export default Profile;
