var express= require('express');
var router=express.Router();


router.get("/commerce",function(req, res){
    res.render("commerce.ejs");
});

module.exports = router;