FROM node

RUN mkdir /my-app
WORKDIR /my-app

COPY ./my-app/package.json .

RUN npm install -g @angular/cli --unsafe && npm install
