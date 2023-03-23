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
  role = req.body.Role;
  backend.login(username, password, role, res);
});

app.route('/register-user-step-1').post((req, res) => {
  firstName = req.body.FirstName;
  lastName = req.body.LastName;
  email = req.body.Email;
  role = req.body.Role;
  backend.registerUserFirstStep(firstName, lastName, email, role, res);
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

app.route('/viewType/:type').get((req,res) => {
  appointment_type_value = req.params['type'];
  backend.selectValueFromType(appointment_type_value,res);
});

app.route('/findPerfomer/:id').get((req,res) =>{
  performer_id = req.params['id']
  backend.selectPerformer(performer_id,res);
});

app.route('/findTimesForStaff/:id').get((req,res) =>{
  staff_id = req.params['id']
  backend.findStaffTimes(staff_id,res);
});

app.route('/findUserTimes/:userId').get((req,res) =>{
  user_id = req.params['userId']
  backend.findUserTimes(user_id,res);
});

app.route('/findTimesMax/:typId').get((req,res) =>{
  type_id = req.params['typId']
  backend.findTimes(type_id,res);
});

app.route('/adminBook').post((req,res) =>{
  start_appointment_date = req.body.start_appointment_date;
  end_appointment_date = req.body.end_appointment_date;
  appointment_type_id = req.body.appointment_type_id;
  assigned_client_id = req.body.assigned_client_id;
  assigned_pets_id = req.body.assigned_pets_id;
  staff_id = req.body.staff_id;
  resource_id = req.body.resource_id;
  notes = req.body.notes;
  backend.adminBook(start_appointment_date,end_appointment_date,appointment_type_id,assigned_client_id,assigned_pets_id,staff_id,resource_id,notes,res);
});

app.route('/delete/:removeId').delete((req,res) =>{
  type_id = req.params['removeId']
  backend.deleteTime(type_id,res);
});