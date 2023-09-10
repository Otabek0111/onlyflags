const router = require('express').Router();
const homeRoutes = require('.homeRoutes');
const protectedRoutes = require('.protectedRoutes');

router.use('/home', homeRoutes);
router.use('/protected', protectedRoutes);
module.exports = router;