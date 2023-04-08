const IdeaModel = require('../../models/Idea')
const User = require('../../models/User');
const CatModel = require('../../models/Category');
// const path = require("path");

exports.view = async (req, res) => {
    var page = req.query.page
    const user = req.user
    if (page == 1){
        const query = await IdeaModel.find().limit(5)
        res.render('home', {'idea':query, 'user':user})
    }else if (page == 2){
        const query = await IdeaModel.find().skip(5).limit(5)
        res.render('home', {'idea':query, 'user':user})
    }else{
        const query = await IdeaModel.find()
        res.render('home', {'idea':query, 'user':user})
    }
}

exports.sortByLikes = async (req, res) => {
    const user = req.user
    const idea = await IdeaModel.find().sort({like_count: -1})
    res.render('home', {'idea':idea, 'user':user})
}

exports.sortByDislikes = async (req, res) => {
    const user = req.user
    const idea = await IdeaModel.find().sort({like_count: 1})
    res.render('home', {'idea':idea, 'user':user})
}

exports.sortByDate = async (req, res) => {
    const user = req.user
    const idea = await IdeaModel.find().sort({date : -1})
    res.render('home', {'idea':idea, 'user':user})
}

// exports.ideaDetail = async (req, res)=>{
//     const id = req.query.id
//     const user = req.user;
//     const query = await IdeaModel.findById(id)
//     .populate('category')
//     .populate('author')
//     .populate('comments.postedBy')
//     res.render('ideas/view-idea', {'idea':query, 'user':user})
// }

exports.createForm = async (req, res) => {
    const user = req.user;
    const cat = await CatModel.find()
    res.render('ideas/create-idea', {'category' : cat, 'user' : user})
}

exports.createIdea = async (req, res) => {
    // const files = req.files
    const newIdea = new IdeaModel()
    newIdea.title = req.body.txtTitle
    newIdea.content = req.body.txtContent
    newIdea.category = req.body.category
    newIdea.author = req.user._id
    const Ideaid = newIdea._id
    const category = await CatModel.findById(req.body.category)
    if (newIdea.date > category.ideaDeadline) {
        var msg = 'You cannot create a new idea after the deadline:' + category.ideaDeadline
        const query = await IdeaModel.find().limit(5)
        const user = req.user
        res.render('home', {'idea':query, 'user':user, 'msg':msg})
    }
    else{
        newIdea.save()
        await CatModel.findById(req.body.category).updateOne({$push:{ideas:Ideaid}})
        await User.findById(req.user._id).updateOne({$push:{ideas:Ideaid}})
        res.redirect('/')
    }
}

exports.editIdea = async (req, res) => {
    const id = req.query.id
    var idea = await IdeaModel.findById(id)
    var cat = await CatModel.find()
    res.render('ideas/edit-idea', {'idea' : idea, 'category' : cat})
}

exports.updateIdea = async (req, res) => {
    const id = req.body.id
    const title = req.body.txtTitle
    const content = req.body.txtContent
    const catId = req.body.category
    const author = req.user._id
    try {
        const idea = await IdeaModel.findById(id)
        idea.title = title
        idea.content = content
        idea.category = catId
        idea.author = author
        idea.save()
        console.log("idea updated successfully")
        res.redirect('/')
    } catch(error) {
        console.log(error)
    }
}

exports.deleteIdea = async (req, res) => {
    const id = req.query.id
    const idea = await IdeaModel.findById(id)
    const catID = idea.category
    const userID = idea.author
    idea.deleteOne();

    await CatModel.findById(catID).updateOne({ $pull:{ideas:idea._id} })
    await User.findById(userID).updateOne({ $pull:{ideas:idea._id} })
    res.redirect('/')
}

exports.like = async (req, res) => {
    const id = req.query.id
    const user = req.user.id
    let flag = false;

    const idea = await IdeaModel.findById(id)
    idea.user_likes.forEach(element => {
        if(element == user) {
            flag = true;    //duplicate
            return;
        }
    });
    if (flag) {
        console.log('user already liked')
    }
    else {
        console.log('save user likes')
        await IdeaModel.findById(id)
        .updateOne(
            {
                $inc: {like_count:+1},
                $push:{user_likes:user}
            }
        )
    }
    res.redirect('/')
}
exports.dislike = async (req, res) => {
    const id = req.query.id
    const user = req.user.id
    let flag = false

    const idea = await IdeaModel.findById(id)
    idea.user_likes.forEach(element => {
        if(element == user) {
            flag = true;    //decrease like
            return;
        }
    });
    if (!flag) {
        console.log('user has not liked the idea')
    }
    else if(idea.like_count == 0) {
        console.log('cannot dislike idea')
    }
    else {
        console.log('update user likes')
        await IdeaModel.findById(id)
        .updateOne(
            {
                $inc: {like_count:-1},
                $pull:{user_likes:user}
            }
        )
    }
    res.redirect('/')
}

exports.commentForm = async (req, res) => {
    const id = req.query.id
    const user = req.user
    const query = await IdeaModel.findById(id)
    res.render('ideas/comment', {'idea':query, 'user':user})
}

exports.comment = async (req, res) => {
    const id = req.body.id
    const comment = {
        text: req.body.comment,
        postedBy: req.user.name,
    }
    await IdeaModel.findById(id)
    .updateOne(
        {
            $push:{comments:comment}
        }
    ).catch((err) => {
        console.log(err);
    })
    console.log('Comment saved success!')
    res.redirect('/')
}