var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://phongpktgch210005:TtIDbt2fvGoJukO8@cluster0.unxefp9.mongodb.net/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const dataSchema = new Schema({
    label: [{ type: String }],
    value: [{ type: Number }]
});

const Data = mongoose.model('ChartData', dataSchema);

module.exports = Data;
