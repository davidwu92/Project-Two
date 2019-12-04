const { Event } = require('../models')

module.exports = app => {
    // post found item 
  app.post('/event', (req, res) => {
    console.log(req.body)
    Event.create(req.body)
        .then(() => {
          res.sendStatus(200)
        })
        .catch(e => console.log(e))
  })

  app.get('/event', (req, res) => {
    Event.findAll()
    .then(events => res.json(events))
    .catch(e => console.log(e))
  })
}