// 🔥🔥🔥Imports🔥🔥🔥
const seedAccounts = require('./account-seeds');
const seedProfiles = require('./profile-seeds');

const sequelize = require('../config/connection');


//🔥🔥🔥Seeding Function🔥🔥🔥 
const seedAll = async () => {
  
await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedAccounts();
  console.log('\n----- ACCOUNTS SEEDED -----\n');

  await seedProfiles();
  console.log('\n----- PROFILES SEEDED -----\n');

  process.exit(0);
};

seedAll();
