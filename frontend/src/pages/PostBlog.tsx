import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../component/Button";

function PostBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onClickHandler = async () => {
    const token = localStorage.getItem("token");
    if(!title || !content) {
      alert("Please add inputs")
      return;
    }
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/getBlogs")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center relative bg-gray-100">
      <header className="absolute flex px-10 justify-between items-center top-0 h-[80px] w-full">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl text-black font-bold">LOGO</h1>
        </div>
        <div className="flex items-center gap-4 md:gap-10 justify-end">
          <button
            onClick={onClickHandler}
            className="bg-green-600 p-3 rounded-md text-white font-semibold text-[15px]"
          >
            Publish
          </button>
          <Button label="Cancel" onClick={() => navigate("/getBlogs")} />
        </div>
      </header>
        <div className="flex w-full px-10 relative flex-col items-center justify-center gap-5">
          <input
            onChange={(e) => setTitle(e.target.value)}
            maxLength={20}
            type="text"
            className="text-[60px] w-full outline-none bg-transparent"
            placeholder="Title"
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            maxLength={100}
            className="outline-none text-3xl h-[200px] overflow-hidden bg-transparent w-full"
            placeholder="Tell me your story"
          />
      </div>
    </main>
  );
}

export default PostBlog;
