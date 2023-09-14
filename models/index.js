

const profile = require('./profile');
const account = require('./accounts');

profile.belongsTo(user, {
  foreignKey: 'account_id',
});

module.exports = {
profile, 
user,
};

module.exports = db;

// 🔥🔥🔥 For Models / Table Relationships 🔥🔥🔥 

const profile = require('./profile');
const account = require('./account');

profile.belongsTo(user, {
  foreignKey: 'accountId',
});

module.exports = {
profile, 
user,
};
