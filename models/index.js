const profile = require('./profile');
const account = require('./account');

//establishes relationships
account.hasOne(profile, {
  foreignKey: 'accountId',
  // onDelete: 'CASCADE'
});

profile.belongsTo(account, {
  foreignKey: 'accountId',
});

module.exports = {
  profile, 
  account,
};