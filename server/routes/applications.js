const express = require("express");
const router = express.Router();
const { Application, validateApplication } = require("../models/application");
const { User } = require("../models/user");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();
        res.send(applications);
    } catch (error) {
        console.error(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const applications = await Application.find({
            "faculty._id": req.params.id,
        });
        res.send(applications);
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});

// TODO: add auth, validateObjectId middleware
router.post("/", auth, async (req, res) => {
    try {
        const { error } = validateApplication(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const facultyUser = await User.findById(req.body.facultyId);
        const studentUser = await User.findById(req.body.studentId);
        const application = new Application({
            faculty: {
                _id: facultyUser._id,
                name: facultyUser.name,
                department: facultyUser.department,
            },
            student: {
                _id: studentUser._id,
                name: studentUser.name,
                department: facultyUser.department,
            },
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
// TODO: add auth, validateObjectId middleware
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
// TODO: add auth, validateObjectId middleware
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
