var express= require('express');
var router=express.Router();
var db=require('../db/data');


router.get("/webdev",function(req, res){
    var sql5 = 'select * from  persons  where Aoe = "Web Development";';
    db.query(sql5, function (err, data1) {
        res.render('webdev',{data1:data1});
            });
});

module.exports = router;