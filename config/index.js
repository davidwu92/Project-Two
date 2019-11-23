//config/index.js
const Sequelize = require('sequelize')
//this connection lives here, so we need to export it:nodemon

module.exports = new Sequelize('mysql://root:password@localhost/LAF_db')