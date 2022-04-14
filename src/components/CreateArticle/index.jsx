import DOMPurify from "dompurify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import TextEditor from "../Editor";
import Banner from "./../Banner";
import { storage } from "../../Firebaseconfig";
import { convertFromRaw } from "draft-js";
import { convertToRaw } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
const CreateArticle = () => {
  const [file, setFile] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage(storage);
  const storageRef = ref(storage);
  const [htmlData, setHtmlData] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (file !== "" && title !== "" && content !== "") {
      setDisabled(false);
    } else setDisabled(true);
  }, [file, title, content]);

  const postBlog = imageUrl => {
    console.log("api calll started");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imageUrl", imageUrl);
    formData.append("content", content);
    formData.append(
      "postBody",
      draftjsToHtml(convertToRaw(htmlData.getCurrentContent()))
    );

    fetch("https://gopal-blog-backend.herokuapp.com/api/blog/createpost", {
      method: "POST",
      body: formData
    })
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          addToast("new post created successfully", { appearance: "success" });
        } else {
          addToast(data.message, { appearance: "error" });
        }
      })
      .catch(err => {
        console.log(err);
        addToast("something went wrong try again later!", {
          appearance: "error"
        });
      })
      .finally(() => {
        setFileLoading(false);
        setFile("");
        setContent("");
        setTitle("");
      });
  };
  const createPost = async () => {
    setFileLoading(true);
    const imagesRef = ref(storageRef, `${file.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      error => {
        setFileLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          postBlog(downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );

    console.log(title, content, imageUrl, "      title, content, imageUrl");
  };

  useEffect(() => {
    {
      showPreview &&
        console.log(
          convertToRaw(htmlData.getCurrentContent()),
          "convertToRaw(htmlData.getCurrentContent())"
        );
    }
  }, [showPreview]);

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };
  return (
    <div>
      <Banner
        backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
        title="Write an Article"
      />
      {/* END Header */}
      {/* Main container */}
      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12">
                {/* {showPreview && (
                  <div
                    disabled
                    dangerouslySetInnerHTML={createMarkup(
                      draftjsToHtml(convertToRaw(htmlData.getCurrentContent()))
                    )}
                  />
                )} */}
                <div className="row">
                  <div className="form-group col-md-12 my-5">
                    <p
                      style={{
                        color: "grey",
                        fontSize: 15,
                        margin: 0,
                        padding: 0
                      }}
                    >
                      Thumbnail Image
                    </p>
                    <input
                      type="file"
                      className="form-control"
                      onChange={file => {
                        console.log(file.target.files[0], "file");
                        setFile(file.target.files[0]);
                      }}
                      // value={file.fileName}
                      multiple={false}
                    />
                  </div>
                  <div className="form-group col-12 col-md-12">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="name"
                      placeholder="Title"
                      value={title}
                      onChange={val => {
                        setTitle(val.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={4}
                    placeholder="Description"
                    name="message"
                    defaultValue={""}
                    value={content}
                    onChange={val => {
                      setContent(val.target.value);
                    }}
                    maxLength={70}
                  />
                </div>
                <TextEditor
                  passHtml={data => {
                    setHtmlData(data);
                    console.log(data);
                  }}
                />

                <div className="text-center">
                  <button
                    className="btn btn-lg btn-primary mt-10"
                    type={"submit"}
                    onClick={() => {
                      createPost();
                    }}
                    disabled={disabled || fileLoading ? true : false}
                  >
                    {fileLoading ? "Loading...." : "Create Article"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* END Main container */}
    </div>
  );
};
export default CreateArticle;
