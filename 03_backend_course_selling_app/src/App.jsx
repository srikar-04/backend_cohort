import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full h-screen bg-zinc-700'>
        <div className='text-2xl text-red-500'>Hello World!</div>
      </div>
    </>
  )
}

export default App
