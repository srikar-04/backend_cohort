import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-gray-800 h-screen flex items-center justify-center'>
        <h1 className='font-semibold text-white'>Hello World</h1>
      </div>
    </>
  )
}

export default App
