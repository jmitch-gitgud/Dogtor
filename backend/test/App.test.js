
const axios = require('axios');
const app = require('../server/index');
const { Client } = require('pg');

// ========= VERY BASIC EXAMPLE (no external function call) =============
test('Hopefully, a helpful test', () => {
  expect(6 + 6).toBe(12);
});

// ========== '//appointment' endpoint ===========
test('Adding appointment', async () => {
  await expect(addAppointment()).resolves.toStrictEqual({"status" : "inserted"});
});

async function addAppointment(){

 let payload = {
  details : "Test Values",
  date : '2023-01-01',
  vetId : null,
  techId : null,
  petId : null,
  clientId : null,
  chiefComplaint : null
 }

  let res = await axios.post('http://localhost:3001/appointment', payload);
  let data = res.data
  return data
}
