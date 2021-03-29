var express= require('express');
var router=express.Router();


router.get("/med",function(req, res){
    res.render("med.ejs");
});

module.exports = router;