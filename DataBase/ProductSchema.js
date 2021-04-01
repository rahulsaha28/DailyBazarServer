const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    weight:{
        type:Number,
        min:1,
        require:true
    },
    price:{
        type:Number,
        min:10,
        require:true
    },
    imageURL:{
        type:String,
        require:true
    }
})

module.exports = productSchema;