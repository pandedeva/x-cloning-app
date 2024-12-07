"use client";
import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

interface IconsProps {
  post: any;
}

import React from "react";

const Icons: React.FC<IconsProps> = ({ post }) => {
  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100" />
      <HiOutlineHeart className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100" />
      <HiOutlineTrash className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100" />
    </div>
  );
};

export default Icons;
