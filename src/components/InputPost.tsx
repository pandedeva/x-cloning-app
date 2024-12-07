"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { HiOutlinePhotograph } from "react-icons/hi";
import Image from "next/image";

const InputPost = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [text, setText] = useState("");
  const [postLoading, setPostLoading] = useState<boolean | null>(null);
  const imagePickRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      // membuat url gambar agar bisa ditampilkan di browser
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  // ! function untuk upload gambar ke storage tapi belum bisa
  const uploadImageToStorage = async () => {
    setImageFileUploading(true);
  };

  const handleSubmit = async () => {
    setPostLoading(true);

    const response = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mengirim body ke json lalu diambil di route post create
      body: JSON.stringify({
        userMongoId: user?.publicMetadata.userMongoId,
        name: user?.fullName,
        username: user?.username,
        text,
        profileImg: user?.imageUrl,
        image: imageFileUrl,
      }),
    });

    if (response.ok) {
      console.log("Post created successfully");
    } else {
      console.error("Error creating post:", response.status);
    }

    setPostLoading(false);
    setText("");
    setSelectedFile(null);
    setImageFileUrl(null);
    location.reload();
  };

  if (!isSignedIn || !isLoaded) return null;

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <Image
        width={50}
        height={50}
        src={user?.imageUrl}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 "
          placeholder="Whats happening"
          rows={3}
          //   style={{ resize: "none" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {selectedFile && imageFileUrl !== null && (
          <Image
            alt="post image"
            src={imageFileUrl}
            width={400}
            height={400}
            className={`w-full max-h-[250px] object-cover cursor-pointer ${
              imageFileUploading ? "animate-pulse" : ""
            }`}
            onClick={() => {
              setSelectedFile(null);
              setImageFileUrl(null);
            }}
          />
        )}
        <div className="flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
            onClick={() => imagePickRef.current?.click()}
          />
          <input
            type="file"
            ref={imagePickRef}
            accept="image/*"
            hidden
            onChange={handleImageUpload}
            // !masih belum bisa karna upload ke storage belum bisa
            disabled
          />
          <button
            disabled={text.trim() === "" || postLoading || imageFileUploading}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPost;
