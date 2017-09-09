FROM node:6
MAINTAINER Shawn Hartsell

COPY . /app
WORKDIR /app

ENV NODE_ENV production

EXPOSE 9000
CMD ["npm", "start"]
