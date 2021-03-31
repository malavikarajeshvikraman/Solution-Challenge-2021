var express= require('express');
var router=express.Router();


router.get("/arts",function(req, res){
    res.render("arts.ejs");
});

module.exports = router;