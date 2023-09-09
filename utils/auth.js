// middleware function to check to see if the user is authenticated

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};