import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full h-screen bg-zinc-700'>
        <h1 className='text-2xl text-orange-700'>Hello World!</h1>
      </div>
    </>
  )
}

export default App
