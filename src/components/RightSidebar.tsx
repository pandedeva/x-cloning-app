"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import News from "./News";

const RightSidebar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    router.push(`/search/${input}`);
    setInput("");

    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  return (
    <>
      <div className="sticky top-0 bg-white py-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
          />
        </form>
        <News />
      </div>
    </>
  );
};

export default RightSidebar;
