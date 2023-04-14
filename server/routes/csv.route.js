const express = require('express')
const router = express.Router();
const {
    isManager
} = require("../../middlewares/authJwt")
const csvController = require('../controllers/csv.controller')

router.get('/downloadAllCSV', isManager, csvController.downloadView);
router.get('/downloadIndt', csvController.downloadIndt);
router.get('/downloadInfs', csvController.downloadInfs);
router.get('/downloadMbP', csvController.downloadMbP);
router.get('/downloadZip', csvController.downloadZip);



module.exports = router;