const Profile = require('./Profile');
const Account = require('./Account');

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