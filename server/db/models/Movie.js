const Sequelize = require('sequelize')
const db = require('../db')

const Movie = db.define('movie', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  voteAverage: Sequelize.DECIMAL,
  releaseDate: Sequelize.STRING,
  overview: Sequelize.TEXT,
  imageUrl: Sequelize.STRING,
})

module.exports = Movie