// models/index.js
const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config')

const Event = require('./Event.js')(sequelize, Model, DataTypes)
const Item = require('./Item.js')(sequelize, Model, DataTypes)
const User = require('./User.js')(sequelize, Model, DataTypes)

//Each EVENT should have many ITEMS.
Event.hasMany(Item)
//Each ITEM must have one EVENT.
Item.belongsTo(Event)

module.exports = {
  Event,
  Item,
  User
}