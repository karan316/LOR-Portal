const express = require("express");
const router = express.Router();
const { Application, validateApplication } = require("../models/application");
const { User } = require("../models/user");

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
router.post("/", async (req, res) => {
    try {
        const { error } = validateApplication(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const facultyUser = await User.findById(
            req.body.facultyId
        ).select(["_id", "name", "department.name"]);
        const studentUser = await User.findById(
            req.body.studentId
        ).select(["_id", "name", "department.name"]);

        const application = new Application({
            faculty: facultyUser,
            student: studentUser,
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
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
