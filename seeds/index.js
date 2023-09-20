// 🔥🔥🔥Imports🔥🔥🔥
const seedaccounts = require('./account-seeds');
const seedprofiles = require('./profile-seeds');

const sequelize = require('../config/connection');


//🔥🔥🔥Seeding Function🔥🔥🔥 
const seedAll = async () => {
  
await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedaccounts();
  console.log('\n----- accountS SEEDED -----\n');

  await seedprofiles();
  console.log('\n----- profileS SEEDED -----\n');

  process.exit(0);
};

seedAll();
