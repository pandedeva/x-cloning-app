import React from "react";
import Comment from "./Comment";

const Comments = ({ comments }: any) => {
  const sortedComments = comments.sort(
    (a: any, b: any) => new Date(b.date) - new Date(a.createdAt)
  );

  return (
    <div>
      {sortedComments.map((comment: any) => (
        <Comment key={comment._id} id={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
