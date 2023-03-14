const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'jordan_rocks',
    database: 'postgres',
    port: 5432,
});

const setupDatabase = async () => {
    try {
        
        await client.connect();  

        // Add extensions
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await client.query("SELECT uuid_generate_v1();");
        await client.query("CREATE EXTENSION if not exists pgcrypto SCHEMA public;");

        // Dropping old test tables from database postgres
        await client.query("Drop Table if exists admins CASCADE");
        await client.query("Drop Table if exists staff CASCADE");
        await client.query("Drop Table if exists appointment_type CASCADE");
        await client.query("Drop Table if exists appointment CASCADE");
        await client.query("Drop Table if exists custom_skills CASCADE");
        await client.query("Drop Table if exists pets CASCADE");
        await client.query("Drop Table if exists clients CASCADE");

        // Setting up database and tables
        await client.query("Create Table if not exists admins(admin_id uuid DEFAULT uuid_generate_v4 (), admin_name VARCHAR NOT NULL, admin_password VARCHAR NOT NULL, PRIMARY KEY(admin_id));");
        await client.query("Create Table if not exists clients(client_id uuid DEFAULT uuid_generate_v4 (), client_name VARCHAR NOT NULL, client_username VARCHAR NOT NULL, client_password VARCHAR NOT NULL, client_notes VARCHAR, PRIMARY KEY(client_id));");
        await client.query('Create Table if not exists pets(pet_id uuid DEFAULT uuid_generate_v4 (), pet_name VARCHAR NOT NULL, pet_appointements_notes TEXT [], owner_id uuid, pet_age int, pet_weight int, pet_sex VARCHAR,  pet_neutered BOOLEAN, who_performed_last VARCHAR, last_date date, pets_behaviour TEXT, pet_active BOOLEAN, PRIMARY KEY(pet_id), FOREIGN KEY (owner_id) REFERENCES "clients" (client_id));');        
        await client.query("Create Table if not exists staff(staff_id uuid DEFAULT uuid_generate_v4 (), staff_username VARCHAR NOT NULL, staff_password VARCHAR NOT NULL, staff_start_time time, staff_end_time time, catagory INT, PRIMARY KEY(staff_id));");
        await client.query("Create Table if not exists appointment_type(appointment_type_id uuid DEFAULT uuid_generate_v4 (), appointment_type_catagory VARCHAR, appointment_type_value VARCHAR, appointment_type_duration INT, PRIMARY KEY(appointment_type_id));");
        await client.query('Create Table if not exists appointment(appointment_id uuid DEFAULT uuid_generate_v4 (), start_appointment_date VARCHAR, end_appointment_date VARCHAR, assigned_pets_id uuid, assigned_client_id uuid, resource_id VARCHAR, appointment_type_id uuid, staff_id uuid, sleepShift bool, notes VARCHAR(500), FOREIGN KEY (assigned_client_id) REFERENCES "clients" (client_id), FOREIGN KEY (assigned_pets_id) REFERENCES "pets" (pet_id), FOREIGN KEY (staff_id) REFERENCES "staff" (staff_id), FOREIGN KEY (appointment_type_id) REFERENCES "appointment_type" (appointment_type_id), PRIMARY KEY(appointment_id));');
        await client.query('Create Table if not exists custom_skills(custom_skills_id uuid DEFAULT uuid_generate_v4 (), staff_id uuid, appointment_type_id uuid, PRIMARY KEY (custom_skills_id), FOREIGN KEY (staff_id) REFERENCES "staff" (staff_id), FOREIGN KEY (appointment_type_id) REFERENCES "appointment_type" (appointment_type_id));');

        // Inserting test data into db
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('General Appointment','Checkups',30);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('General Appointment','Vaccines',30);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('General Appointment','Ear Infections',30);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('General Appointment','Consultations',30);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('General Appointment','Annual Appointment',30);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Sick Appointment','Pet is under some form of distress',60);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Technician Appointment','Technician performs task',15);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Exotic Appointment','Exotic Animal appointment',45);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value) VALUES ('Emergency Appointment','Extreme situation where care is needed immediately');");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Surgeries','Ortho', 240);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Surgeries','Dental', 180);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Surgeries','Spay(dog)', 45);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Surgeries','Neuter(dog)', 15);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Surgeries','Spay(cat)', 30);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Surgeries','Neuter(cat)', 15);");
        await client.query("INSERT INTO appointment_type(appointment_type_catagory,appointment_type_value,appointment_type_duration) VALUES ('Surgeries','Exotic Surgery', 120);");

        await client.query("INSERT INTO admins(admin_name,admin_password) VALUES ('AndreAucoin',crypt('password', gen_salt('md5')));");
        await client.query("INSERT INTO admins(admin_name,admin_password) VALUES ('jordanmitchell247',crypt('pass1', gen_salt('md5')));");
        await client.query("INSERT INTO clients(client_name, client_username, client_password) VALUES ('John Smith', 'JohnDuck', crypt('password', gen_salt('md5')));");
        await client.query("INSERT INTO staff(staff_username, staff_password,catagory) VALUES ('Donald Duck',crypt('password', gen_salt('md5')),1);");
    
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
