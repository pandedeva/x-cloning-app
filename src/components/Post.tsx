import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Icons from "./Icons";

interface PostProps {
  key: any;
  post: any;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="flex p-3 border-b border-gray-200 w-full hover:bg-gray-50">
      <Link href={`/users/${post?.username}`}>
        <Image
          width={100}
          height={100}
          src={post?.profileImg}
          alt="user-img"
          className="h-11 w-11 rounded-full mr-4"
        />
      </Link>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-xs truncate max-w-32">
              {post?.name}
            </h4>
            <span className="text-xs truncate max-w-32">@{post?.username}</span>
            {/* add dot space here */}
            <span className="text-xl text-gray-500">·</span>
            <span className="text-xs text-gray-500 flex-1 truncate max-w-32">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <Link href={`/posts/${post?._id}`}>
          <p className="text-gray-800 text-sm w-full">{post?.text}</p>
        </Link>

        {post?.image ? (
          <Link href={`/posts/${post?._id}`}>
            <Image
              alt="post img"
              width={100}
              height={100}
              src={post?.image}
              className="rounded-2xl mr-2"
            />
          </Link>
        ) : null}

        <Icons post={post} />
      </div>
    </div>
  );
};

export default Post;
