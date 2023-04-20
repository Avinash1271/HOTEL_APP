const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    name:{
        type:String,
        required:true
    },
    roomNumber:{
        type:Number,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    fromDate:{
        type:Date,
        required:true
    },
    toDate:{
        type:Date,
        required:true
    },
    roomType:{
        type:String,
        required:true
    }
})

const userModels = mongoose.model('users',userSchema);

module.exports = userModels;