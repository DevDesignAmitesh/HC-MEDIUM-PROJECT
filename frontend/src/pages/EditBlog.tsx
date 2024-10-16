import  { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegBell } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../component/Button";

function EditBlog() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    title: initialTitle,
    content: initialContent,
    id: initialId,
  } = location.state || {};

  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");
  const id = initialId;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onClickHandler = async () => {
    const token = localStorage.getItem("token");
    if(title === initialTitle || content === initialContent){
      alert("Inputs cant be same you can cancel the operation")
      return
    }
    if (!token) {
      console.log("token not found");
      return;
    }
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog/blog`,
        { id, title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/getBlogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-start py-[150px] relative bg-gray-100">
      <header className=" absolute flex px-20 justify-between items-center top-0 h-[80px] w-full">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl text-black font-bold">LOGO</h1>
        </div>
        <div className="flex w-[650px] h-full gap-10 items-center justify-center">
          <button
            onClick={onClickHandler}
            className="bg-green-600 p-3 whitespace-nowrap rounded-md text-white font-semibold text-[15px]"
          >
            Save Edit
          </button>
          <Button label="Cancel" onClick={() => navigate("/getBlogs")} />
          <HiDotsHorizontal size={25} style={{ cursor: "pointer" }} />
          <FaRegBell size={25} style={{ cursor: "pointer" }} />
          <div className="h-[40px] cursor-pointer w-[40px] text-white rounded-full bg-gray-800 flex justify-center items-center">
            A
          </div>
        </div>
      </header>
      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col items-start justify-center gap-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={20}
            type="text"
            className="text-[60px] outline-none bg-transparent"
            placeholder="Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={50}
            className="outline-none text-3xl h-[200px] overflow-hidden bg-transparent w-full"
            placeholder="Tell me your story"
          />
        </div>
      </div>
    </main>
  );
}

export default EditBlog;
