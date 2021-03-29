var express= require('express');
var router=express.Router();


router.get("/iit",function(req, res){
    res.render("iit.ejs");
});

module.exports = router;