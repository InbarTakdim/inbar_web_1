'use strict';
var mongoose= require('mongoose');
var util = require('util');
var shortId=require('shortid');
var schema= require('../item'); //-----
mongoose.createConnection('mongodb://db_usr:db_pass@ds023570.mlab.com:23570/db_ringapp_2016'); //-----
var conn = mongoose.connection;
var matcher = mongoose.model('matcher' , schema );
module.exports=matcher;
conn.on('error' , function(err){
    console.log('connection error' + err);
});



module.exports= class Matcher {
  
    constructor()
    {}

    getItemById(id, res){

      matcher.find({'id':id}).exec(function(err, usr){
          if(usr.length==0)
            {res.send("<html><h1>NOTHING AT THIS ID</h1></html>");}
          else{
            res.send(usr);
          }
      });
    }

    getItemsByCategory(category, res){
      matcher.find({'type':category}).exec(function(err, usr){
          if(usr.length==0)
            {res.send("<html><h1>NOTHING AT THAT CATEGORY</h1></html>");}
          else{
            res.send(usr);
          }});
    }


    setAgeToItem(itemId, maxAge, minAge, res){
      matcher.find({'id':itemId}).exec(function(err, usr){
          if(usr.length==0)
            {res.send("<html><h1>invalid item id</h1></html>");}
          else{
            matcher.update(
                {'id':itemId},
                { $set: { 'old_age':maxAge , 'younge_age':minAge }},
                { multi: false },
                 function (err, raw) {
                   if (err) throw err;
                   console.log('The raw response from Mongo was ', raw);
             });
             matcher.find({'id':itemId}).exec(function(err, usr){
            res.send(usr);});
          }
      });
    }

    addNewItem(itemName, itemCategory, itemAuthor, minAge, maxAge, itemImg, res)
    {

          matcher.find({'name':itemName},
         function(err, usr){
            if(err) throw err;
            if(usr.length>0)
               { console.log("item "+ itemName+ " exists");
                res.send(usr);}
            
             else{ 
                //upload img

              var new_item=new matcher({
                  id:shortId.generate(),
                  type:itemCategory,
                  name:itemName,
                  author:itemAuthor,
                  younge_age:minAge,
                  old_age:maxAge,
                  img:itemImg
                });

               new_item.save(function(err,doc){
                  if(err) {
                    console.log("CAN NOT CREATE NEW DOC" + err);
                    return err;}
                  else{
                    console.log("new item saved");
                    
                  }
                });
              }
              });


                matcher.find({'name':itemName}, function(err, usr1){
                  if(err) throw err;
                  if(usr1>0)
                 {res.send(usr1);} });
    }

    getAllItems(res){
      matcher.find({}).exec(function(err, usr){
          if(usr.length==0)
            {res.send("<html><h1>NOTHING</h1></html>");}
          else{
            res.send(usr);
          }
      });
    }



    searchItemByAge(category, child_age, res)
    {
        matcher.find({'type':category}).where('old_age').gte(child_age).where('younge_age').lte(child_age).
        exec(function(err, usr){
          if(err) throw err;
          else if(usr.length==0)
               { res.send("<html><h1>NOTHING</h1></html>");}
          else{res.send(usr);}
        });
    }
}


