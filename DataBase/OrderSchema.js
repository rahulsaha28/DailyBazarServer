const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        match:/\S+@gmail.com/g
    },
    products:[{}],
    date:{
        type:Date,
        default:new Date()
    }

});

module.exports = orderSchema;