const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { Department } = require("../models/department");
const {
    User,
    validateRegisterInput,
    generateToken,
} = require("../models/user");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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
        const { error } = validateRegisterInput(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const matchingEmail = await User.findOne({ email: req.body.email });
        const matchingRegNo = await User.findOne({ regNo: req.body.regNo });
        if (matchingEmail)
            return res
                .status(400)
                .send("User with this email is already registered.");
        if (matchingRegNo)
            return res
                .status(400)
                .send(
                    "User with this registration number is already registered."
                );
        const department = await Department.findOne({
            name: req.body.department,
        });
        const { email, password, name, type, regNo } = req.body;
        let newUser = new User({
            email,
            password,
            name,
            regNo,
            type,
        });
        newUser.department = department;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        const token = generateToken(newUser);
        const response = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            department: newUser.department,
            type: newUser.type,
            regNo: newUser.regNo,
            token,
        };
        newUser = await newUser.save();

        res.send(response);
    } catch (error) {
        console.log("Internal Server Error:", error);
    }
});

module.exports = router;
