require('dotenv').config()
const express = require('express')
const { join } = require('path')

const db = require('./config')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

// { force: true }
db.sync({ force: true })
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(e => console.log(e))



