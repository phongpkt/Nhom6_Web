const express = require('express')
const router = express.Router();
const {
    isAdmin,
    isCoordinator,
} = require("../../middlewares/authJwt")
const departmentController = require('../controllers/department')

router.get('/departmentIndex', departmentController.index);
router.get('/createDepartment', isCoordinator, departmentController.createForm);
router.post('/createDepartment', departmentController.createDept);
router.get('/deleteDepartment?:id', isCoordinator, departmentController.deleteDept)

module.exports = router;