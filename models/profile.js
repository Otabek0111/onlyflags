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
        // gender: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
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
        // // image: {
        // //     type: DataTypes.STRING,
        // //     allowNull: true,
        // },
        // disliked_by_user_ids: {
        //     type: DataTypes.JSON,
        //     allowNull: true,
        // },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Profile',
    }
);
module.exports = Profile;