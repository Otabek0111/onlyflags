const Profile = require('./Profile');
const Account = require('./Account');

// Establishes relationships
Account.hasOne(Profile, {
  foreignKey: 'AccountId',
  onDelete: 'CASCADE'
});

Profile.belongsTo(Account, { // Change 'user' to 'Account'
  foreignKey: 'AccountId',
});

module.exports = {
  Profile, 
  Account,
};