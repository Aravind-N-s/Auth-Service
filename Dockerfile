# Specify Base Image
FROM node:alpine

WORKDIR '/home/authService'

COPY ./package.json ./

RUN npm install

COPY . .

CMD if ["$NODE_ENV" = 'development']; \
    then npm run dev; \
    else npm run test; \
    fi