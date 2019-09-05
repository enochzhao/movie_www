var express = require('express');
var router = express.Router();
var user = require('../models/user');
var movie = require('../models/movie');
var comment = require('../models/comment');
var article = require('../models/article');
var recommend = require('../models/recommend');
var crypto = require('crypto');
const init_token = 'TKL02o';

//后台管理需要验证其用户的后台管理权限
//后台管理admin，添加新的电影
router.post('/movieAdd', function (req, res, next) {
    if (!req.body.username) {
        res.json({status: 1, message: "用户名为空"});
    }
    if (!req.body.token) {
        res.json({status: 1, message: "登录出错"});
    }
    if (!req.body.id) {
        res.json({status: 1, message: "用户传递错误"});
    }
    if (!req.body.movieName) {
        res.json({status: 1, message: "电影名称为空"});
    }
    if (!req.body.movieImg) {
        res.json({status: 1, message: "电影图片为空"});
    }
    if (!req.body.movieDownload) {
        res.json({status: 1, message: "电影下载地址为空"});
    }
    if (!req.body.movieMainPage) {
        var movieMainPage = false;
    }
    //验证
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        //    验证用户的情况下
        user.findByUsername(req.body.username, function (err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                var saveMovie = new movie({
                    movieName: req.body.movieName,
                    movieImg: req.body.movieImg,
                    movieVideo: req.body.movieVideo,
                    movieDownload: req.body.movieDownload,
                    movieTime: Date.now(),
                    movieNumSuppose: 0,
                    movieNumDownload: 0,
                    movieMainPage: movieMainPage
                });
                saveMovie.save(function (err) {
                    if (err) {
                        res.json({status: 1, message: err});
                    } else {
                        res.json({status: 0, message: "添加成功"});
                    }
                });
            } else {
                res.json({error: 1, message: "用户没有获得权限或者已经停用"});
            }
        });
    } else {
        res.json({status: 1, message: check.message});
    }
});

//获取md5值
function getMD5Password(id) {
    var md5 = crypto.createHash('md5');
    var token_before = id + init_token
    // res.json(userSave[0]._id)
    return md5.update(token_before).digest('hex')
}

module.exports = router;
