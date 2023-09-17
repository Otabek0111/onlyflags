// middleware function to check to see if the user is authenticated

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.session && req.session.Account_id) {
            req.Account = { id: req.session.Account_id };
        }
        return next();
    }
    res.redirect('/login');
};