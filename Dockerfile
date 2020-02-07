FROM node:10

#create working directory

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY /src ./

EXPOSE 3100

CMD ["npm" ,  "start"]