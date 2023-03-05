const {Client} = require("pg");

const dbPass = 'ROY25';

function schedule(details, date, vet, tech, pet, cust, compla, res) {
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: dbPass,
    port: 5432,
  });

  const text = 'INSERT INTO public.appointment(appointment_details, appointment_date, assigned_vets_id, assigned_technicians_id, assigned_pets_id, assigned_Client_id, chief_complaint) VALUES($1, $2, $3, $4, $5, $6, $7)'
  const values = [details, date, vet, tech, pet, cust, compla]

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      client.query(text, values, (err, pgres) => {
        if (err) {
          console.log(err.stack)
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "ERROR"}));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "inserted"}));
        }});
      }
  })
}

function login(u, p, res) {
    const client = new Client({
        host: '127.0.0.1',
        user: 'postgres',
        database: 'postgres',
        password: dbPass,
        port: 5432,
      });

      const text = 'SELECT * FROM "public"."User" WHERE "Username" = $1 AND "Password" = $2'
      const values = [u, p]
      
        client.connect(err => {
          if (err) {
            console.error('connection error', err.stack)
          } else {
            client.query(text, values, (err, pgres) => {
              if (err) {
                console.log(err.stack)
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({status: "ERROR"}));
              } else {
                if (pgres.rowCount === 0) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({status: "Invalid credentials"}));
                } else {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({status: "Logged in"}));
                  }
                }
              });
                }
        })
}

/* Retrieves all the users from the system */
function viewUsers(req,res){
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: dbPass,
    port: 5432,
  });
  const text = 'SELECT client_id, client_username FROM public.clients'
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      client.query(text, (err, pgres) => {
        if (err) {
          console.log(err.stack)
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "ERROR"}));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "Retrieved",data: pgres.rows}));
          console.log(pgres);
        }});
      }
  })
}

/*Retrieves all the pets of a specifc pet */
function viewUserPet(userId,res){
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: dbPass,
    port: 5432,
  });

  const text = 'SELECT * FROM public.pets WHERE "owner_id"=$1'
  const values = [userId]

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      client.query(text, values, (err, pgres) => {
        if (err) {
          console.log(err.stack)
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "ERROR"}));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "retrieved", data: pgres.rows}));
        }});
      }
  })
}

/* Will retrieve all information on a specifc pet*/
function viewPet(petId,res){
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: dbPass,
    port: 5432,
  });

  const text = 'SELECT * FROM public.pets WHERE "pet_id"=$1'
  const values = [petId]

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      client.query(text, values, (err, pgres) => {
        if (err) {
          console.log(err.stack)
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "ERROR"}));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "retrieved", data: pgres.rows}));
        }});
      }
  })

}

/*Function will retrieve all the types in the system that currently exist */
function selectType(req,res){
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: dbPass,
    port: 5432,
  });
  const text = 'SELECT DISTINCT appointment_type_catagory FROM appointment_type;'
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      client.query(text, (err, pgres) => {
        if (err) {
          console.log(err.stack)
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "ERROR"}));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "Retrieved",data: pgres.rows}));
          console.log(pgres);
        }});
      }
  })
}


function selectValueFromType(appointment_type_value, res){
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: dbPass,
    port: 5432,
  });

  const text = 'SELECT * FROM appointment_type.pets WHERE "appointment_type_value"=$1'
  const values = [appointment_type_value]

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      client.query(text, values, (err, pgres) => {
        if (err) {
          console.log(err.stack)
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "ERROR"}));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "retrieved", data: pgres.rows}));
        }});
      }
  })
}

module.exports = { login, schedule, viewUsers, viewUserPet,viewPet, selectType, selectValueFromType};