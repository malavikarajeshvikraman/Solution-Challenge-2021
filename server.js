const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session=require('express-session');

const app=express();

app.use(express.static('public'));
app.use(fileUpload());

app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{ //cookie
      httponly: true,
      maxAge:60*60*1000, //set to 1 hour
      secure:false
      }}));



const PORT=process.env.port || 8000;
app.listen(PORT);