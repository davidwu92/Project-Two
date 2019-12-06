//config/index.js
const Sequelize = require('sequelize')
//this connection lives here, so we need to export it:nodemon

module.exports = new Sequelize('mysql://root:root@localhost/laf_db')