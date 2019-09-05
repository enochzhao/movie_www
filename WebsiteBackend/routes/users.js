var express = require('express');
var router = express.Router();
var user = require('../models/user');
var crypto = require('crypto');
var movie = require('../models/movie');
var mail = require('../models/mail');
var comment = require('../models/comment');
const init_token = 'TKL02o';

/* GET users listing. */
//用户登录接口
router.post('/login', function (req, res, next) {
  if (!req.body.username) {
    res.json({status: 1, message: "用户名为空"});
  }
  if (!req.body.password) {
    res.json({status: 1, message: "密码为空"});
  }
  user.findUserLogin(req.body.username, req.body.password, function (err, userSave) {
    if (userSave.length != 0) {
      //通过MD5查看密码
      var token_after = getMD5Password(userSave[0]._id)
      res.json({status: 0, date: {token_after, user: userSave}, message:"用户登录成功"})
    } else {
      res.json({status: 1, message: "用户名或者密码错误"})
    }
  })
});
//用户注册接口
router.post('/register', function (req, res, next) {
  if (!req.body.username) {
    res.json({status: 1, message: "用户名为空"});
  }
  if (!req.body.password) {
    res.json({status: 1, message: "密码为空"});
  }
  if (!req.body.userMail) {
    res.json({status: 1, message: "用户邮箱为空"});
  }
  if (!req.body.userPhone) {
    res.json({status: 1, message: "用户手机为空"});
  }
  user.findByUsername(req.body.username, function (err, userSave) {
    if (userSave.length != 0) {
      //返回错误信息
      res.json({status: 1, message: "用户已注册"});
    } else {
      var registerUser = new user({
        username: req.body.username,
        password: req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
        userAdmin: 0,
        userPower: 0,
        userStop: 0
      });
      registerUser.save(function () {
        res.json({status: 0, message: "注册成功"});
      });
    }
  });
});
//用户提交评论接口
router.post('/postComment', function (req, res, next) {
    if (!req.body.username) {
        var username = "匿名用户"
    }
    if (!req.body.movie_id) {
        res.json({status: 1, message: "电影id为空"})
    }
    if (!req.body.context) {
        res.json({status: 1, message: "评论内容为空"})
    }

    var saveComment = new comment({
        movie_id: req.body.movie_id,
        username: req.body.username ? req.body.username : username,
        context: req.body.context,
        check: 0
    })
    saveComment.save(function (err) {
        if(err){
            res.json({status: 1, message: err})
        }else{
            res.json({status: 0, message: '评论成功'})
        }

    })
});
//用户点赞接口
router.post('/support', function (req, res, next) {
});
//用户找回密码接口
router.post('/findPassword', function (req, res, next) {
    if (req.body.repassword) {
        if (req.body.token) {
            if (!req.body.user_id) {
                res.json({status: 1, message: "用户登录错误"})
            }
            if (!req.body.password) {
                res.json({status: 1, message: "用户老密码错误"})
            }
            if (req.body.token == getMD5Password(req.body.user_id)) {
                user.findOne({_id: req.body.user_id, password: req.body.password}, function (err, checkUser) {
                    if (checkUser) {
                        user.update({_id: req.body.user_id}, {password: req.body.repassword}, function (err, userUpdate) {
                            if (err) {
                                res.json({status: 1, message: "更改失败", data: err})
                            }
                            res.json({status: 1, message: "更改成功", data: userUpdate})
                        })
                    } else {
                        res.json({status: 1, message: "用户老密码错误"})
                    }
                })
            } else {
                res.json({status: 1, message: "用户登录错误"})
            }
        } else {
            user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, function (err, userFound) {
                if (userFound.length != 0) {
                    user.update({_id: userFound[0]._id}, {password: req.body.repassword}, function (err, userUpdate) {
                        if (err) {
                            res.json({status: 1, message: "更改失败", data: err})
                        }
                        res.json({status: 0, message: "更改成功", data: userUpdate})
                    })
                } else {
                    res.json({status: 1, message: "信息错误"})
                }
            })
        }
    } else {
        if (!req.body.username) {
            res.json({status: 1, message: "用户名为空"})
        }
        if (!req.body.userMail) {
            res.json({status: 1, message: "用户邮箱为空"})
        }
        if (!req.body.userPhone) {
            res.json({status: 1, message: "用户手机为空"})
        }
        user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, function (err, userFound) {
            if (userFound.length != 0) {
                res.json({status: 0, message: "验证成功，请修改密码", data: {username: req.body.username, userMail: req.body.userMail, userPhone: req.body.userPhone}})
            } else {
                res.json({status: 1, message: "信息错误"})
            }
        })
    }
});
//用户发送站内信接口
router.post('/sendEmail', function (req, res, next) {
});
//用户显示站内信接口，其中receive为1时是发送的内容，为2时是收到的内容
router.post('/showEmail', function (req, res, next) {
});
//获取MD5值
function getMD5Password(id) {
  var md5 = crypto.createHash('md5');
  var token_before = id + init_token;
  //res.json(userSave[0]._id);
  return md5.update(token_before).digest('hex');
}

/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
module.exports = router;
