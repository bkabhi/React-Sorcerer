import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";

function MyEditor() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem("editorContent", content);
  }, [editorState]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBeforeInput = (char, editorStateBefore) => {
    const selection = editorStateBefore.getSelection();
    const currentContent = editorStateBefore.getCurrentContent();
    const block = currentContent.getBlockForKey(selection.getStartKey());
    const blockText = block.getText();
    const lineStartIndex = selection.getStartOffset() === 0 ? 0 : blockText.lastIndexOf("\n", selection.getStartOffset() - 1) + 1;
    const lineEndIndex = blockText.length;
    const lineText = blockText.slice(lineStartIndex, lineEndIndex);

    if (char === ' ' && lineText === '#') {
      setEditorState(RichUtils.toggleBlockType(editorStateBefore, "header-one"));
      return "handled";
    } else if (char === ' ' && lineText === '***') {
      setEditorState(RichUtils.toggleInlineStyle(editorStateBefore, "UNDERLINE"));
      return "handled";
    } else if (char === ' ' && lineText === '**') {
      console.log(lineText, "lineText 53");
      const newEditorState = RichUtils.toggleInlineStyle(editorStateBefore, 'RED_LINE');
      setEditorState(newEditorState);
      return 'handled';
    } else if (char === ' ' && lineText === '*') {
      setEditorState(RichUtils.toggleInlineStyle(editorStateBefore, "BOLD"));
      return "handled";
    }
    return "not-handled";
  };

  const colorStyleMap = {
    RED_LINE: {
      color: 'red',
    },
  };

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        customStyleMap={colorStyleMap}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default MyEditor;
