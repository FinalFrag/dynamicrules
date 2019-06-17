FROM node:lts-alpine
WORKDIR /opt/app
COPY . .
RUN npm install --production
CMD [ "npm", "start", "--silent" ]
