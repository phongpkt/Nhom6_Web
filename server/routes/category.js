const express = require('express')
const router = express.Router();
const {protectRoute} = require("../../middlewares/protect");
const {
    isAdmin,
    isCoordinator,
    isManager
} = require("../../middlewares/authJwt")
const catController = require('../controllers/category')

router.get('/categoryIndex', protectRoute, catController.view);
router.get('/editclosedate', protectRoute, isAdmin, catController.editCloseDateForm);
router.post('/editclosedate', catController.editCloseDate);
router.get('/createCategory', isManager, catController.createForm);
router.post('/createCategory', protectRoute, catController.createCat);
router.get('/editCategory?:id', isManager, catController.editCat);
router.post('/editCategory?:id', protectRoute, catController.updateCat);
router.get('/deleteCategory?:id', isManager, catController.deleteCat)

module.exports = router;