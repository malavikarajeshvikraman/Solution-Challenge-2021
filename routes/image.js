var express = require('express');
const session = require('express-session');
var router = express.Router();
var db=require('../db/data');


exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `mentors` WHERE `mid`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  var sql1 ="SELECT * From users where id = ='"+id+"'";
     db.query(sql1, function(err, d){
        var email = d[0].email;
        res.render('mdashboard',{data:result,email:email});
     });
      
   });
};