var express= require('express');
var router=express.Router();


router.get("/architecture",function(req, res){
    res.render("architecture.ejs");
});

module.exports = router;