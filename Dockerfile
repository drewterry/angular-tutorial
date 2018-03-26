FROM node

RUN mkdir /angular-tour-of-heroes
WORKDIR /angular-tour-of-heroes

COPY ./angular-tour-of-heroes/package.json .

RUN npm install -g @angular/cli --unsafe && npm install
