const express = require('express')
const router = express.Router();
const {
    isAdmin,
    isCoordinator,
    isManager
} = require("../../middlewares/authJwt")
const catController = require('../controllers/category')

router.get('/categoryIndex', catController.view);
router.get('/editclosedate', catController.editCloseDateForm);
router.post('/editclosedate', catController.editCloseDate);
router.get('/createCategory', catController.createForm);
router.post('/createCategory', catController.createCat);
router.get('/editCategory?:id', catController.editCat);
router.post('/editCategory?:id', catController.updateCat);
router.get('/deleteCategory?:id', catController.deleteCat)

module.exports = router;