const express = require("express");
const users = require("../routes/users");
const applications = require("../routes/applications");
const departments = require("../routes/departments");
const auth = require("../routes/auth");

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use("/api/users", users);
    app.use("/api/applications", applications);
    app.use("/api/departments", departments);
    app.use("/api/auth", auth);
};
