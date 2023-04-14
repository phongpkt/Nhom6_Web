const express = require('express');
const {protectRoute} = require("../../middlewares/protect");
const {
    isAdmin
} = require("../../middlewares/authJwt")
const userController = require("../controllers/user");
const router = express.Router();

// router.get('/', protectRoute, userController.dashboardView);
// router.get('/userIndex', isAdmin, userController.index)
router.get('/userIndex', isAdmin, userController.index)
router.get('/userInfor', protectRoute, userController.infor)

router.get('/deleteUser', isAdmin, userController.deleteUser)
router.get('/logout',  userController.loginView)
router.get('/login', userController.loginView);
router.post('/login', userController.loginUser);
router.get('/register', isAdmin, userController.registerView)
router.post('/register', userController.registerUser);

module.exports = router;
