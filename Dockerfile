# Specify Base Image
FROM node:slim

WORKDIR '/home/authService'

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]