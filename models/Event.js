// models/Event.js
module.exports = (sequelize, Model, DataTypes) => {
  class Event extends Model { }
  Event.init({
    title: DataTypes.STRING
  },{sequelize, modelName: 'event'})
  return Event
}