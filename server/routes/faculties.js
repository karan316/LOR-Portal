const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Department } = require("../models/department");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
    try {
        const faculties = await User.find({
            type: "faculty",
        });

        res.send(faculties);
    } catch (error) {
        res.status(400).send(error);
        console.log("error occurred: ", error);
    }
});

module.exports = router;
