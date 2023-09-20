//can only be accessed by authenticated accounts

const router = require('express').Router();
const isAuthenticated = require('../utils/auth');
const existingaccountRoutes = require('./api/existingaccountRoutes');

//protected dashboard route accessible to authenticated accounts
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard');
});

router.use('/protected/existingaccount', existingaccountRoutes);

module.exports = router;