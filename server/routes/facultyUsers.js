const express = require("express");
const router = express.Router();
const { FacultyUser, validateFacultyUser } = require("../models/facultyUser");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
    try {
        const faculties = await FacultyUser.find();
        res.send(faculties);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const faculty = await FacultyUser.findById(req.params.id).populate({
            path: "applications",
        });
        if (!faculty) {
            res.status(404).send("Faculty not found");
            return;
        }
        res.send(faculty);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

router.post("/", async (req, res) => {
    try {
        const { error } = validateFacultyUser(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        // const applications = await Application.find({
        //     "faculty._id": req.query.facultyId,
        // });

        const user = await User.findOne({
            _id: req.body.userId,
        });

        const faculty = new FacultyUser({
            info: user,
            regNo: req.body.regNo,
            // applications: applications ? applications : null,
        });
        await faculty.save((error) => {
            if (error) {
                console.error("Error saving the document: ", error);
                return;
            }
        });
        res.send(faculty);
    } catch (error) {
        console.error("Error occurred: ", error);
    }
});
module.exports = router;
