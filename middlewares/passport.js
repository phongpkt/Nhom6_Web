const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;

//verify signup

const User = require("../models/User");

const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            //Check user login

            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        console.log("wrong email");
                        return done();
                    }

                    //Match Password

                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log("Wrong password");
                            return done();
                        }
                    });
                })
                .catch((error) => console.log(error));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try
        {
            const user = await User.findById(id)
            // console.log("successfully logged in!")
            done(null, user)
        }
        catch(err) {
            done(err);
        }
    });
};

module.exports = {
    loginCheck,
};