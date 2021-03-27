var express = require('express');
var router = express.Router();
var db=require('../db/data');

router.get('/mdashboard',(req,res) => {
    res.render('mdashboard');
});

router.get('/dashboard',(req,res) => {
    res.render('moredetails');
});

module.exports = router;