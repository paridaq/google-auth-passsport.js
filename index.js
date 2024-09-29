const express = require('express')
const passport = require('passport')
const session = require('express-session')
const dotenv = require('dotenv')
require ('./passport.js')
 const app =express();

 function isLoggedIn(req,res,next){
    req.user?next():res.sendStatus(401)
 }
    
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 

 app.get('/',(req,res)=>{
    res.send('<a href="/google">authenticate with Google</a>')
 })

 app.get('/google',
    passport.authenticate('google',{scope:['email','profile']})


 )
 app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/google/failure'
    }
        
    )
 )
 app.get('/protected',isLoggedIn,(req,res)=>{
    res.send(`hello ${req.user.displayName}`)
 })

 app.get('/logout',(req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('Goodbye!')
 })
 app.get('/google/failure',(req,res)=>{
    res.send('failed to authenticate')

 })
 app.listen(8080,()=>{
    console.log('port is listening on 8080')
 })