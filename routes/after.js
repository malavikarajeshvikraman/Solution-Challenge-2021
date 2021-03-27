var express= require('express');
var router=express.Router();


router.get("/after",function(req, res){
    res.render("after.ejs");
});

module.exports = router;