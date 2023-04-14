const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express()
const URL = "mongodb+srv://phongpktgch210005:TtIDbt2fvGoJukO8@cluster0.unxefp9.mongodb.net/test";

//day tao Role cho DB
const Role = require('./models/Role');
const RoleData = [{
    name: "Admin"
},{
    name:"Coordinator"
},{
    name:"Manager"
},{
    name:"Staff"
}]

const passport = require('passport')
const { loginCheck } = require('./middlewares/passport')
loginCheck(passport);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bootstrap",express.static(__dirname + "/node_nodemodules/boostrap/dist"))
app.set('view engine', 'hbs')

//connect to MongoDb
mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("err", err);
        process.exit();
    });

// Role.insertMany(RoleData)
// .then(() => {
//     console.log("Saved Roles Successfully");
// })
// .catch(error => {
//     console.log(error); //Role da ton tai se bi loi duplicate
// })


app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Routes
const ideas = require('./server/routes/idea');
app.use('/', ideas);

const categories = require('./server/routes/category');
app.use('/', categories);

const downloadCSV = require('./server/routes/csv.route');
app.use('/', downloadCSV);

const departments = require('./server/routes/department');
app.use('/', departments);

const users = require('./server/routes/user');
app.use('/', users);

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running at: " + PORT)