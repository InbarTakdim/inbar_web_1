
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema= new schema({
   id:{type: Number , unique: true},
    mom_name:{type: String },
    mail:{type: String },
    children:[{
        child_name:{type:String},
        child_age:Number,
        liked_item:[String]
    }]
  
}, {collection: 'users'});

mongoose.model('user' , userSchema );

module.exports= userSchema;