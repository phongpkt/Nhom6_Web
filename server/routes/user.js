const express = require('express');
const {protectRoute} = require("../../middlewares/protect");
const {
    isAdmin,
    isCoordinator,
    isManager
} = require("../../middlewares/authJwt")
const userController = require("../controllers/user");
const router = express.Router();

// router.get('/', protectRoute, userController.dashboardView);
// router.get('/userIndex', isAdmin, userController.index)
router.get('/userIndex', userController.index)
router.get('/deleteUser', userController.deleteUser)
router.get('/logout',  userController.loginView)
router.get('/login', userController.loginView);
router.post('/login', userController.loginUser);
router.get('/register', userController.registerView)
router.post('/register', isAdmin, userController.registerUser);

module.exports = router;