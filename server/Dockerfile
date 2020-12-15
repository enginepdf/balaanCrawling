FROM node:14.14.0-alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
CMD npx sequelize-cli db:migrate; node app.js; node scrapingItems.js
