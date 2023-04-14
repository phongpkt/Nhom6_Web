const CsvParser = require('json2csv').Parser;
const Category = require('../../models/Category');
const zipLocal = require('zip-local');
// const path = require('/public/uploads');

exports.downloadView = async(req, res) => {
    const query = await Category.find()
    res.render('downloadCSV', {'category':query});
}

//download [get]
exports.downloadMbP = async (req, res) => {
    res.download('./public/uploads/Mobilephone.csv')
};
exports.downloadInfs = async (req, res) => {
    res.download('./public/uploads/Infrastructure.csv')
};
exports.downloadIndt = async (req, res) => {
    res.download('./public/uploads/Industry.csv')
};
exports.downloadZip = async (req, res) => {
    const file_after_download = 'downloaded_file.zip';
    const download = zipLocal.sync.zip('./public/uploads').compress().save(file_after_download);
    var msg = 'Download zip successfully!!'
    const query = await Category.find()
    res.render('downloadCSV', {'category':query, 'msg':msg});
}