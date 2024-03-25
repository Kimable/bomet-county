"use client";
import React, { useState } from "react";
import "./FileDropZone.css"; // You can style this component in a CSS file

const FileDropZone = () => {
  const [highlighted, setHighlighted] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setHighlighted(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = () => {
    setHighlighted(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlighted(false);
    const newFiles = [...files];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      newFiles.push(e.dataTransfer.files[i]);
    }
    setFiles(newFiles);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="m-5">
      <div
        className={`file-drop-zone ${highlighted ? "highlighted" : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="font-bold pb-3">Drag and drop files here</p>
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({file.size} bytes)
                <button onClick={() => handleRemoveFile(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileDropZone;
