
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema= new schema({
   id:{type: String , unique: true},
    mom_name:{type: String },
    mail:{type: String },
    img:{type: String },
    children:[{
        child_name:{type:String},
        child_age:Number,
        liked_item:[String]
    }]
  
}, {collection: 'users'});

mongoose.model('user' , userSchema );

module.exports= userSchema;