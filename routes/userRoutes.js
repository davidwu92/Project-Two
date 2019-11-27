const { User } = require('../models')

module.exports = app => {

  // GET all users
  app.get('/users', (req, res) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(e => console.log(e))
  })

  // GET one user
  app.get('/users/:username/:password', (req, res) => {
    User.findOne({ where: {
      username: req.params.username,
      password: req.params.password
    }})
    .then(user => {
      res.json(user)
    })
    .catch(e => console.log(e))
  })

  // POST one user
  app.post('/users', (req, res) => {
      User.create(req.body)
        .then(user => {
          res.json(user)
        })
        .catch(e => console.log(e))
  })

  // PUT one user
  app.put('/users/:id', (req, res) => {
    User.findOne({ where: {id: req.params.id}})
      .then(user => user.update(req.body))
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  // DELETE one user
  app.delete('/users/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id }})
      .then(user => user.destroy())
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })
}