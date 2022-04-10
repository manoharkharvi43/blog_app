import React, { useState } from "react";
import Banner from "./../Banner";
import { storage } from "../../Firebaseconfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

const CreateArticle = () => {
  const [file, setFile] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();
  const storageRef = ref(storage);

  const postBlog = imageUrl => {
    console.log("api calll started");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("imageUrl", imageUrl);
    formData.append("content", content);

    fetch("http://192.168.0.109:8080/api/blog/createpost", {
      method: "POST",
      body: formData
    })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const createPost = async () => {
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
      error => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log("File available at", downloadURL);
          postBlog(downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );

    console.log(title, content, imageUrl, "      title, content, imageUrl");
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
                <div className="row">
                  <div className="form-group col-md-12 my-5">
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
                  {/* <div className="form-group col-12 col-md-6">
                      <select name id className="form-control form-control-lg">
                        <option value>Select category</option>
                        <option value>Vuejs</option>
                        <option value>Reactjs</option>
                      </select>
                    </div> */}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={4}
                    placeholder="Content"
                    name="message"
                    defaultValue={""}
                    value={content}
                    onChange={val => {
                      setContent(val.target.value);
                    }}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-lg btn-primary"
                    type={"submit"}
                    onClick={() => {
                      createPost();
                    }}
                  >
                    {fileLoading ? "loading......" : "Create Article"}
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
