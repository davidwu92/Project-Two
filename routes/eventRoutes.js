const { Event } = require('../models')

module.exports = app => {
    // post found item 
  app.post('/event', (req, res) => {
    Event.create(req.body)
        .then(() => {
          res.sendStatus(200)
          .catch(e => console.log(e))
        })
  })
}