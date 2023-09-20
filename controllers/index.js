const router = require('express').Router(); 
const homeRoutes = require('./homeRoutes');
const protectedRoutes = require('./protectedRoutes')
const apiRoutes = require('./api');
const createprofileRoutes = require('./api/createprofileRoutes');


// router.use('/profileCreate', createprofileRoutes);


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/protected', protectedRoutes);
router.use('/profileCreate', createprofileRoutes);

// router.use('/', apiRoutes)
module.exports = router;
