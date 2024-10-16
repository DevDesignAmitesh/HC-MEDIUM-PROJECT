import { useEffect, useState } from "react";
import BlogPost from "../component/BlogPost";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface BlogPostType {
  id: string;
  title: string;
  content: string;
}

interface ApiResponse {
  blogs: BlogPostType[];
}

function BlogPage() {

  const [blog, setBlog] = useState<BlogPostType[]>([])

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onClickHandler = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await axios.get<ApiResponse>(`${BACKEND_URL}/api/v1/blog/blog`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlog(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <main className="min-h-screen flex justify-center items-center flex-col relative w-full bg-gray-100">
      <header className=" absolute flex px-10 justify-between items-center top-0 h-[80px] w-full">
        <div className="flex">
          <h1 className="text-3xl text-black font-bold">LOGO</h1>
        </div>
        <div className="flex items-center gap-4 md:gap-10 md:w-[50%] w-full justify-end">
          {token && (
            <div
              onClick={() => navigate("/postBlog")}
              className="h-[40px] whitespace-nowrap cursor-pointer w-[40px] text-4xl font-bold text-black rounded-full flex justify-center items-center"
            >
              +
            </div>
          )}
          {token ? (
            <Button label="Logout" onClick={onClickHandler} />
          ) : (
            <span className="flex gap-4">
              <Button label="Signup" onClick={() => navigate("/signup")} />
              <Button label="Signin" onClick={() => navigate("/signin")} />
            </span>
          )}
        </div>
      </header>
      <div className="flex flex-col w-full mt-[150px] mb-10 gap-20">
        {blog.map((val: BlogPostType) => <BlogPost getPost={getPost} key={val.id} title={val.title} id={val.id} content={val.content}  />)}
      </div>
    </main>
  );
}

export default BlogPage;
