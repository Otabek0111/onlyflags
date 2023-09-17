//can only be accessed by authenticated Accounts

const router = require('express').Router();
const isAuthenticated = require('../utils/auth');
const existingAccountRoutes = require('./api/existingAccountRoutes');

//protected dashboard route accessible to authenticated Accounts
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard');
});

router.use('/protected/existingAccount', existingAccountRoutes);

module.exports = router;