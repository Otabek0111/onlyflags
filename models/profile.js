const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Profile extends Model { }
Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        AccountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Account',
                key: 'id',
            },
        },
        age: {
            type: DataTypes.INTEGER,
            defaultValue: 18,
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
        modelName: 'Profile',
    }
);
module.exports = Profile;