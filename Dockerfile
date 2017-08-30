FROM node:6.11.2-alpine

COPY src /src
WORKDIR /src

ADD package.json package.json
RUN npm install

CMD node server.js
