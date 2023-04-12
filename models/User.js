var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpktgch210005:TtIDbt2fvGoJukO8@cluster0.unxefp9.mongodb.net/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: "Viet Nam",
    },
    ideas: [{type: ObjectId, ref:"Ideas"}],
    role: {type: ObjectId, ref: "Roles"},
    department: {type: ObjectId, ref: "Departments"}
})

module.exports = mongoose.model('Users', UserSchema);