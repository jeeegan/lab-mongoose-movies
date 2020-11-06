const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

Celebrity.collection.drop();
Movie.collection.drop();

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

const movies = [
  {
    title: "Rambo",
    genre: "Action",
    plot: "Lots of shooting"
  },
  {
    title: "Star Trek",
    genre: "Sci-fi",
    plot: "Space adventures..."
  },
  {
    title: "The Social Network",
    genre: "True story",
    plot: "The start of Facebook"
  }
]

Celebrity.create(celebrities, (e) => {
  if (e) {console.log(e)}
  console.log(`Created ${celebrities.length} celebrity entries`);
  mongoose.connection.close();
})

Movie.create(movies, (e) => {
  if (e) {console.log(e)}
  console.log(`Created ${movies.length} movie entries`);
  mongoose.connection.close()
})


