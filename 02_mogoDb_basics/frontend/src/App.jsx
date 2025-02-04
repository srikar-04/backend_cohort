import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-zinc-700 h-screen w-full text-white p-2'>
        <div className='text-3xl'>First full stack project</div>
      </div>
    </>
  )
}

export default App
