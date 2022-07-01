"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const joiValidation_1 = __importDefault(require("../joiValidation"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("../nodemailer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
class userControllers {
    constructor() {
        // 1. get all users
        this.allUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield userModel_1.default.findAll();
            res.send({
                status_code: 200,
                message: "Success",
                data: users
            });
        });
        // 2. get single user by id/username/mail
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const returnResponse = {
                status: 400,
                message: null,
                data: null
            };
            try {
                const username = req.params.id;
                let oneUser;
                if (username.endsWith(".com")) {
                    oneUser = yield userModel_1.default.findOne({ where: { mail: username } });
                }
                else if (username.length < 3) {
                    oneUser = yield userModel_1.default.findOne({ where: { id: username } });
                }
                else {
                    oneUser = yield userModel_1.default.findOne({ where: { username: username } });
                }
                if (!oneUser) {
                    returnResponse.message = 'User Not exists';
                }
                else {
                    returnResponse.status = 200;
                    returnResponse.message = 'Success';
                    returnResponse.data = oneUser;
                }
            }
            catch (err) {
                returnResponse.message = err.message;
            }
            return res.send(returnResponse);
        });
        // 3. create user
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, mail, password } = yield joiValidation_1.default.createUserValidation.validateAsync(req.body);
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const postUser = yield userModel_1.default.create({
                    username: username,
                    mail: mail,
                    password: hashedPassword,
                });
                (0, nodemailer_1.default)(mail);
                res.send({
                    status: 200,
                    message: "User created successfully",
                    data: postUser
                });
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err.message
                });
            }
        });
        // 4. login user
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const dbUser = yield userModel_1.default.findOne({ where: { username: username } });
                if (!dbUser) {
                    res.send({
                        status: 400,
                        message: "Invalid User"
                    });
                }
                else {
                    const isPasswordMatched = yield bcrypt_1.default.compare(password, dbUser.password);
                    if (isPasswordMatched === true) {
                        const payload = { username: username };
                        const jwtToken = jsonwebtoken_1.default.sign(payload, "bdjjbesskndh");
                        res.send({ jwtToken });
                    }
                    else {
                        res.send({
                            status: 400,
                            message: "Incorrect Password"
                        });
                    }
                }
            }
            catch (err) {
                console.log(err);
                res.send({
                    status: 400,
                    message: err.message
                });
            }
        });
        // 5. update User
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield joiValidation_1.default.updateUserValidation.validateAsync(req.body);
                yield userModel_1.default.update({
                    username: result.username,
                    mail: result.mail,
                    password: result.password,
                }, { where: { id: id } });
                const updateuser = yield userModel_1.default.findOne({ where: { id: id } });
                res.send({
                    status: 200,
                    message: "Success",
                    data: updateuser
                });
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err.message,
                });
            }
        });
        // 6. delete User by id
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const deleteUser = yield userModel_1.default.findOne({ where: { id: id } });
            if (deleteUser === null) {
                res.send({
                    status_code: 400,
                    message: "user not exists",
                    data: null
                });
            }
            else {
                const userDelete = yield userModel_1.default.destroy({ where: { id: req.params.id } });
                res.send({
                    status: 200,
                    message: "Success",
                    data: userDelete
                });
            }
        });
        // 7. login user profile 
        this.loginUserProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { username } = req.body;
            const user = yield userModel_1.default.findOne({ where: { username: username } });
            res.send({
                status: 200,
                message: "Success",
                data: user
            });
        });
        // 8. get by id/username/mail (query params)
        this.getUserQuery = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const returnResponse = {
                status: 400,
                message: null,
                data: null
            };
            try {
                let data = req.query.username || req.query.mail || req.query.id;
                let oneUser;
                console.log(data);
                if (data.endsWith(".com")) {
                    oneUser = yield userModel_1.default.findOne({ where: { mail: data } });
                }
                else if (data.length < 3) {
                    oneUser = yield userModel_1.default.findOne({ where: { id: data } });
                }
                else {
                    oneUser = yield userModel_1.default.findOne({ where: { username: data } });
                }
                if (!oneUser) {
                    returnResponse.message = 'User Not exists';
                }
                else {
                    returnResponse.status = 200;
                    returnResponse.message = 'Success';
                    returnResponse.data = oneUser;
                }
            }
            catch (err) {
                returnResponse.message = err.message;
            }
            return res.send(returnResponse);
        });
    }
}
module.exports = new userControllers;
