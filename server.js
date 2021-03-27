const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash=require('connect-flash');
const session=require('express-session');
var mentorRouter = require('./routes/mentor');
var Strategy = require('passport-local').Strategy;
const app=express();
app.use(mentorRouter);
app.use(express.static('public'));
app.use(fileUpload());
const conn=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'sanjana123',
    database: 'challenge'
})
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
var route=require('./routes/after');
app.get('/',(req,res) => {
    res.render('home');
});
app.get('/user_dashboard',(req,res) => {
    res.render('user_dashboard');
});
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{ //cookie
      httponly: true,
      maxAge:60*60*1000, //set to 1 hour
      secure:false
      }}));
app.use(route)
      app.use(flash());
      //passport middlewares
      app.use(passport.initialize());
      app.use(passport.session());
      //global variables for flash messages
      app.use(function(req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
      });
      //REST APIs
      app.get('/register',(req,res)=>{
        res.render('register');
      });
      app.get('/',(req,res)=>{
        res.render('home');
      });
      app.post('/register',(req,res)=>{
        const { name,email,role,password,password2} = req.body;
        let errors=[];
        if(!name || !email || !role || !password || !password2){
           errors.push({msg: 'Input'});
        }
        if(password!==password2){
          errors.push({msg:'Not matching'});
        }
        if(password.length <5){ 
          errors.push({ msg: 'Password should have atleast 5 chars' });
        }
        if(errors.length >0){
          res.render('register',{errors,name,email,role,password,password2});
        }
         else {
          conn.query('SELECT email FROM user WHERE email ="' + email +'"', function (err, result) {
              if (err) throw err;
              console.log(result);    
              if(result.length == 0){ 
                  bcrypt.genSalt(10, (err, salt) => { 
                  bcrypt.hash(password,salt, function(err, hash) {
                      var sql = "INSERT INTO user (name,email,role,password) VALUES (?,?,?,?)";
                      var values = [name,email,role,hash]
                      conn.query(sql,values, function (err, result, fields) {
                      if (err) throw err;
                      req.flash('success_msg','You are now registered. Do login!');
                      res.redirect('/login');
                      });
                   });
                });
              }
              else{
                  errors.push({ msg: 'Email is already registered' });
                  res.render('register', {
                  errors,
                  name,
                  email,
                  password,
                  password2
                });               
              }
            });
              
           } 
          });
      
      app.get("/login",(req,res)=>{
        res.render('login');
      });
      
      
      
      app.get('/logout',
        function(req, res){
          req.logout();
          res.redirect('/login');
        });
      
      app.post('/login', 
        passport.authenticate('local-login', { 
          successRedirect: '/dashboard',
          failureRedirect: '/login',
          failureFlash: true }),
        function(req, res) {
          res.redirect('/');
        });
      //Authentication using passport
      passport.use(
        "local-login",
        new Strategy(
          {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
          },
          function(req, email, password, done) {
            console.log(email);
            console.log(password);
            conn.query('SELECT * FROM user WHERE email ="' + email +'"',function(err, rows) {
              console.log(rows);  
              if (err) return done(err);
                if (!rows.length) {
                  return done(
                    null,
                    false,
                    {message: "email not registered"});
                }
                console.log(rows[0].password);
                bcrypt.compare(password,rows[0].password,function(err,result){
                  if(result){
                      req.session.email=rows[0].email;
                    return done(null, rows[0]);
                  }
                  else{
                    return done(
                      null,
                      false,
                      { message: 'Incorrect email or password' });
                  }
                });
                  
              });
          }
      )
      );
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      // Deserialize the user
      passport.deserializeUser(function(id, done) {
        conn.query("select * from user where id = " + id, function(
          err,
          rows
        ) {
          done(err, rows[0]);
        });
      });
      



const PORT=process.env.port || 8000;
app.listen(PORT);