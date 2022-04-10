import React from "react";

function PostContainer({ imageSrc, title, content }) {
  return (
    <div
      style={{
        border: "1px solid grey",
        margin: 20,
        padding: "10px 20px 10px 20px",
        minWidth: 250,
        maxWidth: 600
      }}
    >
      <img src={imageSrc} style={{}} />
      <p>{title}</p>
      <p>{content}</p>
    </div>
  );
}

export default PostContainer;
