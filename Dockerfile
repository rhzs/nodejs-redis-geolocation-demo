FROM node:6.9.1

RUN mkdir /src


WORKDIR /src
ADD package.json package.json
RUN npm install
