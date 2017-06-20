const settings = require('./settings');
const moment = require('moment');

const knex = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex,public'
});

const input = process.argv[2];

const lookupByName = (name) => {
  knex('famous_people')
    .where('first_name', name)
    .orWhere('last_name', name)
    .then((rows) => {
      output(rows);
    })
    .then(() => {
      knex.destroy();
    });
}

const output = (rows) => {
  console.log(`Found ${rows.length} person(s) by the name of ${input}.`);
  for (let row of rows) {
    const bDayString = moment(row.birthdate).format("YYYY-MM-DD");
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${bDayString}'`);
  }
}

lookupByName(input);