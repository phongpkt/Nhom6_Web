const express = require('express')
const router = express.Router();
const {protectRoute} = require("../../middlewares/protect");
const ideaController = require('../controllers/idea')
// const fileUpload = require("express-fileupload");
// const filesPayloadExists = require('../../middlewares/filesPayloadExists');
// const fileExtLimiter = require('../../middlewares/fileExtLimiter');
// const fileSizeLimiter = require('../../middlewares/fileSizeLimiter');

// router.get('/', protectRoute, ideaController.view);
router.get('/', ideaController.view);

router.get('/sortByLikes', ideaController.sortByLikes);
router.get('/sortByDislikes', ideaController.sortByDislikes);
router.get('/sortByDate', ideaController.sortByDate);
// router.get('/', protectRoute, ideaController.view);
router.get('/likeIdea?:id', ideaController.like)
router.get('/dislikeIdea?:id', ideaController.dislike)

// router.get('/ideaDetail?:id', ideaController.ideaDetail);

router.get('/commentForm?:id', ideaController.commentForm)
router.post('/comment?:id', ideaController.comment)

router.get('/createIdea', ideaController.createForm);
router.post('/createIdea', ideaController.createIdea);

router.get('/editIdea?:id', ideaController.editIdea);
router.post('/editIdea?:id', ideaController.updateIdea);
router.get('/deleteIdea?:id', ideaController.deleteIdea)

module.exports = router;