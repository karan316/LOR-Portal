const Joi = require("joi");
const mongoose = require("mongoose");
const { facultyUserSchema } = require("../models/facultyUser");
const { studentUserSchema } = require("../models/studentUser");

const applicationSchema = new mongoose.Schema({
    faculty: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            info: {
                _id: mongoose.Schema.Types.ObjectId,
                name: String,
            },
        },
        required: true,
    },
    student: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            info: {
                _id: mongoose.Schema.Types.ObjectId,
                name: String,
            },
        },
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const Application = mongoose.model("Application", applicationSchema);

function validateApplication(application) {
    const schema = Joi.object({
        facultyId: Joi.string().required(),
        studentId: Joi.string().required(),
        status: Joi.string().required(),
    });
    return schema.validate(application);
}

exports.Application = Application;
exports.validateApplication = validateApplication;
exports.applicationSchema = applicationSchema;
