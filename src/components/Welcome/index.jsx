import React, { useEffect, useState } from "react";
import Banner from "./../Banner";
import Article from "./../Article";
import PostContainer from "../../blog/container/PostContainer";
import ResizeListner from "../../utility/ResizeListner";
import "./index.css";
import { useNavigate } from "react-router";
import { MdFormatQuote } from "react-icons/md";
import BG from "../../assets/pratheek-2.jpg";
const Welcome = () => {
  const { width, height } = ResizeListner();
  const [allPosts, setAllPosts] = useState([]);

  const navigate = useNavigate();
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
    <div
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Banner
        backgroundImage={`url(${BG})`}
        title="Hi Guys,"
        subtitle="Gopal Prasath here, if you have some time to spare on reading few
        stories, which hopefully are interesting, scroll through."
      />

      <div
        style={{
          minHeight: 200,
          marginTop: 30,
          display: "flex",
          alignSelf: "center",
          marginRight: 30,
          marginLeft: 30,
          width: "95%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rbga(0,0,0,0.65)",
          boxShadow:
            "rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px",
          boxSizing: "border-box"
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "400",
            width: width > 600 ? "70%" : "100%",
            opacity: 1,
            padding: "0px 10px 0px 10px"
          }}
        >
          <span
            style={{
              fontSize: 25,
              fontWeight: "550"
            }}
          >
            {" "}
            So, “howtoLive....huh?”
          </span>
          <br />{" "}
          <MdFormatQuote
            size={40}
            style={{
              color: "black",
              transform: "rotate(180deg)"
            }}
          />{" "}
          Yep, but this is not the question to which I’m gonna give answers to
          here, rather, this is the question I’ve been pondering about for a
          while now. Just pondering about it yielded in boredom and lowered self
          confidence as no answer was to be found. I decided to take action and
          it led me here, quite an intriguing question isn’t it? That is why
          this is also not the question for which I need an answer to. This is a
          question I want to keep asking myself and never find an answer to. I’m
          going to just keep looking for the answer, and as I keep looking I’ll
          write stories about the journey it takes me through{" "}
          {/* <MdFormatQuote
            size={40}
            style={{
              color: "black"
            }}
          />{" "} */}
        </p>
      </div>
      {/* <main className="main-content bg-gray"> */}
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
                        navigate(`/article/${data.title}`, {
                          state: data
                        });
                      }}
                      data={data}
                    />
                  </>
                ))
                .reverse()}
          </div>
        </div>
      </div>
      {/* </main> */}
    </div>
  );
};

export default Welcome;
