import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import environ


class Block(BaseModel):
    x: float = 0.5
    y: float = 0.5
    w: float = 0.7
    h: float = 0.9
    label: str = "tomato"


class OutputData(BaseModel):
    blocks: list[Block] = [{"x": 0.5, "y": 0.8, "w": 0.9, "h": 1, "label": "car"}]


print("http://${}:{}".format(environ["FRONTEND_HOST"], environ["FRONTEND_PORT"]))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://{}:{}".format(environ["FRONTEND_HOST"], environ["FRONTEND_PORT"]),
        "https://{}:{}".format(environ["FRONTEND_HOST"], environ["FRONTEND_PORT"]),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chargement des classes
with open("src/coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

net = cv2.dnn.readNetFromDarknet("src/yolov3.cfg", "src/yolov3.weights")
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
ln = net.getLayerNames()
ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]


@app.post("/detect/")
async def detect_objects_block(file: UploadFile = File(...)):
    # Chargement de l'image
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    height, width, _ = image.shape

    # Détection
    blob = cv2.dnn.blobFromImage(
        image, 0.00392, (416, 416), (0, 0, 0), True, crop=False
    )
    net.setInput(blob)
    outs = net.forward(ln)

    # Analyse des résultats
    class_ids = []
    confidences = []
    boxes = []

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                # Extraction des coordonnées du rectangle délimitant
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    # Application de la suppression de non-maxima
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    BOXS = []
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            id = class_ids[i]
            BOXS.append(
                {
                    "x": x / width,
                    "y": y / height,
                    "w": w / width,
                    "h": h / height,
                    "label": str(classes[id]),
                }
            )

    return BOXS
