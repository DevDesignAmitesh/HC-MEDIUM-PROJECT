import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Blog() {

  const location = useLocation()
  const {title: initialTitle, content: initialContent} = location.state || {}

  const navigate = useNavigate()

  const title = initialTitle;
  const content = initialContent;

  return (
    <main className='h-screen relative w-full flex justify-center items-center md:flex-row flex-col-reverse'>
      <button className='p-2 rounded-md bg-slate-800 text-white font-semibold whitespace-nowrap absolute right-[5%] top-[5%]' onClick={() => navigate("/getBlogs")}>Go back to the dashboard</button>
      <div className='h-screen w-full md:w-[60%] capitalize flex justify-center items-start flex-col p-10 bg-gray-200'>
        <h1 className='text-5xl font-bold text-black leading-tight'>{title}</h1>
        <p className='text-[15px] font-semibold mt-2 mb-4 text-gray-500'>Posted on August 24, 2023</p>
        <p className='text-[18px] font-semibold text-gray-600'>{content}</p>
      </div>
      <div className='h-screen w-full md:w-[40%] flex justify-center items-start flex-col p-10 bg-gray-100'>
        <h1 className='text-xl font-semibold text-gray-800 mb-8'>Author</h1>
        <div className='flex items-center justify-center gap-5'>
          <img className='h-[50px] w-[50px] rounded-full bg-gray-700' src="" alt="" />
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-black'>Jokester</h1>
            <p className='text-[16px] text-gray-600 font-semibold'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus molestiae quae eaque odio rem, ut quis vel incidunt mollitia quos!</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Blog