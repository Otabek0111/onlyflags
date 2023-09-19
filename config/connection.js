require('dotenv').config();

const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PW;
const host = process.env.DB_HOST;

let sequelize;

// const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//   host: host,
//   dialect: 'mysql',
//   dialectOptions: {
//     decimalNumbers: true,
//   },
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection established');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}


module.exports = sequelize;