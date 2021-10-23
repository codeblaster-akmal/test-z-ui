import React, { useState } from "react";
import RichTextEditor from "react-rte";
import styled from "styled-components";

const RichTextBoxEditorWrapper = styled.div`
  .toolbarStyle {
    button {
      background: transparent;
      border: none;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 50% !important;
      padding: 6px 7px 0px 7px;
      height: 100%;
      margin: 0 5px 0 5px;

      &:hover {
        color: #39607f;
        background-color: rgba(242, 59, 83, 0.1);
      }
    }
  }

  .IconButton__isActive___2Ey8p {
    background-color: rgba(242, 59, 83, 0.1) !important;
  }
`;

export function RichTextBoxEditor({ value, setValue, id }) {
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      "LINK_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      "HISTORY_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
      { label: "Strikethrough", style: "STRIKETHROUGH" },
      { label: "Monospace", style: "CODE" },
      { label: "Align Left", style: "ALIGN_LEFT" },
      { label: "Align Center", style: "ALIGN_CENTER" },
      { label: "Align Right", style: "ALIGN_RIGHT" },
      { label: "Align Justify", style: "ALIGN_JUSTIFY" },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: "Normal", style: "unstyled" },
      { label: "Heading Large", style: "header-one" },
      { label: "Heading Medium", style: "header-two" },
      { label: "Heading Small", style: "header-three" },
      { label: "Code Block", style: "code-block" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
      { label: "Blockquote", style: "blockquote" },
    ],
  };

  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(value, "html")
  );

  const handleChange = (value) => {
    setEditorValue(value);
    setValue(value.toString("html"));
  };

  return (
    <RichTextBoxEditorWrapper>
      <RichTextEditor
        className="richTextEditor"
        toolbarClassName="toolbarStyle"
        editorClassName="editorStyle"
        value={editorValue}
        onChange={(e) => {
          handleChange(e);
        }}
        required
        id={id}
        name="bodyText"
        type="string"
        multiline
        toolbarConfig={toolbarConfig}
      />
    </RichTextBoxEditorWrapper>
  );
}
