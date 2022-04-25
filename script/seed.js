'use strict'

const axios = require('axios')
const {db, models: {User, Movie} } = require('../server/db')
require('dotenv').config();

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  const getMovies = async (page) => {
    const api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.MOVIES_API}&page=${page}&vote_average.gte=7&vote_average.lte=10`;
    const { data } = await axios.get(api);
    for (const { title, vote_average, release_date, overview, poster_path } of data.results) {
      await Movie.create({
        name: title,
        voteAverage: vote_average,
        releaseDate: release_date,
        overview: overview,
        imageUrl: `https://image.tmdb.org/t/p/w1280${poster_path}`,
      });
    }
  };

  for (let i = 1; i < 30; i++) {
    await getMovies(i);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
