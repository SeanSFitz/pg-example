const settings = require('./settings');
const moment = require('moment');

const knex = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex,public'
});

const input = process.argv.slice(2);

const newPerson = {
  first_name: input[0],
  last_name: input[1],
  birthdate: input[2]
}

const addFamousPerson = (data) => {
 knex('famous_people')
    .insert(data)
    .then( (results) => {
      console.log("Added new user");
    })
    .catch( (err) => {
      throw err;
    })
    .then(() => {
      knex.destroy();
    })
}

addFamousPerson(newPerson);

