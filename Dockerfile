#Dockerfile
FROM python:3.10

WORKDIR /app

COPY ./requirements.txt .
COPY ./setup.sh .
COPY ./app.py .

# permet de dénir où le conteneur sera accéssible par défaut
EXPOSE 8090

# permet d'installer python
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
RUN bash load_model.sh

CMD ["uvicorn", "app:app"]