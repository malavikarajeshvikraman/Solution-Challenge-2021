var express = require('express');
var router = express.Router();
var db=require('../db/data');

router.get('/mdashboard',(req,res) => {
    res.render('mdashboard');
});

module.exports = router;