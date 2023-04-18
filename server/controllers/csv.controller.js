const Category = require('../../models/Category');
const AdmZip = require('adm-zip');
const fs = require('fs');

exports.downloadView = async(req, res) => {
    const query = await Category.find()
    res.render('downloadCSV', {'category':query});
}

//download
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
    const zip = new AdmZip();
    zip.addLocalFile('./public/uploads/Mobilephone.csv');
    zip.addLocalFile('./public/uploads/Infrastructure.csv');
    zip.addLocalFile('./public/uploads/Industry.csv');
    const zipData = zip.toBuffer();
    fs.writeFileSync('./public/uploads/downloaded_file.zip', zipData);

    res.download('./public/uploads/downloaded_file.zip')
}