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

    get_item_by_id(id, res){

      matcher.find({'id':id}).exec(function(err, usr){
          if(usr.length==0)
            {res.send("<html><h1>NOTHING AT THIS ID</h1></html>");}
          else{
            res.send(usr);
          }
      });
    }

    get_items_by_category(category, res){
      matcher.find({'type':category}).exec(function(err, usr){
          if(usr.length==0)
            {res.send("<html><h1>NOTHING AT THAT CATEGORY</h1></html>");}
          else{
            res.send(usr);
          }
      });
    }


    set_age_to_item(itemId, maxAge, minAge, res){
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





    get_all_items( res){
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
          else{

             res.send(usr);
          }



        });
    }
}


/*
         function(err, usr){
            if(err) throw err;
            else if(usr.length==0)
               { res.send("<html><h1>NOTHING</h1></html>");}


            else{
                user.find({'mom_name':mom_name1}).where(   {children: {$elemMatch: {child_name:child_name1 , liked_item:item}}})//.where({'mom_name':mom_name1}  )
                //.where({'mom_name':mom_name1 }).where({'this.children.liked_item':item} )
                .exec( function (err, raw) {
                    if (err) throw err;
                    if(raw.length>0){
                    res.send("<html><h1>item liked before</h1></html>");
                 }


                    if(raw.length<=0){
                         user.update(
                        {'mom_name':mom_name1 ,'children.child_name':child_name1},
                        { $push: { 'children.$.liked_item':item }},
                        { multi: false },
                        function (err, raw) {
                            if (err) throw err;
                            console.log('The raw response from Mongo was ', raw);
                        });




                         user.find({'mom_name':mom_name1 , 'children.child_name':child_name1}, function(err, usr){
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

            
                 //'children.$.liked_item': { $elemMatch: { $liked_item: item } }
                 /*user.find({'children.$.liked_item':{$elemMatch: { 'children.$.liked_item': item }}} ,
                  function (err, raw) {
                    if (err) throw err;
                    if(raw.length>0){
                    console.log("likeddddd beforeeeeee");
                    res.send("<html><h1>item liked before</h1></html>");
                 }
               
                } );
                */
                /*user.find({ "$in": { 'children.$.liked_item': item} },function (err, raw){
                    if (err) throw err;
                    if(raw.length>0){
                    console.log("likeddddd beforeeeeee");
                    res.send("<html><h1>item liked before</h1></html>");
                }});
                */
/*
                user.find({{$where : 'this.liked_item'.indexOf(item) != -1}} , 
                    function (err, raw) {
                    if (err) throw err;
                    if(raw.length>0){
                    console.log("likeddddd beforeeeeee");
                    res.send("<html><h1>item liked before</h1></html>");
                 }});


                user.find({'children.$.liked_item':{$eq:{"$in":[item], "$exists":false}}} ,
                 function (err, raw){

                        if(raw.length>0){
                    res.send("<html><h1>item liked before</h1></html>");}});


                var query = user.find({'mom_name':mom_name1 , 'children.child_name':child_name1});
                query.where('children.$.liked_item').in(item).exec( function (err, raw) {
                    if (err) throw err;
                    if(raw.length>0){
                    //console.log("likeddddd beforeeeeee");
                    res.send("<html><h1>item liked before</h1></html>");
                 }});
*/

                




//*
           /*     user.update(
                {'mom_name':mom_name1 ,'children.child_name':child_name1},
                { $push: { 'children.$.liked_item':item }},
                { multi: false },
                function (err, raw) {
                    if (err) throw err;
                    console.log('The raw response from Mongo was ', raw);
                });

             //console.log(util.inspect(usr, false, null));
             //res.send(usr);

                user.find({'mom_name':mom_name1 , 'children.child_name':child_name1}, function(err, usr){
                    if(err) throw err;
                     res.send(usr);
                });



              }
            
        });

        */


    

       
      /*  user.find({'mom_name':mom_name1}).where('children.child_name').equals(child_name1).exec(function(err, result){
           if(err) throw err;

           if(result.length==0){
            res.send("<html><h1>no such child</h1></html>");
          }
        else{ 
            
            result.update({
            $push:{liked_item:'pinokyo'}});


}
        //res.send(user); }
        //mongoose.disconnect();
        });*/
    


   /* year_excellent_grade(res ,year){
    //get all excellent student (grade 90+) by year
        student.find({}).where('year').equals(year).where('grade').gt(89).exec(function(err, user){
            if(err) throw err;
            if(user.length==0){
                res.send("<html><h1>evryone under 90 in this year</h1></html>");
             }
            else{ res.send(user); }
            //mongoose.disconnect();
        });
    }

    

  
    ex_grade(res){
        student.find({}).where('grade').gt(89).exec(function(err, user){
            if(err) throw err;
            if(user.length==0){
               res.send("<html><h1>evryone under 90</h1></html>");
             }
            else{ res.send(user); }
            //mongoose.disconnect();
            });
    }
    */

//destructor(){mongoose.disconnect();}


//var dany= new User;

