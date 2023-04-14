const User = require("../models/User");
const Role = require("../models/Role");

exports.isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const role = await Role.findById(user.role);

    // console.log("Role: " + role.name)

    if (role.name == "Admin") {
        return next();
    }
    else{
        msg = "Please logged in as Admin!"
        res.render("home", {"msg": msg, "user":user});
    }
};
exports.isCoordinator = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const role = await Role.findById(user.role);

    // console.log("Role: " + role.name)

    if (role.name == "Coordinator") {
        return next();
    }
    else{
        msg = "Please logged in as Coordinator!"
        res.render("home", {"msg": msg, "user":user});
    }
};
exports.isManager = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const role = await Role.findById(user.role);

    // console.log("Role: " + role.name)

    if (role.name == "Manager") {
        return next();
    }
    else{
        msg = "Please logged in as Manager!"
        res.render("home", {"msg": msg, "user":user});
    }
};
exports.isStaff = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const role = await Role.findById(user.role);

    // console.log("Role: " + role.name)

    if (role.name == "Staff") {
        return next();
    }
    else{
        msg = "Please logged in as Staff!"
        res.render("home", {"msg": msg, "user":user});
    }
};