
const { Model } = require('sequelize');
const sequelize = require('../config/connection');

class like extends Model { }


like.init(
    {
        liker_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'profile',
                key: 'id',
            },
        },
        liked_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
    sequelize,
    modelName: 'like',
    }
);

module.exports = like;