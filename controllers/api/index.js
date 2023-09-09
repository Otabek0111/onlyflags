const router = require('express').Router();

const createaccountRoutes = require('./createaccountRoutes');
const createprofileRoutes = require('./createprofileRoutes');
const editprofileRoutes = require('./editprofileRoutes');
const existingaccountRoutes = require('./existingaccountRoutes');

router.use('/createaccount', createaccountRoutes);
router.use('/createprofile', createprofileRoutes);
router.use('/editprofile', editprofileRoutes);
router.use('/existingaccount', existingaccountRoutes);

module.exports = router;