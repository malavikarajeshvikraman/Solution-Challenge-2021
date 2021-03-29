var express = require('express');
var router = express.Router();
var db=require('../db/data');

router.get('/user_dashboard',(req,res) => {
    res.render('user_dashboard');
});

// router.get('/user_dashboard/user_profile', function(req, res, next) {
//     var sql='SELECT * FROM user WHERE username = ?';
//     db.query(sql, [req.session.username ], function (err, data, fields) {
//         if(err) throw err
//         if(req.session.loggedIn){
//             console.log(req.session.message);
//             res.render('details.ejs',{username:req.session.username,data : data[0] ,alertMsg : req.session.message})
//         }else{
//             res.redirect('/login');
//         }
//     })   
// });
router.get('/logout',
        function(req, res){
          req.logout();
          res.redirect('/login');
});

router.get('/user_profile',(req,res) => {
    
    res.render('user_profile');
    
});



      

module.exports = router;