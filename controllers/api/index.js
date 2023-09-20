const router = require('express').Router();

const createaccountRoutes = require('./createaccountRoutes');
const createprofileRoutes = require('./createprofileRoutes');
const editprofileRoutes = require('./editprofileRoutes');
const existingaccountRoutes = require('./existingaccountRoutes');
const likesRoutes = require('./likes');

router.use('/createAccount', createaccountRoutes);
router.use('/profileCreate', createprofileRoutes);
router.use('/editprofile', editprofileRoutes);
router.use('/existingaccount', existingaccountRoutes);
router.use('/likes', likesRoutes); 

module.exports = router;