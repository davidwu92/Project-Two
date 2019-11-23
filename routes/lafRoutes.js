const{ Item } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = app => {

// keep this for tests
const Dummy ={
  color: ['black', 'red', 'blue', 'white'],
  titleWords: ['if', 'ok', 'phone', 'mom', 'fish'],
}
      // get all Items that match search
  app.post('/items', (req, res) => {
    // able to get the data from mySQL
    console.log(req.body.term)
    Item.findAll({
      where:{
      description: {
                [Op.like]: `%${req.body.term}%`
            }
    }
    }
      )
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
  
  // Keep this for dummy data test
  app.post('/createdata', (req, res)=>{
    for (let i =0; i<10;i++){
      Item.create({
        title: Dummy.titleWords[Math.floor(Math.random()*5)],
        description: Dummy.color[Math.floor(Math.random()*4)] +Dummy.color[Math.floor(Math.random()*4)] +Dummy.titleWords[Math.floor(Math.random()*5)]
      }).then(data=>res.json(data)).catch(err=>console.log(err))
    }
    
  })
}