const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('mydb','awico','awico',{
    dialect: 'sqlite',
    host: './database.sqlite3'
})

module.exports = sequelize