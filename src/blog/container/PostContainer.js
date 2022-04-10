import React from "react";
import { convertDate } from "../../utility/dateconvertor";
import ResizeListner from "../../utility/ResizeListner";
function PostContainer({ imageSrc, title, content, date, onClick }) {
  const { width, height } = ResizeListner();
  return (
    <div
      style={{
        margin: 20,
        padding: "10px 20px 10px 20px",
        minWidth: 250,
        width: width * 0.4,
        borderRadius: 7,
        boxShadow:
          "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
        cursor: "pointer",
        height: "100%"
      }}
      onClick={onClick}
    >
      <img
        src={imageSrc}
        style={{
          objectFit: "cover",
          width: width * 0.35,
          height: width * 0.35,
          minWidth: 200,
          minHeight: 200
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: width > 800 ? "center" : "flex-start",
          width: "100%",
          flexDirection: width > 800 ? "row" : "column"
        }}
      >
        <p
          style={{
            fontSize: width > 800 ? 16 : 10,
            fontWeight: "500",
            padding: 0,
            margin: 0
          }}
        >
          {title
            ? title.length > 20
              ? title.slice(0, 20) + "....."
              : title
            : ""}
        </p>
        <p
          style={{
            fontSize: 10,
            fontWeight: "500",
            padding: 0,
            margin: 0,
            color: "grey"
          }}
        >
          {/* //convertDate */}
          {convertDate(date)}
        </p>
      </div>
      <p
        style={{
          fontSize: width > 500 ? 16 : 12,
          fontWeight: "normal",
          padding: 0,
          marginTop: 5,
          color: "grey"
        }}
      >
        {content}
      </p>
    </div>
  );
}

export default PostContainer;
