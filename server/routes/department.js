const express = require('express')
const router = express.Router();
const {
    isAdmin,
    isCoordinator,
    isManager
} = require("../../middlewares/authJwt")
const departmentController = require('../controllers/department')

router.get('/departmentIndex', departmentController.index);
router.get('/createDepartment', departmentController.createForm);
router.post('/createDepartment', departmentController.createDept);
router.get('/deleteDepartment?:id', departmentController.deleteDept)

module.exports = router;