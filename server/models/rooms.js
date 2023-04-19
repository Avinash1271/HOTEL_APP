const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    roomNumber:{
        type:Number,
        required:true
    },
    Count:{
        type:Number,
        required:true
    },
    phNumber:{
        type:Number,
        required:true
    },
    rentPerDay:{
        type:Number,
        required:true
    },
    imageUrl :[],
    currentBookings:[],
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const roomModels = mongoose.model('rooms',roomSchema);

module.exports = roomModels;