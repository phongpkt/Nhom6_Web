const express = require('express')
const router = express.Router();
const {protectRoute} = require("../../middlewares/protect");
const { 
    isStaff,
    isManager
} = require("../../middlewares/authJwt")
const ideaController = require('../controllers/idea');
const chartController = require('../controllers/chart');

//home
router.get('/', protectRoute, ideaController.view);

//dashboard
router.get('/dashboard',isManager, chartController.dashboard);

//sorting
router.get('/sortByLikes', ideaController.sortByLikes);
router.get('/sortByDislikes', ideaController.sortByDislikes);
router.get('/sortByDate', ideaController.sortByDate);

//like/dislike
router.get('/likeIdea?:id', ideaController.like)
router.get('/dislikeIdea?:id', ideaController.dislike)

//comment
router.get('/commentForm?:id', protectRoute, ideaController.commentForm)
router.post('/comment?:id', ideaController.comment)

//create
router.get('/createIdea', isStaff, ideaController.createForm);
router.post('/createIdea', ideaController.createIdea);

//edit
router.get('/editIdea?:id', isManager, ideaController.editIdea);
router.post('/editIdea?:id', ideaController.updateIdea);

//delete
router.get('/deleteIdea?:id', isManager, ideaController.deleteIdea)

module.exports = router;