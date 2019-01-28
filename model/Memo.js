// schema of memo
const mongoose = require('mongoose');
const db = require('./db.js');
//----------------------------------------------------------

const memoSchema = new mongoose.Schema({
    name : {type : String},
    message : {type : String},
    messageDate : {type : Date, default: Date.now}
});
//----------------------------------------------------------

const memoModel = db.model('Memo', memoSchema);
//----------------------------------------------------------

module.exports = memoModel;
//----------------------------------------------------------