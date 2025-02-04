import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";
import Header from "./components/custom-components/Header";
import { Spotlight } from "./components/ui/spotlight";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        {/* <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        /> */}
        <Header />
        {/* <div className="border h-full w-full flex items-center justify-center text-white">
            test
        </div> */}
      </div>
    </>
  );
}

/*
  <PlaceholdersAndVanishInput
          placeholders={[
            "write your tasks",
            "go to gym",
            "create project on learning management system",
            "increase your productivity",
          ]}
          // onSubmit = {(e) => {console.log('this is onsubmit event')}}
          onChange={(e) => {
            console.log("this is onchange event");
          }}
        />
*/

export default App;
