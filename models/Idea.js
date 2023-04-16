var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpktgch210005:TtIDbt2fvGoJukO8@cluster0.unxefp9.mongodb.net/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const IdeaSchema = new Schema({
    title: {type:String, required: true},
    content: {type:String, required: true},
    date: {type:Date, default: Date.now},
    category: {type: ObjectId, ref:"Categories"},
    department: {type: ObjectId, ref:"Departments"},
    author: {type: ObjectId, ref:"Users"},
    like_count: {type:Number, default: 0, required: true},
    user_likes: [{type:ObjectId, ref:"User"}],
    comments: 
    [{
        postedBy: {type: String},
        text: {type: String},
        date: {type: Date,default: Date.now}
    }]
})

module.exports = mongoose.model('Ideas', IdeaSchema);