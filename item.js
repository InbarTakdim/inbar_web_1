
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var matcherSchema= new schema({
    id:{type: String , unique: true},
    name:{type: String },
    old_age:Number,
    younge_age:Number
}, {collection: 'items'});

mongoose.model('matcher' , matcherSchema );

module.exports= matcherSchema;