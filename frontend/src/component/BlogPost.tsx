import React from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface BlogContent {
  id: string;
  title: string;
  content: string;
  getPost: () => Promise<void>
}

function BlogPost({ title, content, id, getPost }: BlogContent) {
  const navigate = useNavigate();
  const location = useLocation();
  const {username: initialUsername} = location.state || {}
  const authUser = initialUsername;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onClickHandler = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        return console.log("token not found");
      }
      axios.delete(`${BACKEND_URL}/api/v1/blog/blog`, {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getPost();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center md:justify-between px-10">
      <div className="flex flex-col justify-center gap-3 items-start w-full md:w-[40%]">
        <div className="flex items-center gap-3">
          <img
            className="h-[30px] w-[30px] bg-gray-800 rounded-full"
            src=""
            alt=""
          />
          <p className="font-semibold"></p>
          <p className="text-gray-600 font-medium">{authUser}</p>
          <p className="text-gray-600 font-medium">Member only</p>
        </div>
        <div className="flex flex-col">
          <p onClick={() => navigate("/getYourBlogs", {state: {title, content, id}})} className="text-xl cursor-pointer font-bold text-black">{title}</p>
          <p className="text-[16px] font-medium text-gray-700">{content}</p>
        </div>
        <div className="flex justify-between w-full items-center">
          <div className="flex gap-2 items-center">
            <span className="bg-gray-500 whitespace-nowrap text-white font-medium px-2 py-1 rounded-md">
              Side Hustle
            </span>
            <span className="text-gray-500 font-semibold">3 min reads</span>
          </div>
          <div className="flex gap-4 items-center">
            <MdOutlineBookmarkAdd size={25} />
            <button
              onClick={onClickHandler}
              className="text-red-500 font-semibold"
            >
              Delete
            </button>
            <button onClick={() => navigate("/editBlog", {state: {title, content, id}})} className="font-semibold text-slate-700">Edit blog</button>
            <HiDotsHorizontal size={25} />
          </div>
        </div>
      </div>
      <img
        className="h-[230px] hidden md:block object-cover object-center rounded-md"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fsOt7v6Khe3qvPp3vq_Y06l9QOOt0DmEvw&s"
        alt=""
      />
    </div>
  );
}

export default BlogPost;
