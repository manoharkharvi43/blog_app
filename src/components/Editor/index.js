import Compressor from "compressorjs";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ResizeListner from "../../utility/ResizeListner";
import "./index.css";

function TextEditor({ passHtml }) {
  const [fileLoading, setFileLoading] = useState(false);
  //   const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const storage = getStorage(storage);
  const storageRef = ref(storage);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [compressedFile, setCompressedFile] = useState(null);

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = state => {
    setEditorState(state);
    // convertContentToHTML(state);
    passHtml(state);
  };

  const handleCompressedUpload = e => {
    console.log(e, "original");
    const image = e;
    new Compressor(image, {
      quality: 0.8,
      success: compressedResult => {
        setCompressedFile(compressedResult);
        createPost(compressedResult);
      }
    });
  };
  const createPost = async file => {
    console.log(file, "file got");
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
          setImageUrl(downloadURL);
        });
      }
    );
    console.log(title, content, imageUrl, "      title, content, imageUrl");
  };

  function uploadImageCallBack(file) {
    handleCompressedUpload(file);
  }

  return (
    <>
      <div
        style={{
          minWidth: 300,
          height: 400,
          minWidth: 300,
          border: "1px solid lightgrey",
          width: "100%",
          overflow: "scroll"
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
          //   uploadCallback={data => {
          //     console.log(data);
          //   }}
          //   wrapperClassName="wrapper-class"
          //   editorClassName="editor-class"
          //   toolbarClassName="toolbar-class"
        />
      </div>
    </>
  );
}

export default TextEditor;
