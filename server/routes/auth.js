const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');


const passport = require('passport');
            require('../config/passport');

const config = require('config');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
let errors =[];

const { User, validateUser } = require("../models/user");





//LOgin handle
router.post('/',
passport.authenticate('local') ,async function(req, res ) {
 try{  
const email = req.body.email;
const password =  await req.body.password;
const user = User.findOne({email : email});
if(!user){
    return res.status(400).send('USER doesnot exit,please register first');
}else{ 
    const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){
               req.logIn(user , function(){
                   res.send.status(200).send(user);
               })
            }else {
                res.status(400).send('The entered password is incorrect!!')
            }
                
        }
   
    } catch (error) {
    console.log("Error Occured:",error);
}
});





//Logout Handle
router.post('/logout' ,async (req, res) => {
    try{
    const logout = await req.logout();
    }catch (error) {
   return res.status(400).send(user);
    }
      
});




module.exports= router;