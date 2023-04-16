const Idea = require("../../models/Idea");
const Category = require("../../models/Category");
const Department = require("../../models/Department");
const User = require("../../models/User");
const ChartData = require("../../models/ChartData");


exports.dashboard = async (req, res) => {
    const user = req.user
    const idea = await Idea.find()
    const category = await Category.find()
    const department = await Department.find()
    const userList = await User.find()

    //=================== Chart js =========================
    const labels = [];
    const values = [];

    department.forEach((item) => {
        labels.push(item.name);
        values.push(item.ideas.length);
    });
    res.render('ideas/dashboard', {'idea':idea, 'user':user, 
    'category':category, 'department':department, 'userList':userList,
    'labels':labels, 'values':values});
}
