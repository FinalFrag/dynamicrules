FROM node:lts-alpine
WORKDIR /opt/app
COPY . .
RUN npm install
CMD [ "npm", "start", "--silent" ]
