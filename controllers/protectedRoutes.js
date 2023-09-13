//can only be accessed by authenticated users

const router = require('express').Router();
const isAuthenticated = require('../utils/auth');
const existingaccountRoutes = require('./api/existingaccountRoutes');

//protected dashboard route accessible to authenticated users
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard');
});

router.use('/protected/existingaccount', existingaccountRoutes);

module.exports = router;