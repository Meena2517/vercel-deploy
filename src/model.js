const mongoose = require('mongoose');

const Desk = mongoose.Schema({
    name : {
        type : String
    },
    number : {
        type : Number
    }
});

const Desks = mongoose.model('users',Desk);
module.exports = Desks;