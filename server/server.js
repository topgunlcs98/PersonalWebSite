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

var profileSchema = mongoose.Schema({
    skills: Array,
    education: Array,
    work: Array,
    project: Array
},{collection: 'profile'})

var SkillModel = mongoose.model("SkillModel", skillSchema)
var EduModel = mongoose.model("EduModel", eduSchema)
var UserModel = mongoose.model("UserModel", userSchema)
var ProjectModel = mongoose.model("ProjectModel", projectSchema)
var ProfileModel = mongoose.model("ProfileModel", profileSchema)

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post("/api/website/user", logIn)
app.get("/api/website/profile", fetchProfile)

function fetchProfile(req,res) {
    ProfileModel
    .find()
    .then(
        function(profile){
            res.json(profile)
        },
        function(){
            res.sendStatus(400)
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

app.listen(4000)