const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('config')
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalMongoose  = require('passport-local-mongoose');



const app = express();
let cors = require("cors");
require("./database/db")();
require("./startup/routes")(app);



//Express session
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false
}));


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");//not very sure about the (passport),i was trying to check if not passing a parameter was the issue.

// app.use(express.static("public"));
// app.use(session({ secret: "cats" }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());



app.use('/auth', require('./routes/auth'));



app.use(cors());
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});

module.exports = server;
