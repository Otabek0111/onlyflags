const { Model } = require('sequelize');
const sequelize = require('../config/connection');

class profile extends Model { }

profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pronoun: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        green_flag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yellow_flag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        red_flag: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'profile',
    }
);

module.exports = profile;