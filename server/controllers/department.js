const Department = require('../../models/Department')

exports.index = async (req, res)=>{
    const query = await Department.find()
    .populate('staff')
    const user = req.user
    res.render('departments/index', {'department':query, 'user':user})
}

exports.createForm = (req, res) => {
    const user = req.user
    res.render('departments/create-department', {'user':user})
}

exports.createDept = (req, res) => {
    var newDept = new Department()
    newDept.name = req.body.txtName
    newDept.description = req.body.txtDescription
    newDept.save().then(function (err) {
        if (err) 
        { 
            console.log(err) 
        }
    })
    res.redirect('/departmentIndex')
}

// exports.editDept = async (req, res) => {
//     const id = req.query.id
//     const dept = await Department.findById(id)
//     res.render('department/edit-department', {'departments' : dept})
// }

// exports.updateDept = async (req, res) => {
//     const id = req.body.id
//     const name = req.body.txtName
//     const description = req.body.txtDescription
//     try {
//         const dept = await Department.findById(id)
//         dept.name = name
//         dept.description = description
//         dept.save()
//         res.redirect('/')
//     } catch(error) {
//         console.log(error)
//     }
// }

exports.deleteDept = async (req, res) => {
    const id = req.query.id
    const query = await Department.find().populate('staff')
    const dept = await Department.findById(id)
    if(dept.staff.length > 0) 
    {
        var msg = "Please remove the staff before you remove the department!"
        res.render('departments/index', {'department':query, 'msg':msg})
        //console.log("Please delete the ideas before you remove the category!")
    }
    else
    {
        dept.deleteOne();
        res.redirect('/departmentIndex')
        console.log("Delete successfully!")
    }
}
