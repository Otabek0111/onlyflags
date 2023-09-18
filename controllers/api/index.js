const router = require('express').Router();

const createAccountRoutes = require('./createAccountRoutes');
const createProfileRoutes = require('./createProfileRoutes.js');
const editProfileRoutes = require('./editProfileRoutes');
const existingAccountRoutes = require('./existingAccountRoutes.js');
const likesRoutes = require('./likes');

router.use('/createAccount', createAccountRoutes);
router.use('/profileCreate', createProfileRoutes);
router.use('/editProfile', editProfileRoutes);
router.use('/existingAccount', existingAccountRoutes);
router.use('/likes', likesRoutes); 

module.exports = router;