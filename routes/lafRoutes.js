const{ Item } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = app => {

// keep this for tests
const Dummy ={
  color: ['black', 'red', 'blue', 'white', 'green'],
  titleWords: ['wallet', 'watch', 'phone', 'glasses', 'keys'],
  model: ['small', 'gucci', 'large', 'old', 'new'],
  contacts:['paul@gmail.com', 'michelle@gmail.com', 'david@gmail.com', 'kamlesh@gmail.com', 'jawed@gmail.com']

}
      // get all Items that match search
  app.post('/items', (req, res) => {
    // able to get the data from mySQL

   let potentials = []
    if (req.body.keywords) {
      potentials.push({
          description: {
            [Op.or]: req.body.keywords.map(keyword => ({ [Op.like]: keyword }))
          },
       })
    }
    if (req.body.title) {
      potentials.push({
         title: { [Op.like]: req.body.title }
       })
    }
   
   Item.findAll({ where: {
     eventId: req.body.eventId,
    [Op.or]: potentials
     }
    })
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
        })
        .catch(e => console.log(e))
  })
  
  // show posted items from user
  app.get('/items/:id/:event', (req, res) => {
    Item.findAll({
      where: {
        userId: req.params.id,
        eventId: req.params.event
      }
    })
    .then(items => {
      res.json(items)
    })
    .catch(e => console.log(e))
  })

    app.put('/items/:id', (req, res) => {
    Item.findOne({ where: { id: parseInt(req.params.id) } })
      .then(item => item.update({ isReturned: !item.isReturned}))
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

  // Keep this for dummy data test
  app.post('/createdata', (req, res)=>{
    for (let i =0; i<10;i++){
      Item.create({
        title: Dummy.titleWords[Math.floor(Math.random()*5)],
        description: Dummy.model[Math.floor(Math.random()*5)] + Dummy.color[Math.floor(Math.random()*5)],
        contact: Dummy.contacts[Math.floor(Math.random()*5)]


      }).then(data=>res.json(data)).catch(err=>console.log(err))
    }
    
  })

  // test lost items count show
  app.get('/items', (req, res) => {
      Item.findAll({ where: { isReturned: 0}
      })
      .then(items => {
        res.json(items)
      })
      .catch(e => console.log(e))
  })
  
  app.get('/itemsfound', (req, res) => {
      Item.findAll({ where: { isReturned: 1}
      })
      .then(items => {
        res.json(items)
      })
      .catch(e => console.log(e))
  })

  app.delete('/items/:id', (req, res) => {
    Item.findOne({ where: { id: req.params.id}})
       .then(item => item.destroy())
      .then(() => res.sendStatus(200))
      .catch(e => console.error(e))
  })

}


