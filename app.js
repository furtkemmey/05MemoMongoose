const express = require('express');
const app = express();
const router = require('./router/router.js');
// const formidable = require('formidable');
//----------------------------------------------------------

app.set("view engine", "ejs");
app.use(express.static('./views'));
app.use(express.static('./public'));
//----------------------------------------------------------

// 顯示 首頁 有拆分的頁面,借用ejs達成
app.get('/', router.showIndex);
// 列出所有留言
app.get('/message', router.listMessage);
app.get('/pageamount', router.pageamount);
app.get('/delMessage' , router.delMessage);
//----------------------------------------------------------

// 提交表單 存資料庫
app.post('/tijiao', router.tijiao);
//----------------------------------------------------------

app.listen(3000);
console.log("Server is on port= 3000")
//----------------------------------------------------------