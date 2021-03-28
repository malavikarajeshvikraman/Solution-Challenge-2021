var express = require('express');
const session = require('express-session');
var router = express.Router();
var db=require('../db/data');

router.get('/mdashboard',(req,res) => {
    res.render('mdashboard');
});





module.exports = router;