import React, { useEffect, useState } from "react";
import PostContainer from "../../blog/container/PostContainer";
import Banner from "../Banner";

function MyArticles() {
  const { width, height } = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const getAllPOsts = () => {
    fetch("https://gopal-blog-backend.herokuapp.com/api/blog/getposts", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "data");
        setAllPosts(data);
      })
      .catch(err => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    getAllPOsts();
  }, []);
  return (
    <>
      <div
        style={{
          width,
          height
        }}
      >
        <Banner
          backgroundImage="url(assets/img/bg-gift.jpg)"
          title="My Posts"
          subtitle="Update,Delete and Edit your latest post"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {allPosts &&
            allPosts
              .map(data => (
                <>
                  <PostContainer
                    imageSrc={data.imageUrl}
                    title={data.title}
                    content={data.content}
                    date={data.date}
                    onClick={() => {}}
                  />
                </>
              ))
              .reverse()}
        </div>
      </div>
    </>
  );
}

export default MyArticles;
