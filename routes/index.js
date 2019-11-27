//routes/index.js
module.exports = app =>{
  // pass express app to other route files.
  require('./lafRoutes.js')(app)
  require('./eventRoutes.js')(app)
  require('./userRoutes.js')(app)
}