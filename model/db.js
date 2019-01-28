const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/memo');

db.once('open', function(callback) {
    console.log('connect to memo success');
});

module.exports = db;