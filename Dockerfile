FROM node:10

WORKDIR /app

COPY package.json /app
COPY config /app
COPY src /app
COPY test /app
COPY typings /app
COPY tsconfig.json /app
COPY tslint.json /app

RUN npm install
RUN npm run lint
RUN npm run test
