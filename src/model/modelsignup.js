const mongoose = require('mongoose')
  const Schema = mongoose.Schema
  const DeskSchema = new Schema({
     username:{
        type:String
     },
     email:{
        type:String
     },
     password:{
         type:String
     },
     time: {
      type:String
     }
  });
  var Desk = mongoose.model('Signupdata',DeskSchema)
  module.exports = Desk;