
import Button from './component/Button';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()

  return <main className='h-screen w-full bg-gray-300 p-10 flex flex-col gap-2 text-center justify-center items-center'>
    <h1 className='text-gray-700 text-[5vmin] font-semibold'>HARKIRAT COHORT 0-1 PROJECT</h1>
    <h1 className='text-gray-700 text-[5vmin] font-semibold'>Blog App Clone</h1>
    <h1 className='text-gray-700 text-[5vmin] font-semibold'>Using</h1>
    <h1 className='text-gray-700 leading-[35px] md:leading-[50px] text-[5vmin] font-semibold w-[100%]'>React, Typescript, Jwt, Npmjs, Postgress, Prisma, Cloudflare, Zod, Hono, Monorepo Concept</h1>
    <Button label='Signup' onClick={() => navigate("/signup")} />
    <Button label='Signin' onClick={() => navigate("/signin")} />
  </main>
}

export default App;
