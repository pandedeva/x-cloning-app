import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { HiHome } from "react-icons/hi";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col p-3 justify-between h-screen items-center">
      <div className="flex flex-col gap-4 p-3">
        <Link href="/">
          <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200 " />
        </Link>
        <Link
          href="/"
          className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
        >
          <HiHome className="w-7 h-7" />
          <span className="font-bold hidden xl:inline">Home</span>
        </Link>
        <div className="bg-blue-400 text-white rounded-full  hover:brightness-95 transition-all duration-200 lg:px-14 lg:py-1 px-10 py-1 shadow-md hidden font-semibold sm:flex items-center justify-center">
          <SignedIn>
            <SignOutButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
