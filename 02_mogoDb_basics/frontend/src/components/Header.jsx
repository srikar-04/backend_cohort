import React from "react";
import { FiGithub } from "react-icons/fi";

function Header() {
  return (
    <div className="border flex items-center justify-between px-7 py-5 text-white">
      {/* heading */}
      <div className="text-3xl font-[700] font-roboto">
        <h1>Not a normal Todo</h1>
      </div>

      {/* buttons and other stuff */}
      <div className="font-roboto font-[700] flex gap-5 items-center">
        <button
          type="button"
          class="py-[6px] px-[10px] text-md  rounded-lg border border-transparent text-white hover:bg-zinc-700/40 hover:font-[900] hover:text-white disabled:opacity-50 hover:duration-150 disabled:pointer-events-none dark:text-white dark:hover:bg-zinc-700/40 dark:hover:text-white dark:hover:font-[900] font-roboto font-[700]"
        >
          <a href="https://github.com/srikar-04" target="_blank"><FiGithub /></a>
        </button>

        <button
          type="button"
          class="py-[6px] px-[10px] text-md  rounded-lg border border-transparent text-white hover:bg-zinc-700/40 hover:font-[900] hover:text-white disabled:opacity-50 hover:duration-150 disabled:pointer-events-none dark:text-white dark:hover:bg-zinc-700/40 dark:hover:text-white dark:hover:font-[900] font-roboto font-[700]"
        >
          signup
        </button>

        <button
          type="button"
          class="py-[6px] px-[10px] text-md  rounded-lg border border-transparent text-white hover:bg-zinc-700/40 hover:font-[900] hover:text-white disabled:opacity-50 hover:duration-150 disabled:pointer-events-none dark:text-white dark:hover:bg-zinc-700/40 dark:hover:text-white dark:hover:font-[900] font-roboto font-[700]"
        >
          signin
        </button>
      </div>
    </div>
  );
}

export default Header;
