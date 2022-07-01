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
const authorModel_1 = __importDefault(require("../models/authorModel"));
const bookModel_1 = __importDefault(require("../models/bookModel"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
authorModel_1.default.hasMany(bookModel_1.default, {
    foreignKey: 'AuthorId',
});
bookModel_1.default.belongsTo(authorModel_1.default);
class authorControllers {
    constructor() {
        // 1. get all Authors
        this.allAuthors = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield authorModel_1.default.findAll();
            res.send({
                status_code: 200,
                message: "Success",
                data: users
            });
        });
        /**
         * This helps to get the author details based on the id
         * @param req - This contains id of the author to extract,
         * @param res - returns returnResponse object
         */
        this.getAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const returnResponse = {
                status: 400,
                message: null,
                data: null
            };
            try {
                const id = req.params.id;
                const oneUser = yield authorModel_1.default.findOne({ where: { id: id } });
                if (!oneUser) {
                    returnResponse.message = 'Author Not Exists';
                }
                else {
                    returnResponse.status = 200;
                    returnResponse.message = 'success';
                    returnResponse.data = oneUser;
                }
            }
            catch (err) {
                returnResponse.message = err.message;
            }
            return res.send(returnResponse);
        });
        // 3. create Author
        this.CreateAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield joiValidation_1.default.createAuthorValidation.validateAsync(req.body);
                const postAuthor = yield authorModel_1.default.create({
                    name: result.name,
                    gender: result.gender,
                    birth_place: result.birth_place,
                });
                res.send({
                    status: 200,
                    message: "Author Created Successfully",
                    data: postAuthor
                });
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err
                });
            }
        });
        // 4. update Author
        this.updateAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield joiValidation_1.default.updateAuthorValidation.validateAsync(req.body);
                yield authorModel_1.default.update({
                    name: result.name,
                    gender: result.gender,
                    birth_place: result.birth_place,
                }, { where: { id: id } });
                const updateuser = yield authorModel_1.default.findOne({ where: { id: id } });
                res.send({
                    status: 200,
                    message: "Success",
                    data: updateuser
                });
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err
                });
            }
        });
        // 5. delete Author by id
        this.deleteAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const deleteAuthor = yield authorModel_1.default.findOne({ where: { id: id } });
            if (deleteAuthor === null) {
                return res.send({
                    status_code: 400,
                    message: "user not existed",
                    data: null
                });
            }
            else {
                const authorDelete = yield authorModel_1.default.destroy({ where: { id: req.params.id } });
                res.send({
                    status: 200,
                    message: "Success",
                    data: authorDelete
                });
            }
        });
        // 6. getAuthors(withBooks)
        this.getAuthorsWithBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield authorModel_1.default.findAll({
                include: [{
                        model: bookModel_1.default,
                        required: true,
                        attributes: ["title", "rating", "pages", "price"]
                    }],
                attributes: ["id", "name", "gender", "birth_place"]
            });
            res.send({
                status: 200,
                message: "Success",
                data: data
            });
        });
        // 7. getAuthor(withBooks)
        this.getAuthorWithBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = yield authorModel_1.default.findOne({
                include: [{
                        model: bookModel_1.default,
                        required: true,
                        attributes: ["title", "rating", "pages", "price"]
                    }],
                attributes: ["id", "name", "gender", "birth_place"], where: { id: id }
            });
            if (data === null) {
                res.send({
                    status_code: 400,
                    message: "Author not exists",
                    data: null
                });
            }
            else {
                res.send({
                    status_code: 200,
                    message: "Success",
                    data: data
                });
            }
        });
    }
}
module.exports = new authorControllers;
