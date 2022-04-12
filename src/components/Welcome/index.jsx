import React, { useEffect, useState } from "react";
import Banner from "./../Banner";
import Article from "./../Article";
import PostContainer from "../../blog/container/PostContainer";
import ResizeListner from "../../utility/ResizeListner";
import history from "../../utility/history";
import "./index.css";
const Welcome = () => {
  const { width, height } = ResizeListner();
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
    <div>
      <Banner
        backgroundImage="url(assets/img/bg-gift.jpg)"
        title="Hi Guys,"
        subtitle="       Gopal Prasath here, if you have some time to spare on reading few
        stories, which hopefully are interesting, scroll through."
      />
      <main className="main-content bg-gray">
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            width: "100%"
          }}
        >
          <div className="flex flex-row flex-wrap" style={{}}>
            <div
              style={{
                display: "flex",
                padding: "20px 50px 20px 50px",
                flexDirection: "row",
                boxSizing: "border-box",
                width: "100%",
                overflow: "scroll",
                maxWidth: width
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
                        onClick={() => {
                          history.push(`/article/${data.title}`);
                        }}
                        data={data}
                      />
                    </>
                  ))
                  .reverse()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
