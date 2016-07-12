'use strict';
var mongoose= require('mongoose');
module.exports=mongoose;
var util = require('util');
var shortId=require('shortid');
var schema= require('../user'); 
module.exports= schema;
mongoose.connect('mongodb://db_usr:db_pass@ds023570.mlab.com:23570/db_ringapp_2016'); 
var conn = mongoose.connection;
var user = mongoose.model('user' , schema );
module.exports =user;
conn.on('error' , function(err){
    console.log('connection error' + err);
});


module.exports= class User {
  
    constructor()
    {}

    getMother(mom_id, res)
    {
      user.find({'id':mom_id},
         function(err, usr){
            if(usr.length==0)
              {res.send("<html><h1>no such mom <br> check again</h1></html>");}
            else{
              res.send(usr);
            }});
    }

    getAllUsers(res){
      user.find({},
         function(err, usr){
            if(usr.length==0)
              {res.send("<html><h1> 0 users </h1></html>");}
            else{
              res.send(usr);
            }
         });
    }



    like(mom_id1, child_name1, item, res)
    {
        user.find({'id':mom_id1 , 'children.child_name':child_name1},
         function(err, usr){
            if(err) throw err;
            else if(usr.length==0)
               {res.send("<html><h1>no such child / no such mom <br> check again</h1></html>");}
            else{
                user.find({'id':mom_id1}).where({children: {$elemMatch: {child_name:child_name1 , liked_item:item}}})
                .exec( function (err, raw){
                    if (err) throw err;
                    if(raw.length>0)
                      {res.send("<html><h1>item liked before</h1></html>");}
                    else if(raw.length<=0)
                      {user.update(
                        {'id':mom_id1 ,'children.child_name':child_name1},
                        { $push: { 'children.$.liked_item':item }},
                        { multi: false },
                        function (err, raw) {
                            if (err) throw err;
                            console.log('The raw response from Mongo was ', raw);
                        });
                        user.find({'id':mom_id1 , 'children.child_name':child_name1}, 
                        function(err, usr){
                          if(err) throw err;
                          res.send(usr);});}});
                } 
            }); 
    } 




    addChild(mom_id1, child_name1, child_age1, res){
        user.find({'id':mom_id1},
         function(err, usr){
            if(err) throw err;
            else if(usr.length==0) {res.send("<html><h1>no such mom</h1></html>");}
            else {
                user.where({'id':mom_id1}).where( {children: {$elemMatch: {child_name:child_name1}}}).exec( 
                  function(err, usr){
                      if(err) throw err;
                      if(usr.length>0)
                      {res.send("<html><h1>child insert before</h1></html>");}
                      else{
                          var new_child={
                          child_name:child_name1,
                          child_age:child_age1,
                          liked_item:[]} 
                          user.update(
                            {'id':mom_id1},
                            { $push: { 'children':new_child }},
                            { multi: false },
                            function (err, raw) {
                                if (err) throw err;
                                console.log('The raw response from Mongo was ', raw);
                            });
                          user.find({'id':mom_id1}, function(err, usr){
                            if(err) throw err;
                            res.send(usr);});
                      }});
                }
        }); 
      } 

      login(mom_mail, mom_img, mom_name1, res){
        user.find({'mail':mom_mail},
         function(err, usr){
            if(err) throw err;
            if(usr.length>0)
               {res.send(usr);}
             else{ 
                var new_mom=new user({
                  id:shortId.generate(),
                  mom_name:mom_name1,
                  mail:mom_mail,
                  img:mom_img,
                  children:[]
                });

                new_mom.save(function(err,doc){
                  if(err) {
                    console.log("CAN NOT CREATE NEW DOC" + err);
                    return err;}
                  else{
                    console.log("new mom save");
                    //res.send(doc);
                  user.find({'mail':mom_mail}, function(err, usr1){
                  if(err) throw err;
                  if(usr1<=0)
                    {res.send("canot fonut that mom");}
                  else
                    {res.send(usr1);} });
                  }
                });
              }
           });
        }

      removeChild(mom_id1, child_name1, res){
        user.find({'id':mom_id1},
         function(err, usr){
            if(err) throw err;
            else if(usr.length==0){res.send("<html><h1>no such mom</h1></html>");}
            else {
              user.where({'id':mom_id1}).where( {children: {$elemMatch: {child_name:child_name1}}}).exec( 
                function(err, usr){
                  if(err) throw err;
                  else if(usr.length<=0)
                    {res.send("<html><h1>child not found </h1></html>");}
                  else{
                    user.update(
                      {'id':mom_id1 },
                      { $pull: {children:{child_name:child_name1}}},
                      function (err, raw) {
                        if (err) throw err;
                          console.log('The raw response from Mongo was ', raw);
                    });
                    user.find({'id':mom_id1}, function(err, user1){
                        if(err) throw err;
                        res.send(user1);});
                  }});
                 }
        });
      } 

      unlike(mom_id1, child_name1, item, res){
        user.find({'id':mom_id1 , 'children.child_name':child_name1},
         function(err, usr){
            if(err) throw err;
            else if(usr.length==0){res.send("<html><h1>no such child / no such mom <br> check again</h1></html>");}
             else{
                user.find({'id':mom_id1}).where(   {children: {$elemMatch: {child_name:child_name1 , liked_item:item}}})
                .exec( function (err, raw) {
                    if (err) throw err;
                    if(raw.length>0){
                    user.update(
                        {'id':mom_id1 ,'children.child_name':child_name1},
                        { $pull: { 'children.$.liked_item':item }},
                        function (err, row) {
                          if (err) throw err;
                          console.log('deletes >> ', row);
                        });
                    }
                    user.find({'id':mom_id1}, function(err, usr){
                        if(err) throw err;
                        res.send(usr);});
                  });
              }
          });
      }               
          
 }             