import React, { useEffect, useState } from "react";
import Banner from "./../Banner";
import Article from "./../Article";
import PostContainer from "../../blog/container/PostContainer";

const Welcome = () => {
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

  useEffect(() => {
    console.log(allPosts, "allPosts");
  }, [allPosts]);

  return (
    <div>
      <Banner
        backgroundImage="url(assets/img/bg-gift.jpg)"
        title="Latest Blog Posts"
        subtitle="Read and get updated on the latest posts"
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
          <div
            className="flex flex-row flex-wrap"
            style={
              {
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // flexDirection: "column"
              }
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                padding: "20px 50px 20px 50px",
                flexDirection: "column"
              }}
            >
              {/* {allPosts?.map((post, index) => (
                <>
                  
                </>
              ))} */}

              {allPosts &&
                allPosts.map(data => (
                  <>
                    <PostContainer
                      imageSrc={data.imageUrl}
                      title={data.title}
                      content={data.content}
                      date={data.date}
                      onClick={() => {}}
                    />
                  </>
                ))}
            </div>

            <nav className="flexbox mt-50 mb-50">
              <p className="btn btn-white ">
                <i className="ti-arrow-left fs-9 mr-4" /> Newer
              </p>
              <p className="btn btn-white" href="#">
                Older
                <i className="ti-arrow-right fs-9 ml-4" />
              </p>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
