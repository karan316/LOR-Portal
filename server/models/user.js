const Joi = require("joi");
const mongoose = require("mongoose");
const { Application } = require("./application");
const jwt = "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    department: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    regNo: {
        type: String,
        required: true,
    },
    applications: [
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }],
    ],
});

const User = mongoose.model("User", userSchema);

function validateRegisterInput(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().required().min(5).max(100),
        type: Joi.string().required(),
        department: Joi.string().required(),
        regNo: Joi.string().required(),
    });
    return schema.validate(user);
}

function validateLoginInput(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().required().min(5).max(100)
    })

    return schema.validate(user);
}

function generateToken(user) {
    return jwt.sign(
        {
            email: user.email,
            regNo: user.regNo,
            id: user._id
        }
    )
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateRegisterInput = validateRegisterInput;
exports.validateLoginInput = validateLoginInput;