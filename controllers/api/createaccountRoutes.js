const router = require('express').Router();
const { Account, Like, Profile } = require('../../models');
const bcrypt = require('bcrypt');

// POST request to handle form submission
router.post('/createAccount', async (req, res) => {
    try {
        const existingAccount = await Account.findOne({ where: { email: req.body.email } });

        if (existingAccount) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // generate a salt and hash password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newAccount = await Account.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // log in automatically after registration
        req.session.save(() => {
            req.session.user_id = newAccount.id;
            req.session.logged_in = true;

            // render the profileCreate.handlebars view upon successful registration
            res.render('profileCreate'); 
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400);
        }
        res.status(500).json(err);
    }
});

module.exports = router;
