const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { Department } = require("../models/department");
const { Application } = require("../models/application");

const { User, validateUser } = require("../models/user");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({path: 'applications', model: "Application"});
        if(user.populated())
            console.log("user is populated", user.applications);
        else console.log("user is not populated", user.applications);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.send(user);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

router.post("/", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        let newUser = await User.findOne({ email: req.body.email });
        if (newUser) return res.status(400).send("User already registered.");

        const department = await Department.findOne({
            name: req.body.department,
        });

        newUser = new User(
            _.pick(req.body, ["email", "password", "name", "type", "regNo" ])
        );

        newUser.department = department;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
