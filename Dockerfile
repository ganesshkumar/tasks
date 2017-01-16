FROM node:7.4.0

MAINTAINER Ganessh Kumar (rpganesshkumar@gmail.com)

RUN apt-get update && apt-get install -y curl
RUN curl https://install.meteor.com/ | sh

WORKDIR /app

CMD ["~/.meteor npm install && ~/.meteor"]
