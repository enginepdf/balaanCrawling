dockerize -wait tcp://mysql:3306 -timeout 20s

echo "start server"

npx sequelize-cli db:migrate
node app.js