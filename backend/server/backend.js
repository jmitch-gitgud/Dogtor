const {Client} = require("pg");

const dbPass = 'jordan_rocks';

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

module.exports = { login };