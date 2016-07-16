'use strict';

var http= require('http');
var url= require('url');
var fs= require('fs');
var path= require('path');
var express=require('express');
var User= require('./users_module');
var Matcher=require('./matcher');
var userManger=new User();
var MyMatcher=new Matcher();
var app=express();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/like_child_item/:mom_id/:child_name/:item' , function(req,res){
    
    var mom_id=req.params.mom_id;
    var child_name=req.params.child_name;
    var item=req.params.item;
    userManger.like(mom_id, child_name, item, res);
});

app.get('/unlike_child_item/:mom_id/:child_name/:item' , function(req,res){
    
    var mom_id=req.params.mom_id;
    var child_name=req.params.child_name;
    var item=req.params.item;
    userManger.unlike(mom_id, child_name, item, res);
});


app.get('/login/:mom_mail/:mom_img/:mom_name' , function(req,res){
    var mom_mail=req.params.mom_mail;
    var mom_img=req.params.mom_img;
    var mom_name=req.params.mom_name;
    userManger.login(mom_mail, mom_img, mom_name, res);
});


app.get('/add_child/:mom_id/:child_name/:child_age' , function(req,res){
    var mom_id=req.params.mom_id;
    var child_name=req.params.child_name;
    var child_age=req.params.child_age;
    userManger.addChild(mom_id, child_name, child_age, res);
});


app.get('/remove_child/:mom_id/:child_name' , function(req,res){
    var mom_id=req.params.mom_id;
    var child_name=req.params.child_name;
    userManger.removeChild(mom_id, child_name, res);
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
    userManger.getMother(mom_id, res);
});

app.get('/get_all_users' , function(req,res){
    userManger.getAllUsers(res);
}); 


app.get('/get_items_by_category/:category' , function(req,res){
    
    var category=req.params.category;
    MyMatcher.getItemsByCategory(category, res);
});


app.get('/get_all_items' , function(req,res){
   
    MyMatcher.getAllItems(res);
});


app.get('/get_item_by_id/:id' , function(req,res){
    var id=req.params.id;
    MyMatcher.getItemById(id, res);
}); 

app.get('/set_age_to_item/:itemId/:maxAge/:minAge' , function(req,res){
    var itemId=req.params.itemId;
    var maxAge=req.params.maxAge;
    var minAge=req.params.minAge;
    MyMatcher.setAgeToItem(itemId, maxAge, minAge, res)
}); 


app.get('/get_image/:itemId' , function(req,res){
   // var __dirname;
    var imageDir =path.join(__dirname , './public/images/');
    
    var itemId=req.params.itemId;
    fs.readFile(imageDir+itemId+".jpg" , function(err , content){
        console.log("->>>"+imageDir+itemId+".jpg" );
        if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such image");    
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type':'image/jpg'});
                res.end(content);
            }
    });
   
});

http.createServer(app).listen(process.env.PORT ||8080);