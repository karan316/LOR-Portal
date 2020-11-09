const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { User, validateLoginInput, generateToken } = require("../models/user");

router.post("/", async (req, res) => {
    try {
        const { error } = validateLoginInput(req.body);
        if (error) {
            res.status(400).send(errors.details[0].message);
            return;
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            res.status(400).send("Invalid credentials");
            return;
        }
        const token = generateToken(user);
        const response = {
            id: user.id,
            email: user.email,
            name: user.name,
            department: user.department,
            type: user.type,
            regNo: user.regNo,
            token,
        };
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("Unexpected error occurred");
    }
});

module.exports = router;
