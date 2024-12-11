"use client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";

interface Comment {
  username: string;
  profileImg: string;
  name: string;
  createdAt: string;
  comment: string;
}

export default function Comment({ comment }: { comment: Comment; id: any }) {
  return (
    <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10">
      <Link href={`/users/${comment?.username}`}>
        <Image
          width={100}
          height={100}
          src={comment?.profileImg}
          alt="user-img"
          className="h-9 w-9 rounded-full mr-4"
        />
      </Link>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-xs truncate max-w-32">
              {comment?.name}
            </h4>
            <span className="text-xs truncate max-w-32">
              @{comment?.username}
            </span>
            <span className="text-xl text-gray-500">·</span>
            <span className="text-xs text-gray-500 flex-1 truncate max-w-32">
              {moment(comment?.createdAt).fromNow()}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <p className="text-gray-800 text-xs my-3">{comment?.comment}</p>
      </div>
    </div>
  );
}
