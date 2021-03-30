var express= require('express');
var router=express.Router();


router.get("/webdev",function(req, res){
    res.render("webdev.ejs");
});

module.exports = router;