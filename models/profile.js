const { Model, DataTypes } = require('sequelize');
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
        pronouns: {
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
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        green_flags: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yellow_flags: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        red_flags: {
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