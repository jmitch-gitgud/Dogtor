
const axios = require('axios');
const app = require('../server/index');
const { Client } = require('pg');


// ========= VERY BASIC EXAMPLE (no external function call) =============
test('Hopefully, a helpful test', () => {
  expect(6 + 6).toBe(12);
});

test('Test to get all users', async () => {
  await expect(getUsers()).resolves.toStrictEqual(200);
});

test('Connection to select type', async () => {
  await expect(selectType()).resolves.toStrictEqual(200);
});

test('Test to get pet that does not exist', async () => {
  await expect(getPetIncorrect()).rejects.toThrow("Request failed with status code 500");;
});

test('Test to get user that does not exist', async () => {
  await expect(getUserPetsIncorrect()).rejects.toThrow("Request failed with status code 500");;
});



async function getPetIncorrect(){
  let res = await axios.get('http://127.0.0.1:3001/viewPet/e5975bd-d4fc-4f24-9b56-fc860a6dc822');
  let status = res.status
  return status
}

async function getUserPetsIncorrect(){
  let res = await axios.get('http://127.0.0.1:3001/viewUsersPet/e0dd487-6bc3-475f-91a7-a17af6212aba');
  let status = res.status
  return status
}

async function selectType(){
  let res = await axios.get('http://127.0.0.1:3001/selectType');
  let status = res.status
  return status
}

async function getUsers(){
  let res = await axios.get('http://127.0.0.1:3001/viewUsers');
  let status = res.status
  return status
}