const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const passport = require('passport');
const config = require('config');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {ensureAuthenticated} = require('../middleware/ensure');
let errors =[];

const { User, validateUser } = require("../models/User");

//welcome page
router.get('/',async(req,res) => {
{
     const { error } = validateUser(req.body);
     if (error) {
        res.status(400).send(error.details[0].message);
         return;
        }
    }
});


//dashboard
 router.get('/dashboard',(req, res) => res.render('dashboard'));

//  module.exports = User = mongoose.model('user', UserSchema)

//LOGIN
router.get('/auth',  async function CheckUser(req,res) {
 const username = req.body.email;
    const password =  await req.body.password;
    const body = req.body;
    const errors = validationResult(req);
try{
                  const existing = User.findOne({email : username});
if(!existing){
    return res.status(400).send('USER doesnot exit,please register first');
}else{ 
    const validPassword = await bcrypt.compare(password, User.password);
            if(validPassword){
               req.logIn(user , function(){
                   res.send('DONE!!!');
               })
            }else {
                res.status(400).send('The entered password is incorrect!!')
            }
                
        }
    
} catch (error) {
    console.log(error);
}
});

    





//LOgin handle
router.post('/auth',
passport.authenticate('local') , function(req, res ) {
    return res.send('req.user');
});




//Logout Handle
router.get('/logout' ,async (req, res) => {
    try{
    const logout = await req.logout();
    }catch (error) {
   return res.status(400).send('Unsuccesfull!');
    }
      
});




module.exports= router;
