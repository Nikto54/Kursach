import React, {useEffect, useState} from "react";

import "../styles/News.css";
import Menu from "../components/Menu.jsx";
import api from "../api.js";
import {CustomModal} from "../components/CustomModal.jsx";


export const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (data) => {
      setModalIsOpen(true);
      setModalData(data);
  };
  const closeModal = () => {setModalIsOpen(false);};

  const modalContent = (
      <div key={modalData.id} className="">
          <h2>{modalData.user}</h2>
          <h2>{modalData.title}</h2>
          <text>
              {modalData.body}
          </text>
      </div>
  );

    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/v1/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div id="webcrumbs">
        <div className="w-[800px] h-[100vh] bg-white shadow-lg rounded-lg flex overflow-hidden">
            <Menu/>
            <section className="flex-grow p-6 flex flex-col space-y-6 overflow-hidden">
                <header>
                    <h1 className="text-4xl font-title font-semibold text-center">
                        Посты
                    </h1>
                </header>
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                    {posts.map((post, i) => (
                      <article
                        key={post.id}
                        className="bg-white rounded-lg shadow-md p-6 space-y-4"
                      >
                        <h2 className="text-xl font-semibold text-center">{post.title}</h2>
                        <p className="text-sm line-clamp-3 ">
                          {post.body}
                        </p>
                        <button
                            onClick={() => openModal(post)}
                          className="bg-primary-500 text-white font-semibold rounded-md px-4 py-2 w-full mt-auto"
                        >
                          Читать
                        </button>
                      </article>
                    ))}
                    <CustomModal
                              isOpen={modalIsOpen}
                              onClose={closeModal}
                              submitButton="Закрыть"
                            >
                              {modalContent}
                            </CustomModal>
                </div>
            </section>
        </div>
    </div>
  )
}

export default News