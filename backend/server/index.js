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

app.route('/viewUsers').get((req,res) => {
  backend.viewUsers(req,res);
});

app.route('/viewUsersPet/:id').get((req,res) => {
  userId = req.params['id'];
  backend.viewUserPet(userId,res);
});

app.route('/viewPet/:id').get((req,res) => {
  petId = req.params['id'];
  backend.viewPet(petId,res);
});

app.route('/check').post((req, res) => {
  username = req.body.Username;
  password = req.body.Password;
  backend.login(username, password, res);

  const text = 'SELECT * FROM "public"."User" WHERE "Username" = $1 AND "Password" = $2'
  const values = [username, password]

  const client = new Client({
  host: '127.0.0.1',
  user: 'postgres',
  database: 'postgres',
  password: 'jordan_rocks',
  port: 5432,
}); });

app.route('/appointment').post((req, res) => {
  appointmentD = req.body.details;
  appointmentDate = req.body.date;
  appointmentVet = req.body.vetId;
  appointmentTech = req.body.techId;
  appointmentPet= req.body.petId;
  appointmentClient = req.body.clientId;
  appointmentComplain = req.body.chiefComplaint;
  backend.schedule(appointmentD, appointmentDate, appointmentVet, appointmentTech, appointmentPet, appointmentClient, appointmentComplain, res);
});

/* This endpoints deals with retrieving all the types of endpoints*/
app.route('/selectType').get((req,res) => {
  backend.selectType(req,res);
});