const mongoose = require('mongoose');
var mongoURL = 'mongodb+srv://avinashkr666:avinashkr666@cluster0.q1zuxaw.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURL, { useNewUrlParser: true ,useUnifiedTopology:true });

var db = mongoose.connection;

//callback function
db.on('error', ()=>{
    console.log("Database connection failed");
});
db.on('connected', ()=>{
    console.log("Database connection successfull");
})

module.exports = mongoose










































// const mongoose = require("mongoose");
// mongoose.set('strictQuery', false);

// mongoose.connect("mongodb://localhost:27017/Hotel-rooms",{
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// }).then(()=>{
//     console.log("connection successfull");
// }).catch((e)=>{
//     console.log("No connection",e.message);
// })