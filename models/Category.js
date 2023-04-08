var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpktgch210005:TtIDbt2fvGoJukO8@cluster0.unxefp9.mongodb.net/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const CategorySchema = new Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    ideas: [{type: ObjectId, ref:"Ideas"}],
    ideaDeadline: {type: Date},
    commentDeadline: {type: Date},
    deadlineDescription: {type: String}
    // author: {type: ObjectId, ref:"User"}
})

module.exports = mongoose.model('Categories', CategorySchema);