FROM node:10

#create working directory

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY public ./public

COPY src ./src

COPY .env ./

EXPOSE 3000

CMD ["npm" ,  "start"]