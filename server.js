const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash=require('connect-flash');
const session=require('express-session');
var userRouter = require('./routes/user');
var Strategy = require('passport-local').Strategy;
const app=express();
app.use(userRouter);

const scholarshipRouter=require('./routes/scholarshiparticles');
const imageRouter=require('./routes/image');
// var Strategy = require('passport-local').Strategy;
// const app=express();
app.use(scholarshipRouter);

app.use(express.static('public'));
app.use(fileUpload());
const conn=mysql.createConnection({
    host:'localhost',
    user: 'root',

    password: '12345',
    database: 'challenge'

})
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
var route=require('./routes/after');
var eng=require('./routes/eng');
var med=require('./routes/med');
var webdev=require('./routes/webdev');
var law=require('./routes/law');
var commerce=require('./routes/commerce');
var architecture=require('./routes/architecture');
var arts=require('./routes/arts');


app.get('/',(req,res) => {
    res.render('home');
});

app.get('/user_profile',(req,res) => {
  res.render('user_profile');
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
app.use(eng)
app.use(med)
app.use(webdev)
app.use(law)
app.use(commerce)
app.use(architecture)
app.use(arts)
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
      app.get('/restart',(req,res)=>{
        res.render('restartcareer');
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
                      var sql = "INSERT INTO user (name,email,role,password,fill) VALUES (?,?,?,?,0)";
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

      app.get('/mdashboard',(req,res) => {
        var sql="SELECT * FROM `mentors` WHERE `mid`='"+req.session.mid+"'"; 
        conn.query(sql, function(err, result){
         console.log("result id",result);
          res.render('mdashboard',{data:result,email:req.session.email});
       });
    });

      
     app.get('/dashboard',(req,res) => {
        var sql='SELECT * FROM user WHERE email = (?)';
        conn.query(sql, [req.session.email], function (err, data, fields) {
            if(err) throw err
            if(data[0].fill == 0)
            { 
              if (data[0].role == 'Mentor')
                res.render('moredetails');
              else
                res.render('moredetails2');
            }
            else
            {
              if (data[0].role == 'Mentor')
                res.redirect('mdashboard');
              else

                res.redirect('user_dashboard')

            }
        })
    });
    // to store user input detail on post request
app.post('/moredetails2', function(req, res, next) {
    
  inputData ={
      Fname: req.body.firstname,
      Lname: req.body.lastname,
      dob : req.body.dob,
      status: req.body.status,
      expertise:req.body.aoe,
      occupation:req.body.occupation,
      email:req.body.email,
      linkedin:req.body.linkedin_url,
      profile_link:req.body.p_url,
      wish:req.body.wish,

  }
 
  var sql='SELECT * FROM user WHERE email = ?';
      conn.query(sql, [req.session.email], function (err, data, fields) {
          if(err) throw err
        
          var sql1 = 'INSERT INTO user_info SET ? ;';
          conn.query(sql1,inputData, function (err, data1) {
            if (err) throw err;
                 });
          var sql2 = 'UPDATE user set fill = 1 where email = ?';
          conn.query(sql2,[req.session.email], function (err, data) {
            if (err) throw err;
                 });
              
       res.redirect('user_dashboard');
      });

   
});

    app.post('/mdashboard',(req,res) => {
      Constants = {
        fname :req.body.firstname,
        lname:req.body.lastname,
        aoe : req.body.aoe,
        occ :req.body.occupation,
        l_url:req.body.linkedin_url,
        p_url:req.body.p_url,
        comp:req.body.company,

      }
      console.log(Constants.aoe)
		var file= req.files.p_pic;
		var img_name=file.name;
      var sql='SELECT * FROM user WHERE email = ?';
      conn.query(sql, [req.session.email], function (err, data, fields) {
          if(err) throw err
        
          var sql1 = 'Insert into mentors values (?,?,?,?,?,?,?,?,?);';
          conn.query(sql1,[ data[0].id,Constants.fname,Constants.lname,Constants.aoe.join(','),Constants.occ,Constants.comp,Constants.l_url,Constants.p_url,file.name], function (err, data1) {
            if (err) throw err;
            file.mv('public/images/' + img_name)
                 });
          var sql2 = 'UPDATE user set fill = 1 where email = ?';
          conn.query(sql2,[req.session.email], function (err, data) {
            if (err) throw err;
                 });
              
       res.redirect('mdashboard');
      });
    });


             
        
app.get('/profile/:id',imageRouter.profile);
      
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
            req.session.email1=email;
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
                      {req.session.email=rows[0].email;
                        req.session.mid=rows[0].id;
                      }
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

      app.post('/new',(req,res)=>{
        console.log(req.body);
        var post=req.body;
        var title=post.title;
        var description=post.description;
        var link=post.link;
        var sql="INSERT INTO sarticle(title,description,link) values (?,?,?)";
        var newarticle=[title,description,link];
        conn.query(sql,newarticle,(err,data)=>{
          if(err) throw err;  
          res.redirect('/articles');
        });
    });    
      
    const PORT=process.env.port || 5000;
app.listen(PORT);

  


