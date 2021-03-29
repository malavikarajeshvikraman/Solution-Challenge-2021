var express= require('express');
var router=express.Router();


router.get("/eng",function(req, res){
    res.render("eng.ejs");
});

module.exports = router;