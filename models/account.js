
const { Model } = require('sequelize');
const sequelize = require('../config/connection');

class account extends Model { }


account.init(
  {
    id: {
      type: DataTypes.Integer,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { 
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  }
),

{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
}


module.exports = account;





