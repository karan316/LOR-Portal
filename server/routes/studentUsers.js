const express = require("express");
const router = express.Router();
const { StudentUser, validateStudentUser } = require("../models/studentUser");
const { User } = require("../models/user");
router.get("/", async (req, res) => {
    try {
        const students = await StudentUser.find();
        res.send(students);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const student = await StudentUser.findById(req.params.id).populate(
            "applications"
        );
        if (!student) {
            res.status(404).send("Student not found");
            return;
        }
        res.send(student);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

router.post("/", async (req, res) => {
    try {
        const { error } = validateStudentUser(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        // const applications = await Application.find({
        //     "student._id": req.params.studentId,
        // });

        const user = await User.findOne({
            _id: req.body.userId,
        });

        const student = new StudentUser({
            info: user,
            regNo: req.body.regNo,
            // applications: applications ? applications : null,
        });

        await student.save((error) => {
            if (error) {
                console.error("Error saving the document: ", error);
                return;
            }
        });
        res.send(student);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

module.exports = router;
