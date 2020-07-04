# Specify Base Image
FROM node:alpine

WORKDIR '/home/authService'

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]