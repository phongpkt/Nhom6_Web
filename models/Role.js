var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpktgch210005:TtIDbt2fvGoJukO8@cluster0.unxefp9.mongodb.net/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user : [{type: ObjectId, ref:"Users"}]
})

module.exports = mongoose.model('Roles', RoleSchema);