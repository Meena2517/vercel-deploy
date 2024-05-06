const mongoose = require('mongoose')
  const Schema = mongoose.Schema
  const DeskSchema = new Schema({
     name:{
        type:String
     },
     photo:{
        type:String
     },
     gender:{
         type:String
     },
     dob: {
      type:String
     },
     fatherName:{
        type:String
     },
     designation:{
        type:String
     },
     email:{
         type:String
     },
     mobileNumber: {
      type:Number
     },
     address1:{
        type:String
     },
     address2:{
        type:String
     },
     objective:{
         type:String
     },
     skills: {
      type:String
     },
     experience:{
        type:String
     },
     tableData:{
        type:String
     },
     declaration:{
         type:String
     },
     place: {
      type:String
     },
     loginEmail: {
        type : String
     }
  });
  var Desk = mongoose.model('ResumeData',DeskSchema)
  module.exports = Desk;