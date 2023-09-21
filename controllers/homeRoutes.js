const router = require('express').Router();
const { profile, account } = require('../models');
const isAuthenticated = require('../utils/auth'); // Import the middleware

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/createAccount', (req, res) => {
  res.render('createAccount');
});

router.get('/profileCreate', (req, res) => {
  res.render('profileCreate');
});

router.get('/existingaccount/login', (req, res) => {
  res.render('signin');
});

// router.get('/dashboard/:accountId', async (req, res) => {
//   try {
//     const dbProfileData = await profile.findByPk(req.params.accountId);
//     console.log(dbProfileData);
//     if (!dbProfileData) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
//     const foundProfile = dbProfileData.get({ plain: true });
//     res.render('dashboard', { profile: foundProfile });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/dashboard/random', async (req, res) => {
      try {
        // Retrieve 5 most recent profiles based on some 'createdAt' or 'updatedAt' column
        const recentProfiles = await profile.findAll({
          limit: 5, 
          order: [['createdAt', 'ASC']], // or use 'updatedAt' or any column that you use for timekeeping
        });
    
        if (!recentProfiles.length) {
          return res.status(404).json({ error: 'No recent profiles found' });
        }
    
        // Randomly select one of the profiles
        const randomProfile = recentProfiles[Math.floor(Math.random() * recentProfiles.length)];
    
        const foundProfile = randomProfile.get({ plain: true });
    
        res.render('dashboard', { profile: foundProfile });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
    

router.get('/matches', (req, res) => {
  res.render('matches');
});

router.get('/profileUpdate', (req, res) => {
  res.render('profileUpdate');
});

router.get('/editprofile', ensureAuthenticated, async (req, res) => {
  try {
    const profileData = await profile.findOne({ where: { accountId: req.user.id } });
    if (!profileData) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    const editableProfile = profileData.get({ plain: true });
    res.render('profileUpdate', { profile: editableProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
});

router.get('/home', async (req, res) => {
  try {
    const accountData = await account.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });
    const accounts = accountData.map(accountInstance => accountInstance.get({ plain: true }));
    res.render('homepage', { accounts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

// const { profile, account, like } = require('../models');
// const isAuthenticated = require('../utils/auth'); // Import the middleware
// // const profileData = require('../seeds/profile-seeds'); // Import your data

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//       return next();
//   } else {
//       return res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// // class accountidGenerator {
// //   generateaccountId() {
// //       const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 100
// //       return randomNum;
// // }
// //  //test
// // }

// // const generator = new accountidGenerator();
// // const accountid = generator.generateaccountId();

// router.get('/', (req, res) => {
//   res.render('home');
// });

// router.get('/createAccount', (req, res) => {
//   res.render('createAccount'); // Use the correct handlebars file name
// });

// router.get('/profileCreate', (req, res) => {
//   res.render('profileCreate');
// });

// router.get('/existingaccount/login', (req, res) => {
//   res.render('signin');
// });

// router.get('/dashboard/:id', async (req, res) => {
//   try {
//     // Fetch all profiles from the database

//     const dbprofilesData = await profile.findByPk(req.params.id, {
//       include: [
//         {
//           model: profile,
//           attributes: [
//             'id', 
//             'accountid',
//             'age',
//             'first_name',
//            'last_name',
//             // gender,
//             // pronouns,
//             'location',
//             'green_flag',
//             'yellow_flag',
//             'red_flag',
//           ],
//         },
//       ],
//     });

//     const foundprofile = dbprofilesData.get({ plain: true });
//     res.render('profile', { foundprofile });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


// // const profileData = await profile.findAll();
    
// //     const profiles = profileData.map((profile) => 
// //     profile.get({ plain: true })
// //     );
    
// //     console.log(profiles);

// //     // Render the 'dashboard' template and pass the 'profiles' data to it
// //     res.render('dashboard', { profiles });
// //   } catch (error) {
// //     // Handle any errors that occur during the database query
// //     console.error('Error fetching profiles:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// router.get('/matches', (req, res) => {
//   res.render('matches');
// });

// router.get('/profileUpdate', (req, res) => {
//   res.render('profileUpdate');
// });

// router.get('/editprofile', ensureAuthenticated, async (req, res) => {
//   try {
//       const profileData = await profile.findOne({ where: {accountId: req.user.id} });

//       if (!profileData) {
//           return res.status(404).json({ error: 'profile not found' });
//       }

//       const profile = profileData.get({ plain: true });
//       res.render('profileUpdate', { profile });

//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal error" });
//   }
// });

// router.get('/home', async (req, res) => {
//   try {
//     // Get all accounts, sorted by name
//     const accountData = await account.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     // Serialize account data so templates can read it
//     const accounts = accountData.map((account) => account.get({ plain: true }));

//     // Pass serialized data into Handlebars.js template
//     res.render('homepage', { accounts });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;