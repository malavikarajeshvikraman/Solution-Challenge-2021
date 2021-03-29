var express= require('express');
var router=express.Router();


router.get("/nit",function(req, res){
    res.render("nit.ejs");
});

module.exports = router;