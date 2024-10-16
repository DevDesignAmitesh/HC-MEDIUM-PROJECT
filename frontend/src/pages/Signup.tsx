import React, { useState } from 'react'
import Heading from '../component/Heading';
import SubHeading from '../component/SubHeading';
import InputBox from '../component/InputBox';
import Button from '../component/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const onClickHandler = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name,
        email: username,
        password,
      })
      if(res.data.token){
        localStorage.setItem("token", res.data.token)
      navigate("/getBlogs", {state: {username}})
      } else{
        alert("something went wrong")
      }
    } catch (error) {
      console.log(error)
      return;
    }
  }

  return (
    <main className='h-screen w-full flex justify-center items-center'>
      <div className='h-screen w-full md:w-1/2 bg-gray-200/70 gap-2 flex justify-center items-center flex-col'>
      <Heading label='Create Your Account' />
      <SubHeading onClick={() => navigate("/signin")} label2='Signin!' label='Already have an account?' />
      <InputBox lable='Name' type='text' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
      <InputBox lable='Email' type='text' placeholder='Enter your email' onChange={(e) => setUsername(e.target.value)} />
      <InputBox lable='Password' type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
      <Button label='Signup' onClick={onClickHandler} />
      </div>
      <div className='h-screen w-1/2 hidden md:flex justify-center flex-col items-start gap-2 p-10 bg-gray-200'>
      <h1 className='text-2xl font-semibold text-black'>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolor explicabo praesentium ipsam recusandae optio nesciunt est laborum commodi, perspiciatis, iure odio omnis voluptate? Facere quasi in officiis ducimus dolorum."</h1>
      <p className='text-xl cursor-pointer text-gray-700 font-[600]'>Julles Winfield</p>
      <p className='text-[15px] cursor-pointer text-gray-500 font-[600]'>CEO Acme Inc.</p>
      </div>
    </main>
  )
}

export default Signup;
