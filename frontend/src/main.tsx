import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.tsx";
import Signin from "./pages/Signin.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import Blog from "./pages/Blog.tsx";
import PostBlog from "./pages/PostBlog.tsx";
import Protector from "./component/Protector.tsx";
import EditBlog from "./pages/EditBlog.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/getBlogs",
    element: <Protector><BlogPage /></Protector>,
  },
  {
    path: "/getYourBlogs",
    element: <Protector><Blog /></Protector>,
  },
  {
    path: "/postBlog",
    element: <Protector><PostBlog /></Protector>,
  },
  {
    path: "/editBlog",
    element: <Protector><EditBlog /></Protector>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
