import { useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import { nanoid } from 'nano-id'

  const socket = io('http://localhost:3000')

function App() {

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('control in the handle submit function')
    setMessage('')
  }

  return (
    <>
      <div className='bg-gray-800 h-screen flex items-center justify-center flex-col gap-7'>
        <h1 className='font-semibold text-white text-xl my-4'>Chat app</h1>

        <form onSubmit={(e) => handleSubmit(e)} action="sumbit" className='flex items-center justify-center gap-3'>
          <input 
            type="text" 
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className='bg-white border border-white rounded-md p-1'
            placeholder='send text...'
          />
          <button className='px-2 py-1 rounded-md text-white font-semibold border border-orange-500' type="submit">submit</button>
        </form>
      </div>
    </>
  )
}

export default App
