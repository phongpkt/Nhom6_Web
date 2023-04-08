const passport = require("passport");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const Role = require("../../models/Role");
const Idea = require("../../models/Idea");

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

//Register View
exports.registerView = async (req, res) => {
  const role = await Role.find()
  res.render("user/register", {'role':role});
};
//Post Request for Register
exports.registerUser = async (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  const role = req.body.Role

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
    });
    //Password Hashing
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(res.redirect("/login"))
          .catch((err) => console.log(err));
      })
    );
    const userid = newUser._id
    await Role.findById(role)
    .updateOne
    ({
      $push:{user : userid}
    })
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
    user.deleteOne();
    res.redirect('/userIndex');
  }
}