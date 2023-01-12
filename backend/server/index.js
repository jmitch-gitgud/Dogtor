var express = require("express");
var bodyParser = require('body-parser')
const app = express();
var http = require("http");
var server = http.createServer(app);
const backend = require('./backend.js')

const listenPort = 3001;

app.use(bodyParser.json({limit: '1mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}))

// Allow CORS support and remote requests to the service
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

server.listen(listenPort, "127.0.0.1");

app.route('/check').post((req, res) => {
  username = req.body.Username;
  password = req.body.Password;

  backend.login(username, password, res);
}); 