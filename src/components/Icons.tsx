"use client";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import CommentModal from "./CommentModal";
// import { modalAtom } from "@/atom/modalAtom";
// import { useRecoilState } from "recoil";

interface IconsProps {
  post: any;
}

const Icons: React.FC<IconsProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  // const [open, setOpen] = useRecoilState(modalAtom);
  // const [postId, setPostId]= userRecoilState(modalAtom)
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const likePost = () => {
    if (!user) return router.push("/sign-in");

    const like = fetch("/api/post/like", {
      // method PUT karna ada data yang mau diupdate
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: post._id }),
    });

    // * DELETE ASYNC AWAIT KARNA AGAR CEPAT LIKENYA MUNCUL
    if (like && isLiked)
      // jika sudah ada like maka hapus
      setLikes(
        likes.filter((like: any) => like !== user.publicMetadata.userMongoId)
      );

    // jika isLiked false maka tambahkan like
    if (like && !isLiked) setLikes([...likes, user.publicMetadata.userMongoId]);
  };

  useEffect(() => {
    if (user && likes?.includes(user.publicMetadata.userMongoId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes, user]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (user && user?.publicMetadata.userMongoId === post.user) {
        const res = await fetch(`/api/post/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: post._id }),
        });

        if (res.status === 200) location.reload();
        else alert("Error deleting post");
      }
    }
  };

  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat
        onClick={() => {
          if (!user) return router.push("/sign-in");
          setOpen(!open);
          // setPostId(post._id);
        }}
        className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"
      />

      <div className="flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100"
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        )}

        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && "text-red-600"}`}>
            {likes.length}
          </span>
        )}
      </div>

      {user && user?.publicMetadata.userMongoId === post.user && (
        <HiOutlineTrash
          onClick={deletePost}
          className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
        />
      )}
    </div>
  );
};

export default Icons;
