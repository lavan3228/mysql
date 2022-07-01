"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const conn_1 = __importDefault(require("../db/conn"));
let Book = conn_1.default.define("Book", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: sequelize_1.default.STRING,
        unique: true,
        allowNull: false,
    },
    author_id: {
        type: sequelize_1.default.NUMBER,
        allowNull: false
    },
    rating: {
        type: sequelize_1.default.NUMBER,
        allowNull: false
    },
    description: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    pages: {
        type: sequelize_1.default.NUMBER,
        allowNull: false
    },
    edition_language: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.default.NUMBER,
        allowNull: false
    },
    online_stores: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Book;
