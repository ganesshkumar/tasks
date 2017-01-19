FROM node:7.4.0
MAINTAINER Ganessh Kumar (rpganesshkumar@gmail.com)

COPY ./build/bundle /app
RUN cd /app/programs/server && npm install
ENV PORT=80
EXPOSE 80

CMD node /app/main.js
