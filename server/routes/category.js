const express = require('express')
const router = express.Router();
const {
    isAdmin,
    isCoordinator,
    isManager
} = require("../../middlewares/authJwt")
const catController = require('../controllers/category')

router.get('/categoryIndex', catController.view);
router.get('/editclosedate', isManager, catController.editCloseDateForm);
router.post('/editclosedate', catController.editCloseDate);
router.get('/createCategory', isManager, catController.createForm);
router.post('/createCategory', catController.createCat);
router.get('/editCategory?:id', isManager, catController.editCat);
router.post('/editCategory?:id', catController.updateCat);
router.get('/deleteCategory?:id', isManager, catController.deleteCat)

module.exports = router;