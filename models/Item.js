// models/Item.js
module.exports = (sequelize, Model, DataTypes) => {
  class Item extends Model { }
  Item.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    contact: DataTypes.STRING,
    isReturned: {type: DataTypes.BOOLEAN, defaultValue:false}
  }, { sequelize, modelName: 'item'})

  return Item
}