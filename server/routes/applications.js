const express = require("express");
const router = express.Router();
const { Application, validateApplication } = require("../models/application");
const { User } = require("../models/user");
const auth = require("../middlewares/auth");
// TODO: delete this route
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();
        res.send(applications);
    } catch (error) {
        console.error(error);
    }
});

// get application by userId
router.get("/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        let applications;
        if (user.type === "student") {
            console.log("student id");
            applications = await Application.find({
                student: user.id,
            }).populate("faculty");
        } else {
            console.log("faculty id");
            applications = await Application.find({
                faculty: user.id,
            }).populate("student");
        }
        console.log(user.id);
        if (applications.length === 0) {
            res.status(404).send("Applications not found for this user");
            return;
        }
        res.send(applications);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { error } = validateApplication(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const facultyUser = await User.findById(req.body.faculty);
        const studentUser = await User.findById(req.body.student);
        const application = new Application({
            faculty: facultyUser._id,
            student: studentUser._id,
            studentDepartment: req.body.studentDepartment,
            facultyDepartment: req.body.facultyDepartment,
            statementOfPurpose: req.body.statementOfPurpose,
            status: req.body.status,
        });
        await application.save((error) => {
            if (error) {
                console.error(error);
                return;
            }
        });
        res.send(application);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});
router.patch("/:id", auth, async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!application) {
            res.status(404).send("Application not found");
            return;
        }

        res.send(application);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});
router.delete("/:id", auth, async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        if (!application) {
            res.status(404).send("Application not found");
            return;
        }
        res.send(application);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

module.exports = router;
