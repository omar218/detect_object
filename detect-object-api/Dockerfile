#Dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt .
COPY config.py .
COPY app.py .
COPY src .

RUN apt-get update && apt-get install -y mesa-common-dev libgl1-mesa-dev

# load model
# RUN mkdir -p src
# RUN wget -O yolov3.cfg https://opencv-tutorial.readthedocs.io/en/latest/_downloads/10e685aad953495a95c17bfecd1649e5/yolov3.cfg
# RUN wget -O coco.names https://opencv-tutorial.readthedocs.io/en/latest/_downloads/a9fb13cbea0745f3d11da9017d1b8467/coco.names
# RUN wget -O yolov3.weights https://pjreddie.com/media/files/yolov3.weights

#RUN ls -l

# permet de définir où le conteneur sera accéssible par défaut
EXPOSE 8000

# permet d'installer python
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

CMD ["fastapi", "run"]

