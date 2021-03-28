const express=require('express')
const router=express.Router();
var db=require('../db/data');

router.get('/articles/new',(req,res)=>{
    res.render("articles/newscholarships");
});
router.get('/articles',(req,res)=>{
    var sql='SELECT * from sarticle';
    db.query(sql,(err,data)=>{
        if(err) throw err;
        res.render('scholarship',{articledata:data});

    });
  }); 

router.get('/restart',(req,res)=>{
    res.render('restartcareer');
})



module.exports=router;