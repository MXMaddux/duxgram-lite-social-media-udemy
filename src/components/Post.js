import React from "react";

const Post = ({ post }) => {
  return (
    <div className="w-full text-center flex flex-col justify-center card-sm">
      <img src={post.imageURL} alt="" className="h-60 w-60" />
      <span className="text-gray-500 text-left my-2 p-1">
        {post.description}
      </span>
    </div>
  );
};

export default Post;
