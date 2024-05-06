const mongoose = require('mongoose')
  const Schema = mongoose.Schema
  const DeskSchema = new Schema({
     name:{
        type:String
     },
     email:{
        type:String
     },
     mobileNumber:{
      type:Number
     },
     image: {
      type: String
     },
     empid: {
      type: String
     },
     salary:{
      type: Number
     },
     address: {
      type: String
     }
  });
  var Desk = mongoose.model('Desk',DeskSchema)
  module.exports = Desk;