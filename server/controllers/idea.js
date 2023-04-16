const IdeaModel = require('../../models/Idea')
const User = require('../../models/User');
const CatModel = require('../../models/Category');
const Department = require('../../models/Department')
const { now } = require('mongoose');
const nodemailer = require('nodemailer');
// const path = require("path");

//setting transporters
const transporterQAC = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 2525,
    auth: {
        user: 'duongpercy410s@gmail.com',
        pass: 'nqft drkb gdlb elty'
    }
});

const transporterStaff = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 2525,
    auth: {
        user: 'phongthanhPo@gmail.com',
        pass: 'aqkc gnxm cmzs kwjj'
    }
});

exports.view = async (req, res) => {
    var page = req.query.page
    const user = req.user
    // console.log(user.department)
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

exports.createForm = async (req, res) => {
    const user = req.user;
    const cat = await CatModel.find()
    res.render('ideas/create-idea', {'category' : cat, 'user' : user})
}

exports.createIdea = async (req, res) => {
    const newIdea = new IdeaModel()
    newIdea.title = req.body.txtTitle
    newIdea.content = req.body.txtContent
    newIdea.category = req.body.category
    newIdea.author = req.user._id
    newIdea.department = req.user.department
    const Ideaid = newIdea._id
    const category = await CatModel.findById(req.body.category)
    
    //formating date
    let year = category.ideaDeadline.getFullYear();
    let month = ("0" + (category.ideaDeadline.getMonth() + 1)).slice(-2);
    let day = ("0" + category.ideaDeadline.getDate()).slice(-2);

    if (newIdea.date > category.ideaDeadline) {
        var msg = 'You cannot create a new idea after the deadline: ' + year + "-" + month + "-" + day
        const query = await IdeaModel.find().limit(5)
        const user = req.user
        res.render('home', {'idea':query, 'user':user, 'msg':msg})
    }
    else{
        newIdea.save()
        await CatModel.findById(req.body.category).updateOne({$push:{ideas:Ideaid}})
        await User.findById(req.user._id).updateOne({$push:{ideas:Ideaid}})
        await Department.findById(req.user.department).updateOne({$push:{ideas:Ideaid}})
        res.redirect('/')
    }
    const date = new Date(now())
    let year1 = date.getFullYear();
    let month1 = ("0" + (date.getMonth() + 1)).slice(-2);
    let day1 = ("0" + date.getDate()).slice(-2);

    //Sending Email
    // const mailIdea = {
    //     to: 'duongpercy410s@gmail.com',
    //     subject: 'New Idea',
    //     text: 'A new idea has been created by ' + req.user.name + ' on ' + day1 + '-' + month1 + '-' + year1
    // }
    // transporterQAC.sendMail(mailIdea, function(err, info) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('Success');
    //     }
    // });
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
    const query = await IdeaModel.findById(id).populate('category')
    const category = await CatModel.findById(query.category)
    //formating date
    let year = category.commentDeadline.getFullYear();
    let month = ("0" + (category.commentDeadline.getMonth() + 1)).slice(-2);
    let day = ("0" + category.commentDeadline.getDate()).slice(-2);
    var msg = 'Comments deadline: ' + day + '-' + month + '-' + year;


    res.render('ideas/comment', {'idea':query, 'user':user, 'msg':msg});
}

exports.comment = async (req, res) => {
    const id = req.body.id
    const idea = await IdeaModel.findById(id)
    const comment = {
        text: req.body.comment,
        postedBy: req.user.name,
    }
    const category = await CatModel.findById(req.body.catId)
    const date = new Date(now())
    
    //formating date
    let year = category.commentDeadline.getFullYear();
    let month = ("0" + (category.commentDeadline.getMonth() + 1)).slice(-2);
    let day = ("0" + category.commentDeadline.getDate()).slice(-2);

    if (date < category.commentDeadline){
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
    else {
        // console.log('Comments out of date!')
        var msg = 'You cannot create comments after the deadline: ' + year + '-' + month + '-' + day
        const query = await IdeaModel.find().limit(5)
        const user = req.user
        res.render('home', {'idea':query, 'user':user, 'msg':msg})
    }
    const date1 = new Date(now())
    let year1 = date1.getFullYear();
    let month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    let day1 = ("0" + date1.getDate()).slice(-2);

    //Sending Email
    const mailComment = {
        to: 'phongthanhPo@gmail.com',
        subject: 'New Comment!',
        text: 'A new comment has been created by: ' + req.user.name + ' on ' + day1 + '-' + month1 + '-' + year1 + ' Comment message: ' + comment.text,
    }
    transporterStaff.sendMail(mailComment, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Success');
        }
    });

}
