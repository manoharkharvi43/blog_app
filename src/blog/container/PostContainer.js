import React from "react";
import { convertDate } from "../../utility/dateconvertor";
import ResizeListner from "../../utility/ResizeListner";
function PostContainer({ imageSrc = "", title, content, date, onClick }) {
  const { width, height } = ResizeListner();
  return (
    <div
      style={{
        margin: 20,
        padding: "10px 20px 10px 20px",
        minWidth: 300,
        width: width * 0.4,
        maxWidth: 500,
        borderRadius: 7,
        boxShadow:
          "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
        cursor: "pointer"
        // height: height * 0.4
      }}
      onClick={onClick}
    >
      {imageSrc !== "" && (
        <img
          src={imageSrc}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "60%"
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: width > 800 ? "center" : "flex-start",
          width: "100%",
          flexDirection: width > 800 ? "row" : "column",
          marginTop: 5
        }}
      >
        <p
          style={{
            fontSize: width > 800 ? 16 : 14,
            fontWeight: "500",
            padding: 0,
            margin: 0,
            lineHeight: 1
          }}
        >
          {title
            ? title.length > 50
              ? title.slice(0, 50) + "....."
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
          updated on {convertDate(date)}
        </p>
      </div>
      <p
        style={{
          fontSize: width > 500 ? 16 : 14,
          fontWeight: "normal",
          padding: 0,
          marginTop: 5,
          color: "grey",
          lineHeight: 1.2
        }}
      >
        {content
          ? content.length > 150
            ? content.slice(0, 150) + "....."
            : content
          : ""}
      </p>
      <p
        style={{
          padding: 0,
          margin: 0
        }}
      >
        Read more
      </p>
    </div>
  );
}

export default PostContainer;
