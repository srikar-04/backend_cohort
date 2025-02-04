import React from 'react'

function Hero() {
  return (
    <div className='text-white  h-full w-full flex items-center justify-center'>
      <div className=' flex flex-col items-center justify-center'>

        <div className='font-roboto font-[900] text-7xl'>
          <h1>Not Just Another Todo App</h1>
        </div>

        <div className='mt-6 max-w-[850px] text-center  text-[25px] text-gray-600 font-[400]'>
        Elevate your productivity with our intuitive and powerful todo application. Stay organized, focused, and accomplish more.
        </div>

        <div className='mt-6'>
          <button className="px-5 py-4 rounded-full relative bg-slate-900 text-white text-md hover:shadow-2xl hover:shadow-white/[0.1]font-[900] transition duration-200 border border-slate-800"> <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" /> <span className="relative z-20 font-[700]"> Get Started </span> </button>
        </div>
      </div>
    </div>
  )
}

export default Hero