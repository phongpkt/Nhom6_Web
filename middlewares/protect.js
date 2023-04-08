const User = require('../models/User')
const Role = require('../models/Role')
//neu chua login
exports.protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Please log in to continue');
    res.redirect('/login');
}