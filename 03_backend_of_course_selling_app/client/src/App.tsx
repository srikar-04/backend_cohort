import { Button } from "./components/ui/button"


function App() {

  return (
    <>
      <body className='w-full h-screen bg-zinc-900'>
        <h1 className='text-2xl text-white'>Hello World!</h1>
        <Button variant={"destructive"} className="mt-4">Button</Button>
      </body>
    </>
  )
}

export default App
