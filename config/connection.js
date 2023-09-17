require('dotenv').config();

const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PW;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: host,
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;