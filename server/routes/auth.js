const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');


const passport = require('passport');
            require('../config/passport');

const config = require('config');
const Joi = require('joi');
const _ = require('lodash');
let errors =[];

const { User, validateUser } = require("../models/user");


// router.use(passport.initialize()




  router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {  return res.status(400).send('USER doesnot exit,please register first'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.status(400).send('done');
      });
    })(req, res, next);
  })


//Logout Handle
router.post('/logout' ,async (req, res) => {
    try{
    const logout = await req.logout();
    }catch (error) {
   return res.status(400).send(user);
    }
      
});




module.exports= router;