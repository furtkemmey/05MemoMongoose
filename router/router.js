const formidable = require('formidable');
const Memo = require('../model/Memo.js');
const mongoose = require('mongoose');
//----------------------------------------------------------
const pageamount = 5; // 設定參數 每頁多少資料 可以考慮存在資料庫
exports.showIndex = function(req, res) {
    res.render('index');
}
//----------------------------------------------------------

// ?pageamount=1
// 算出有多少頁
exports.pageamount = function(req, res) {
    Memo.count({}, function(err, count) {
        if(err) {
            res.json(-1);
        }
        res.json(Math.ceil(count / pageamount)); // 算出有多少頁
    });
}
//----------------------------------------------------------

// 列出留言 回傳JSON
// ?page=1
exports.listMessage = function(req, res) {
    var page = parseInt(req.query.page);
    Memo.find({})
        .sort({'messageDate' : -1})
        .limit(pageamount)
        .skip(pageamount * page)
        .exec( function(err, result) {
        // console.log(err);
        if(err) {
            res.json(-1);
        }
         res.json(result);
    });    
}
//----------------------------------------------------------

// post 留言
exports.tijiao = function(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        // 得到留言
        // console.log("Get " + fields.xingming + " " + fields.liuyan);
        // 要儲存
        Memo.create({
            "name" : fields.xingming,
            "message" : fields.liuyan,
            "messageDate" : new Date()
        }, function(err, result){
            // console.log(result);
            if(err) {
                res.json(-1);
            } else {
                res.json(0);
            }
        });
    });
}
//----------------------------------------------------------

// ?id=100001
exports.delMessage = function(req, res) {
    var id = mongoose.Types.ObjectId(req.query.id);
    // console.log(id);
    // console.log(typeof(id));
    Memo.remove({_id : id}, function(err) {
        if(err) {
            res.json(-1);
        }
        res.redirect('/');
    });
    // res.json(0);
}