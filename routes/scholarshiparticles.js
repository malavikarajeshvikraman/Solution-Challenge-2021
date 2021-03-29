const express=require('express')
const router=express.Router();
var db=require('../db/data');

router.get('/newscholarship',(req,res)=>{
    res.render("newscholarship");
});
router.get('/articles',(req,res)=>{
    var sql='SELECT * from sarticle';
    db.query(sql,(err,data)=>{
        if(err) throw err;
        console.log(data)
        res.render('scholarship',{articledata:data});

    });
  }); 

router.get('/restart',(req,res)=>{
    res.render('restartcareer');
})



module.exports=router;