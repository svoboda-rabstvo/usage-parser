FROM node:10

WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm run log

COPY . /app

RUN npm install
RUN npm run lint
RUN npm run test
