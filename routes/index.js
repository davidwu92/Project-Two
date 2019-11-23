//routes/index.js
module.exports = app =>{
  // pass express app to other route files.
  require('./lostRoutes.js')(app)
  require('./foundRoutes.js')(app)
}