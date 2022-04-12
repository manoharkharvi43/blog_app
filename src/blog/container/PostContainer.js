import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { convertDate } from "../../utility/dateconvertor";
import ResizeListner from "../../utility/ResizeListner";
import "./index.css";
function PostContainer({
  imageSrc = "",
  title,
  content,
  date,
  onClick,
  isEditRequired = false,
  onClickDelete,
  id = "",
  data
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const { width, height } = ResizeListner();
  const innerRef = useRef(null);

  const handleClickOutside = event => {
    if (innerRef.current && !innerRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
        cursor: "pointer",
        // height: height * 0.4
        position: "relative"
      }}
      onClick={() => onClick(data)}
    >
      {isEditRequired && (
        <div>
          <BsThreeDotsVertical
            size={20}
            onClick={() => {
              setOpenMenu(true);
            }}
          />
        </div>
      )}
      {imageSrc !== "" && (
        <img
          src={imageSrc}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "55%"
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
          marginTop: 3,
          color: "grey",
          lineHeight: 1.1,
          maxLines: 3
        }}
      >
        {content
          ? content.length > 80
            ? content.slice(0, 80) + "....."
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

      {openMenu && (
        <div
          style={{
            position: "absolute",
            top: 30,
            backgroundColor: "red",
            backgroundColor: "white",
            boxShadow:
              "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
            minHeight: 100,
            minWidth: 150,
            borderRadius: 4
          }}
          ref={innerRef}
        >
          <p
            style={{
              padding: 0,
              margin: 0,
              textAlign: "center"
            }}
            className="pTag"
            onClick={() => onClickDelete(id)}
          >
            Delete post
          </p>
          {/* <div
            style={{
              height: 0,
              backgroundColor: "grey",
              width: "100%"
            }}
          ></div> */}
        </div>
      )}
    </div>
  );
}

export default PostContainer;
