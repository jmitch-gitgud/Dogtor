const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'jordan_rocks',
    database: 'testbase',
    port: 5432,
});

const setupDatabase = async () => {
    try {
        
        await client.connect();  

        // Dropping old test tables from database postgres
        await client.query("Drop Table if exists TABLE");
        // Setting up database and tables
        await client.query("Create Table if not exists TABLE( ATTRIBUTES );");
        // Inserting test staff member data - with password encryption
        await client.query("CREATE EXTENSION if not exists pgcrypto SCHEMA public;");
        await client.query("INSERT INTO TABLE (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Office Administrator'), (SELECT status_id FROM status WHERE status = 'Active'), 'oa1', crypt('password', gen_salt('md5')), 'Jane', 'Doe', 'test@unb.ca');");
    
    } catch (error) {
    
        console.error(error.stack);
    
    } finally {
    
        await client.end();                                
    
    }
};

setupDatabase().then((result) => {
    if (result) {
        
        console.log('Setup has run successfully.');
    
    }
});
