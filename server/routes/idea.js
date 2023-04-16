const express = require('express')
const router = express.Router();
const {protectRoute} = require("../../middlewares/protect");
const { 
    isStaff,
    isManager
} = require("../../middlewares/authJwt")
const ideaController = require('../controllers/idea');
const chartController = require('../controllers/chart');

router.get('/', protectRoute, ideaController.view);

router.get('/dashboard',isManager, chartController.dashboard);

router.get('/sortByLikes', ideaController.sortByLikes);
router.get('/sortByDislikes', ideaController.sortByDislikes);
router.get('/sortByDate', ideaController.sortByDate);


router.get('/likeIdea?:id', ideaController.like)
router.get('/dislikeIdea?:id', ideaController.dislike)

router.get('/commentForm?:id', protectRoute, ideaController.commentForm)
router.post('/comment?:id', ideaController.comment)

router.get('/createIdea', isStaff, ideaController.createForm);
router.post('/createIdea', ideaController.createIdea);

router.get('/editIdea?:id', isManager, ideaController.editIdea);
router.post('/editIdea?:id', ideaController.updateIdea);
router.get('/deleteIdea?:id', isManager, ideaController.deleteIdea)

module.exports = router;