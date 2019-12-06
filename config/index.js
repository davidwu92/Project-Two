//config/index.js
const Sequelize = require('sequelize')
//this connection lives here, so we need to export it:nodemon


module.exports = new Sequelize(process.env.NODE_ENV ? process.env.JAWSDB_URL : process.env.LOCAL_URL)
// `mysql://root:password@localhost/laf_db`