const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model { }

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    liker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Profile',
        key: 'id',
      },
    },
    liked_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Account',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Like',
  }
);

module.exports = Like;
