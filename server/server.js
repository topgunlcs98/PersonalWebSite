var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var moment = require('moment')
mongoose.connect('mongodb://localhost:27017/website', {useNewUrlParser: true})
const cors = require('cors');

var userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    passWord: { type: String, required: true }
}, {collection: 'users'})

var profileSchema = mongoose.Schema({
    skills: Array,
    education: Array,
    work: Array,
    project: Array,
    interest: Array
},{collection: 'profile'})

var PostSchema = mongoose.Schema({
    title: {type:String, required: true},
    body: String,
    tag: {type: String, enum: ['POLITICS','ECONOMY', 'EDUCATION','IT', 'HISTORY','MILITARY','OTHER']},
    date: { type: Date, default: moment().add(8,'hour').toDate() }
}, {collection: 'post'})

var CommentSchema = mongoose.Schema({
    name: String,
    body: {type: String, required:true},
    date: {type: Date, default: moment().add(8,'hour').toDate()}
},{collection: 'comment'})

var UserModel = mongoose.model("UserModel", userSchema)
var ProfileModel = mongoose.model("ProfileModel", profileSchema)
var PostModel = mongoose.model('PostModel', PostSchema)
var CommentModel = mongoose.model('CommentModel', CommentSchema)

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.post("/api/website/user", logIn) //登录
app.get("/api/website/profile", fetchProfile) //获取简历
app.get("/api/website/post",fetchPost) //获取博文
app.post("/api/website/post", createPost)//发博文
app.get("/api/website/comment", fetchComment) //获取评论
app.post("/api/website/comment", sendComment) //发表评论
app.post("/api/website/changeBlog", modifyBlog) //修改博客
app.post("/api/website/removeBlog",deletePost) //删除博客
app.post("/api/website/profileSettings/setSkill", changeSkill) //改技能
app.post("/api/website/profileSettings/setInterest", changeInterest) //改技能
app.post("/api/website/profileSettings/setEdu", changeEdu) //改教育经历
//获取简历
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

//获取博文
function fetchPost(req,res) {
    PostModel
        .find()
        .then(
            function(post) {
                res.json(post)
            },
            function(res) {
                res.sendStatus(400)
            }
        )
}

//发博文
function createPost(req,res) {
    var post = req.body
    PostModel
        .create(post)
        .then(
            function() {
                res.json(200)
            },
            function() {
                res.sendStatus(400)
            }
        )
}

//修改博客
function modifyBlog(req,res) {
    const { index, content, title } = req.body
    PostModel
        .updateOne({_id: index},{
            title: title,
            body: content
        },function(err){
            if(err){
                concole.log(err)
            }
        })
        .then(
            function(){
                res.json(200)
            },
            function(){
                res.sendStatus(400)
            }
        )
}

//删除博客
function deletePost(req,res) {
    const {index} = req.body
    PostModel
        .remove({_id: index},function(err){
            if(err){
                console.log(err)
            }
        })
        .then(
            function() {
                res.json(200)
            }, function() {
                res.sendStatus(400)
            }
        )
}

//获取评论
function fetchComment(req,res){
    CommentModel
        .find()
        .then(
            function(comment) {
                res.json(comment)
            },
            function(res) {
                res.sendStatus(400)
            }
        )
}

//发表评论
function sendComment(req,res) {
    var comment = req.body
    CommentModel
        .create(comment)
        .then(
            function() {
                res.json(200)
            },
            function() {
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
                res.json({isSuccess: false, message: '密码错误'})
            }
        })
}

//改技能
function changeSkill(req, res) {
    const {skill,index} = req.body
    ProfileModel
        .updateOne({_id: index},
            {skills: skill},
            function(err) {
                if(err) {
                    console.log(err)
                }
            }
            )
        .then(
            function(){
                res.json(200)
            },
            function(){
                res.sendStatus(400)
            }
        )
}

//修改兴趣
function changeInterest(req, res) {
    const {interests,index} = req.body
    ProfileModel
        .updateOne({_id: index},
            {interest: interests},
            function(err) {
                if(err) {
                    console.log(err)
                }
            }
            )
        .then(
            function(){
                res.json(200)
            },
            function(){
                res.sendStatus(400)
            }
        )
}

//修改教育经历
function changeEdu(req,res) {
    const { index, edu } = req.body
    ProfileModel
        .updateOne({_id:index},
            {
                education: edu
            },
            function(err) {
                if(err) {
                    console.log(err)
                }
            }
            )
        .then(
            function(){
                res.json(200)
            },
            function(){
                res.sendStatus(400)
            }
        )
}
app.listen(4000)