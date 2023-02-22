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

/*Retrieves all users of the system */
app.route('/viewUsers').get((req,res) => {
  backend.viewUsers(req,res);
});

/*Endpoint deals with retrieving all pets of a specifc users */
app.route('/viewUsersPet/:id').get((req,res) => {
  userId = req.params['id'];
  backend.viewUserPet(userId,res);
});

/* Endpoint deals with retieving a specific pet*/
app.route('/viewPet/:id').get((req,res) => {
  petId = req.params['id'];
  backend.viewPet(petId,res);
});

app.route('/check').post((req, res) => {
  username = req.body.Username;
  password = req.body.Password;
  backend.login(username, password, res);

});

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

/* This endpoints deals with retrieving all the types of appointments*/
app.route('/selectType').get((req,res) => {
  backend.selectType(req,res);
});