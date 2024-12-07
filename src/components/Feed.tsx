import React from "react";
import Post from "./Post";

interface FeedProps {
  data: any;
}

const Feed: React.FC<FeedProps> = ({ data }) => {
  return (
    <div>
      {data.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
