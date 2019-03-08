var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/website', {useNewUrlParser: true})

var skillSchema = mongoose.Schema({
    skill: {type: String, required: true}
}, {collection: 'skill'})

var eduSchema = mongoose.Schema({
    startTime: String,
    endTime: String,
    title: { type: String, required: true },
    position: { type: String, required: true }
}, {collection: 'education'})

var userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    passWord: { type: String, required: true }
}, {collection: 'users'})

var projectSchema = mongoose.Schema({
    projectName: { type: String, required: true },
    projectType: String,
    projectAbstract: { type: String, required: true },
    projectDetrail: String
},{ collection: 'project'})

var SkillModel = mongoose.model("SkillModel", skillSchema)
var EduModel = mongoose.model("EduModel", eduSchema)
var UserModel = mongoose.model("UserModel", userSchema)
var ProjectModel = mongoose.model("ProjectModel", projectSchema)

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/website/skill",setSkill)
app.get("/api/website/skill",fetchSkill)
app.get("/api/website/edu", fetchEdu)
app.post("/api/website/edu", setEdu)
app.post("/api/website/user", logIn)
app.post("/api/website/project", setProject)
app.get("/api/website/project", fetchProject)

//获取 技能
function setSkill(req,res) {
    var skill = req.body
    SkillModel
        .create(skill)
        .then(
            function() {
                res.json(200)
            },
            function() {
                res.sendStatus(400)
            }
        )
}
//获取 技能
function fetchSkill(req,res) {
    SkillModel
        .find()
        .then(
            function(skills) {
                res.json(skills)
            },
            function() {
                res.sendStatus(400)
            }
        )
}

//获取教育经历
function fetchEdu(req,res) {
    EduModel
        .find()
        .then(
            function(edu) {
                res.json(edu)
            },
            function() {
                res.setStatus(400)
            }
        )
}

//设置教育经历 
function setEdu(req, res) {
    var edu = req.body
    EduModel
        .create(edu)
        .then(
            function() {
                res.json(200)
            },
            function() {
                res.setStatus(400)
            }
        )
}

//登陆
function logIn(req,res) {
    var name = req.body.userName
    var password = req.body.passWord
    UserModel
        .find({userName: name}, function(err,users) {
            if(users.length === 0) {
                res.json({isSuccess: false, message: '用户不存在'})
            } else if (users[0].passWord === password) {
                res.json({isSuccess: true, message: '登录成功'})
            } else if (users[0].passWord !== password) {
                res.json({isSuccess: true, message: '密码错误'})
            }
        })
}

//获取项目经历
function fetchProject(req, res) {
    ProjectModel
        .find()
        .then(
            function(project) {
                res.json(project)
            },
            function(res) {
                res.json(200)
            }
        )
}

//设置项目经历
function setProject(req, res) {
    var project = req.body
    ProjectModel
        .create(project)
        .then(
            function() {
                res.json(200)
            },
            function() {
                res.json(400)
            }
        )
}
app.listen(4000)