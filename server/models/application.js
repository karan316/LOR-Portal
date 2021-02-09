const Joi = require("joi");
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // TODO: use ref: "Department instead of string"
    facultyDepartment: {
        type: String,
        required: true,
    },
    studentDepartment: {
        type: String,
        required: true,
    },

    statementOfPurpose: {
        type: String,
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
        faculty: Joi.string().required(),
        student: Joi.string().required(),
        facultyDepartment: Joi.string().required(),
        studentDepartment: Joi.string().required(),
        statementOfPurpose: Joi.string().required().min(10),
        status: Joi.string().required(),
    });
    return schema.validate(application);
}

exports.Application = Application;
exports.validateApplication = validateApplication;
exports.applicationSchema = applicationSchema;
