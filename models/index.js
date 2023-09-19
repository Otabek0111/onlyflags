const Profile = require('./profile');
const Account = require('./account');

//establishes relationships
Account.hasOne(Profile, {
  foreignKey: 'AccountId',
  // onDelete: 'CASCADE'
});

Profile.belongsTo(Account, {
  foreignKey: 'AccountId',
});

module.exports = {
  Profile, 
  Account,
};