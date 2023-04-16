var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema.Types
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpktgch210005:TtIDbt2fvGoJukO8@cluster0.unxefp9.mongodb.net/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const DepartmentSchema = new Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    staff: [{type:ObjectId, ref:"Users"}],
    ideas: [{type:ObjectId, ref:"Ideas"}]
})

module.exports = mongoose.model('Departments', DepartmentSchema);