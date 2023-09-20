// middleware function to check to see if the user is authenticated

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.session && req.session.account_id) {
            req.account = { id: req.session.account_id };
        }
        return next();
    }
    res.redirect('/login');
};