import React, { ChangeEvent, useCallback, useState } from "react";
import upload from "../../assets/img/upload.png";
import "./index.css";

interface Props {
  handleDataProvided: (e: File | null) => void;
}
const UploadData: React.FC<Props> = ({ handleDataProvided }) => {
  const [dragging, setDragging] = useState(false);

  const setDraggingToTrue = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!dragging) {
        setDragging(true);
      }
    },
    [dragging]
  );

  const setDraggingToFalse = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (dragging) {
        setDragging(false);
      }
    },
    [dragging]
  );

  const handleDrag = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      let dt = e.dataTransfer;
      if (!dt) {
        return;
      }

      let files = dt.files;
      if (files.length > 0 && files[0].type.startsWith("image/")) {
        handleDataProvided(files[0]);
      } else {
        alert("Please provide a image");
      }
      setDragging(false);
    },
    [handleDataProvided]
  );

  const handleUpload = useCallback(
    (e: ChangeEvent) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file && file.type.startsWith("image/")) {
        handleDataProvided(file);
      } else {
        alert("Please provide a image");
      }
      setDragging(false);
    },
    [handleDataProvided]
  );

  return (
    <div
      className="drop-zone"
      style={{
        borderColor: dragging ? "#06dce0" : "#ffffff4a",
        color: dragging ? "#b3eaea" : "white",
      }}
      onDragOver={setDraggingToTrue}
      onDragEnter={setDraggingToTrue}
      onDragLeave={setDraggingToFalse}
      onDragEnd={setDraggingToFalse}
      onDrop={handleDrag}
    >
      <span>Drag and Drop your image</span>
      <div className="upload-btn">
        <input className="inputfile" type="file" onChange={handleUpload} />
        <div className="view">
          <img src={upload} alt="upload" />
        </div>
      </div>
    </div>
  );
};

export default UploadData;
