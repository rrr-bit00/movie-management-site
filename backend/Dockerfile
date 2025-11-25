FROM python:3.12-latest

COPY requirements.txt ./

RUN apt-get update && apt-get upgrade -y && \
    pip install --no-cache-dir -r requirements.txt
WORKDIR /backend

EXPOSE 8080

CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--reload" ]
