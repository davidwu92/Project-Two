const{ Item } = require('../models')

module.exports = app => {
  // post found item 
  app.post('/item', (req, res) => {
    Item.create(req.body)
        .then(() => {
          sendStatus(200)
          .catch(e => console.log(e))
        })
  })
}