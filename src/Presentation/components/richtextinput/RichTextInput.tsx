import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useState } from "react";

export const RichTextInput = () => {
  const [descriptionValue, setDescriptionValue] = useState<string>("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <>
      <ReactQuill
        className="custom-description"
        theme="snow"
        value={descriptionValue}
        onChange={setDescriptionValue}
        modules={modules}
        formats={formats}
      />
    </>
  );
};
