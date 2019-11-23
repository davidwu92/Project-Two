const{ Item } = require('../models')

module.exports = app => {

      // get all Items that match search
  app.get('/items', (req, res) => {
    // able to get the data from mySQL
    Item.findAll()
      .then(items => {
        // express gives us the simple data that we are looking for
        res.json(items)
      })
      .catch(e => console.log(e))
  })

  // post found item 
  app.post('/item', (req, res) => {
    Item.create(req.body)
        .then(() => {
          res.sendStatus(200)
          .catch(e => console.log(e))
        })
  })
  
}