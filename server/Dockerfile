FROM node:14.16.1-alpine3.13

ARG NODE_ENV="production"

RUN mkdir ./server && mkdir -p /var/www/html/images/

WORKDIR /server

COPY . .

RUN npm install -g sequelize-cli && npm install

EXPOSE 3000

CMD ./start.sh
