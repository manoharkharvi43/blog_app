import React, { useEffect, useState } from "react";
import PostContainer from "../../blog/container/PostContainer";
import Banner from "../Banner";
import CustomFullScreenLoader from "../../utility/FullScreenLoader";
import ResizeListner from "../../utility/ResizeListner";
function MyArticles() {
  const { width, height } = ResizeListner();
  const [allPosts, setAllPosts] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
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

  const deletePost = id => {
    setLoadingDelete(true);
    fetch(`https://gopal-blog-backend.herokuapp.com/api/blog/delete/${id}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        getAllPOsts();
      })
      .catch(err => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoadingDelete(false);
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
            justifyContent: width > 700 ? "flex-start" : "center",
            alignItems: "center",
            flexWrap: "wrap",
            alignSelf: "center"
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
                    onClickDelete={data => {
                      deletePost(data);
                    }}
                    isEditRequired={true}
                    id={data._id}
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
