const router = require('express').Router();
const { account, like, profile } = require('../../models');
const bcrypt = require('bcrypt');

// POST request to handle form submission
router.post('/', async (req, res) => {
    try {
        const existingaccount = await account.findOne({ where: { email: req.body.email } });

        if (existingaccount) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // generate a salt and hash password
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newaccount = await account.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        req.session.account_id = newaccount.id;
        res.redirect('/profileCreate');
        // // log in automatically after registration
        // req.session.save(() => {
        //     session.user_id = newaccount.id;
        //     session.logged_in = true;

        //     // render the profileCreate.handlebars view upon successful registration
            
        // });

        

    } catch (err) {
        console.error(err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400);
        }
        res.status(500).json(err);
    }
});

module.exports = router;
