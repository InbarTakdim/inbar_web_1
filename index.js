'use strict';

var http= require('http');
var express=require('express');
var User= require('./users_module');
var Matcher=require('./matcher');
var userManger=new User();
var MyMatcher=new Matcher();
var app=express();

app.get('/like_child_item/:mom_id/:child_name/:item' , function(req,res){
    
    var mom_id=req.params.mom_id;
    var child_name=req.params.child_name;
    var item=req.params.item;
    userManger.like(mom_id, child_name, item, res);
});

app.get('/add_child/:mom_id/:child_name/:child_age' , function(req,res){
    var mom_id=req.params.mom_id;
    var child_name=req.params.child_name;
    var child_age=req.params.child_age;
    userManger.add_child(mom_id, child_name, child_age, res);
});

app.get('/search_item_by_age/:category/:child_age' , function(req,res){
    
    var category=req.params.category;
    if(category=="books" || category=="shows" || category=="songs"){
    var child_age=req.params.child_age;
    MyMatcher.searchItemByAge(category, child_age, res);
    }

    else{
        res.send("<html><h1>no such category (only:books/shows/songs)</h1></html>");
    }

});


app.get('/get_mother/:mom_id' , function(req,res){
    var mom_id=req.params.mom_id;
    userManger.get_mother(mom_id, res);
});

app.get('/get_all_users' , function(req,res){
    userManger.get_all_users(res);
}); 


app.get('/get_items/:category' , function(req,res){
    
    var category=req.params.category;
    MyMatcher.get_items(category, res);
});
http.createServer(app).listen(process.env.PORT ||8080);