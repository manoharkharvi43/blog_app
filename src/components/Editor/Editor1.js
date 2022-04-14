import React, { useState, useRef, useEffect } from "react";
import { Editor, EditorState } from "draft-js";
import DOMPurify from "dompurify";

function Editor1({ passHtml }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = React.useRef(null);

  const styles = {
    editor: {
      border: "1px solid gray",
      minHeight: "6em"
    }
  };

  const focusEditor = () => {
    editor.current.focus();
  };
  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html)
    };
  };
  useEffect(() => {
    console.log(editorState, "editorState");
  }, [editorState]);
  return (
    <>
      <div style={styles.editor} onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
        />
        <div dangerouslySetInnerHTML={createMarkup(editorState)}></div>
      </div>
    </>
  );
}

export default Editor1;
