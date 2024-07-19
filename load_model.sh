mkdir -p "src"

wget https://pjreddie.com/media/files/yolov3.weights
wget https://opencv-tutorial.readthedocs.io/en/latest/_downloads/10e685aad953495a95c17bfecd1649e5/yolov3.cfg
wget https://opencv-tutorial.readthedocs.io/en/latest/_downloads/a9fb13cbea0745f3d11da9017d1b8467/coco.names

mv yolov3.weights ./src/
mv yolov3.cfg ./src/
mv coco.names ./src/