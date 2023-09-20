const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class like extends Model { }

like.init(
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
        model: 'profile',
        key: 'id',
      },
    },
    liked_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
  }
);

module.exports = like;
