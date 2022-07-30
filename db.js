const mongoose = require("mongoose")

var mongoUrl =''

mongoose.connect(mongoUrl ,{useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on('connected',()=>{
    console.log('DB connected');
})
db.on('error',()=>{
    console.log('DB connection failed');
})

module.exports = mongoose
  