import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ResizeListner from "../../utility/ResizeListner";
import DOMPurify from "dompurify";
import { convertDate } from "../../utility/dateconvertor";

const SingleArticle = ({ blogData }) => {
  const { width, height } = ResizeListner();
  const [data, setData] = useState({});

  const location = useLocation();

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };
  useEffect(() => {
    setData(location.state);
  }, [location]);
  return (
    <div>
      {/* Header */}
      <header
        className="header header-inverse h-fullscreen pb-80"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-cup.jpg)`
        }}
        data-overlay={8}
      >
        <div className="container text-center">
          <div className="row h-full">
            <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
              <h1 className="display-4 hidden-sm-down">{data.title}</h1>
              <h1 className="hidden-md-up">{data.title}</h1>
              <br />
              <br />
              <p>
                <span className="opacity-70 mr-8">By</span>
                <a className="text-white" href="#">
                  Gopal Prasath
                </a>
              </p>
              <p>
                <img
                  className="rounded-circle w-40"
                  src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`}
                  alt="..."
                />
              </p>
              <p className="opacity-70">{data.date}</p>
            </div>
            <div className="col-12 align-self-end text-center">
              <a
                className="scroll-down-1 scroll-down-inverse"
                href="#"
                data-scrollto="section-content"
              >
                <span />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div
        style={{
          width: "100%"
        }}
      >
        <div
          className="preview"
          style={{
            width,
            wordBreak: "break-all",
            padding: "0px 15px 0px 15px"
          }}
        >
          <div dangerouslySetInnerHTML={createMarkup(data.postBody)} />
        </div>
      </div>
      <main className="main-content">
        {/* <div className="section bt-1 bg-grey">
          <div className="container">
            <div className="row text-center">
              <div className="text-center p-5">COMMENTS HERE.</div>
            </div>
          </div>
        </div> */}
      </main>
      {/* END Main container */}
    </div>
  );
};

export default SingleArticle;
