const router = require('express').Router();

const createAccountRoutes = require('./createaccountRoutes');
const createProfileRoutes = require('./createprofileRoutes');
const editProfileRoutes = require('./editprofileRoutes');
const existingAccountRoutes = require('./existingAccountRoutes');
const likesRoutes = require('./likes');

router.use('/createAccount', createAccountRoutes);
router.use('/profileCreate', createProfileRoutes);
router.use('/editProfile', editProfileRoutes);
router.use('/existingAccount', existingAccountRoutes);
router.use('/likes', likesRoutes); 

module.exports = router;