const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

Celebrity.collection.drop();

const dbName = 'lab-mongoose-movies';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
  {
    name: "A Famous",
    occupation: "Singer",
    catchphrase: "I'm the best"
  },
  {
    name: "Mr B Celebrity",
    occupation: "Actor",
    catchphrase: "Catchphrase number 2"
  },
  {
    name: "Blah blah",
    occupation: "Politican",
    catchphrase: "Vote for me"
  }
];

Celebrity.create(celebrities, (e) => {
  if (e) {console.log(e)}
  console.log(`Created ${celebrities.length} entries`);
  mongoose.connection.close();
})


