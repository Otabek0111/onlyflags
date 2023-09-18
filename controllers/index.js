const router = require('express').Router(); 
const homeRoutes = require('./homeRoutes');
const protectedRoutes = require('./protectedRoutes')
const apiRoutes = require('./api');
const createProfileRoutes = require('./api/createProfileRoutes');


// router.use('/profileCreate', createProfileRoutes);


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/protected', protectedRoutes);

// router.use('/', apiRoutes)
module.exports = router;
