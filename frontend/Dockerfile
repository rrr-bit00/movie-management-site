FROM node:22.21-bookworm-slim

WORKDIR /frontapp

RUN apt-get update && apt-get clean

COPY package*.json ./

RUN npm install

EXPOSE 3030

CMD [ "npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3030"]
