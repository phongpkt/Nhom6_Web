const passport = require("passport");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const Role = require("../../models/Role");
const Department = require("../../models/Department");

//For home page
exports.dashboardView = (req, res) => {
  const user = req.user;
  res.render("home", {'user' : user});
}

//For index page
exports.index = async (req, res) => {
  const user = req.user;
  const userList = await User.find()
  .populate('ideas')
  .populate('role')
  res.render("user/index", {'user':user,'userList' : userList});
}

//For infor page
exports.infor = async (req, res) => {
  const query = req.user;
  const user = await User.findById(query.id)
  .populate('role')
  .populate('department')
  res.render("user/user_infor", {'user':user});
}

//Register View
exports.registerView = async (req, res) => {
  const role = await Role.find()
  const dept = await Department.find()
  res.render("user/register", {'role':role, 'department':dept});
};
//Post Request for Register
exports.registerUser = async (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  const role = req.body.Role
  const department = req.body.Department

  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  //Confirm Passwords
  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    const newUser = new User({
      name,
      email,
      location,
      password,
      role,
      department,
    });
    //Password Hashing
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .catch((err) => console.log(err));
      })
    );
    const userid = newUser._id
    const RoleModel = await Role.findById(role)
    await Role.findById(role)
    .updateOne
    ({
      $push:{user : userid}
    });
    if(RoleModel.name == "Staff" || RoleModel.name == "Coordinator")
    {
      await Department.findById(department)
      .updateOne
      ({
        $push:{staff : userid}
      })
      console.log("Saved user in department")
    }
    res.redirect('/login')
  }
};

// Login View
exports.loginView = (req, res) => {
  res.render("login", {});
};
//Logging in Function
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
}

//delete user
exports.deleteUser = async (req, res) => {
  var msg
  const id = req.query.id
  const user = await User.findById(id)
  const RoleId = user.role
  const DeptId = user.department
  if(user.ideas.length > 0)
  {
    msg = 'Please delete the ideas before remove the user';
    const user = req.user;
    const userList = await User.find()
    .populate('ideas')
    .populate('role')
    res.render("user/index", {'user':user,'userList' : userList, 'msg':msg});
  }
  else
  {
    await Role.findById(RoleId).updateOne({$pull:{user:user._id}});
    await Department.findById().updateOne({$pull:{user:user._id}});
    user.deleteOne();
    res.redirect('/userIndex');
  }
}