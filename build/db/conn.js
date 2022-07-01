"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectWithSequelize = new sequelize_1.Sequelize("jwtVerification", "root", "Root@123", {
    dialect: "mysql",
    host: "localhost"
});
exports.default = connectWithSequelize;
