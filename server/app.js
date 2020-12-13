const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models/index');
const morgan = require('morgan');

let router = require("./routes/routes.js");

// models.sequelize.sync().then( () => {
//   console.log("DB connection succeeded");
// }).catch(err => {
//   console.log("DB connection failed");
//   console.log(err);
// })
const app = express();

const port = 3040;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3040'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); 

app.use('/', router);


app.listen(port, () => {
    console.log(`server listen on ${port}`);
  });


module.exports = app;
