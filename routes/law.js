var express= require('express');
var router=express.Router();


router.get("/law",function(req, res){
    res.render("law.ejs");
});

module.exports = router;