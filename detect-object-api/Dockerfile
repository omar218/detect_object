#Dockerfile
FROM python:3.10

WORKDIR /app

COPY ./requirements.txt .
COPY ./config.py .
COPY ./app.py .
COPY ./load_model.sh .
RUN bash load_model.sh
# COPY ./src .

# permet de définir où le conteneur sera accéssible par défaut
EXPOSE 8000

# permet d'installer python
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

CMD ["uvicorn", "app:app"]