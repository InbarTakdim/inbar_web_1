'use strict';
var mongoose= require('mongoose');
var util = require('util');
var schema= require('../user'); 
mongoose.connect('mongodb://db_usr:db_pass@ds023570.mlab.com:23570/db_ringapp_2016'); 
var conn = mongoose.connection;
var user = mongoose.model('user' , schema );
conn.on('error' , function(err){
    console.log('connection error' + err);
});



module.exports= class User {
  
    constructor()
    {



    }

    get_mother(mom_id, res){

      user.find({'id':mom_id},
         function(err, usr){
            if(usr.length==0)
              {res.send("<html><h1>no such mom <br> check again</h1></html>");}
            else{
              res.send(usr);
            }
         });


    }

    get_all_users(res){
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
               { res.send("<html><h1>no such child / no such mom <br> check again</h1></html>");}


            else{
                user.find({'id':mom_id1}).where(   {children: {$elemMatch: {child_name:child_name1 , liked_item:item}}})
                .exec( function (err, raw) {
                    if (err) throw err;
                    if(raw.length>0){
                    res.send("<html><h1>item liked before</h1></html>");
                 }


                    if(raw.length<=0){
                         user.update(
                        {'id':mom_id1 ,'children.child_name':child_name1},
                        { $push: { 'children.$.liked_item':item }},
                        { multi: false },
                        function (err, raw) {
                            if (err) throw err;
                            console.log('The raw response from Mongo was ', raw);
                        });




                         user.find({'id':mom_id1 , 'children.child_name':child_name1}, function(err, usr){
                        if(err) throw err;
                        res.send(usr);});
                     }
            
            });} // finish else
        }); //finish the function of usr
      } //finish like




    add_child(mom_id1, child_name1, child_age1, res){

        user.find({'id':mom_id1},
         function(err, usr){
            if(err) throw err;
            else if(usr.length==0)
               { res.send("<html><h1>no such mom</h1></html>");}
            else {
                user.where({'id':mom_id1}).where( {children: {$elemMatch: {child_name:child_name1}}}).exec( function(err, usr){
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
                 }// finish else
        }); //finish the function of usr

      } //finish add_child

}

            
              