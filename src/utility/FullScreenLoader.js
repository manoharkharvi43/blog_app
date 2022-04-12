import React, { useEffect, useState } from "react";
import "./FullScreenLoader.css";
function CustomFullScreenLoader({ isLoading, size }) {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  const updateWindowDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);
  return (
    <>
      <div
        style={{
          height: dimensions.height,
          width: dimensions.width,
          backgroundColor: "rgba(0,0,0,0.3)",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50
        }}
      >
        <div
          className="spinner"
          style={{
            height: 70,
            width: 70,
            borderTopColor: "dodgerblue"
          }}
        />
      </div>
    </>
  );
}
export default CustomFullScreenLoader;
