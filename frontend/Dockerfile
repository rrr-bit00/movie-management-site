FROM node:22-slim

COPY package.json package-lock.json ./
RUN apt-get update && apt-get upgrade -y && apt-get clean \
    npm install
WORKDIR /frontend

COPY . .
EXPOSE 3030

CMD [ "npm", "run", "dev", "-H", "0.0.0.0", "-p", "3030"]