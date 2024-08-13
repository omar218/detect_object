import React, { useCallback, useState } from "react";
import "./App.css";
import UploadData from "./components/uploadData";
import { API_HOST, API_PORT } from "./config";
import BlockCmp from "./components/block";

function App() {
  const [imgProvided, setImgProvided] = useState<File | null>(null);
  const [blocks, setBlocks] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);

  const imgProvidedUrl = imgProvided
    ? URL.createObjectURL(imgProvided)
    : undefined;

  const handleChange = useCallback(() => {
    if (!loading) {
      setBlocks([]);
      setImgProvided(null);
    }
  }, [loading]);

  const handleDetect = useCallback(async () => {
    if (!loading) {
      setLoading(true);
      if (imgProvided) {
        const formdata = new FormData();
        formdata.append("file", imgProvided, "road.jpeg");

        const requestOptions = {
          method: "POST",
          body: formdata,
        };

        await fetch(`http://${API_HOST}:${API_PORT}/detect/`, requestOptions)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error("Detecting isn't a success");
          })
          .then((result) => {
            const data: Array<any> = result;
            setBlocks(data);
          })
          .catch((error) => console.error(error));
      } else {
        alert("Image not provide");
      }
      setLoading(false);
    }
  }, [imgProvided, loading]);

  return (
    <div className="App">
      {(() => {
        if (imgProvidedUrl) {
          return (
            <>
              <div className="viewer-detect">
                <div className="preview-img">
                  <img src={imgProvidedUrl} className="img" alt="detect-img" />
                  {blocks.map((block, i) => {
                    return <BlockCmp key={`block-${i}`} block={block} />;
                  })}
                </div>
              </div>

              <div className="group-button">
                <button
                  className="btn btn-secondary display-2"
                  disabled={loading}
                  onClick={handleChange}
                >
                  Change
                </button>
                <button
                  className="btn btn-primary display-2"
                  disabled={loading}
                  onClick={handleDetect}
                >
                  Detect-Object
                </button>
              </div>
            </>
          );
        }
        return (
          <UploadData
            handleDataProvided={(e) => {
              setImgProvided(e);
            }}
          />
        );
      })()}
    </div>
  );
}

export default App;
