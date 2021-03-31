var express= require('express');
var router=express.Router();


router.get("/intern",function(req, res){
    res.render("intern.ejs");
});

module.exports = router;