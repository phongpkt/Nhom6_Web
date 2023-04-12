const CatModel = require('../../models/Category')

exports.view = async (req, res)=>{
    const query = await CatModel.find().populate('ideas')
    const user = req.user
    res.render('categories/index', {'category':query, 'user':user})
}

exports.createForm = (req, res) => {
    const user = req.user
    res.render('categories/create-cat', {'user':user})
}

exports.createCat = (req, res) => {
    var newCategory = new CatModel()
    newCategory.name = req.body.txtName
    newCategory.description = req.body.txtDescription
    newCategory.save().then(function (err) {
        if (err) 
        { 
            console.log(err) 
        }
    })
    res.redirect('/categoryIndex')
}

exports.editCat = async (req, res) => {
    const id = req.query.id
    var cat = await CatModel.findById(id)
    res.render('categories/edit-cat', {'category' : cat})
}

exports.updateCat = async (req, res) => {
    const id = req.body.id
    const name = req.body.txtName
    const description = req.body.txtDescription
    try {
        const cat = await CatModel.findById(id)
        cat.name = name
        cat.description = description
        cat.save()
        console.log("category updated successfully")
        res.redirect('/')
    } catch(error) {
        console.log(error)
    }
}

exports.deleteCat = async (req, res) => {
    const id = req.query.id
    const query = await CatModel.find().populate('ideas')
    const cat = await CatModel.findById(id)
    if(cat.ideas.length > 0) 
    {
        var msg = "Please delete the ideas before you remove the category!"
        res.render('categories/index', {'category':query, 'msg':msg})
        //console.log("Please delete the ideas before you remove the category!")
    }
    else
    {
        cat.deleteOne();
        res.redirect('/categoryIndex')
        console.log("Delete successfully!")
    }
}

exports.editCloseDateForm = async (req, res) => {
    const query = await CatModel.find();
    res.render('categories/editCloseDate', {'category':query})
}
exports.editCloseDate = async (req, res) => {
    const id = req.body.category
    const description = req.body.description
    const ideaDeadline = req.body.deadlineIdea
    const commentDeadline = req.body.deadlineComment
    try {
        const cat = await CatModel.findById(id)
        cat.deadlineDescription = description
        cat.ideaDeadline = ideaDeadline
        cat.commentDeadline = commentDeadline
        cat.save()
        console.log("Deadline updated successfully")
        res.redirect('/')
    }
    catch(error) {
        console.log(error)
    }
}
