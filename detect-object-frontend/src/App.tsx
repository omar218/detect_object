import React, { useCallback, useState } from "react";
import "./App.css";
import UploadData from "./components/uploadData";
import { API_HOST, API_PORT } from "./config";

function App() {
  const [imgProvided, setImgProvided] = useState<File | null>(null);
  const [imgDetected, setImgDetected] = useState<File | null>(null);
  const imgProvidedUrl = imgProvided
    ? URL.createObjectURL(imgProvided)
    : undefined;
  const imgDetectedUrl = imgDetected
    ? URL.createObjectURL(imgDetected)
    : undefined;

  const handleChange = useCallback(() => {
    setImgProvided(null);
  }, []);

  const handleDetect = useCallback(async () => {
    console.log("detect image");

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
            return response.blob();
          }
          throw new Error("Un problème s'est produit lors de la détection");
        })
        .then((result) => {
          if (result) {
            setImgDetected(
              new File([result], "detect_image.png", {
                type: result.type,
                lastModified: new Date().getTime(),
              })
            );
          } else {
            throw new Error("Aucune image n'a été fourni");
          }
          console.log(result);
        })
        .catch((error) => console.error(error));

      await fetch(
        `http://${API_HOST}:${API_PORT}/detect/block/`,
        requestOptions
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("Un problème s'est produit lors de la détection");
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    } else {
      alert("Aucune image fourni");
    }
  }, [imgProvided]);

  return (
    <div className="App">
      {(() => {
        if (imgProvided) {
          return (
            <>
              <div className="preview-img">
                <img src={imgProvidedUrl} alt="" />
              </div>

              {imgDetectedUrl ? (
                <div className="preview-img">
                  <img src={imgDetectedUrl} alt="" />
                </div>
              ) : (
                <></>
              )}

              <div className="group-button">
                <button className="btn btn-secondary" onClick={handleChange}>
                  Change
                </button>
                <button className="btn btn-primary" onClick={handleDetect}>
                  Detecter
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
