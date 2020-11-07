const users = require("../routes/users");
const applications = require("../routes/applications");
const departments = require("../routes/departments");
const express = require("express");

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use("/api/users", users);
    app.use("/api/applications", applications);
    app.use("/api/departments", departments);
};
