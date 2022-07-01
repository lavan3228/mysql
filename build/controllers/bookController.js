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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joiValidation_1 = __importDefault(require("../joiValidation"));
const bookModel_1 = __importDefault(require("../models/bookModel"));
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
app.use(express_1.default.json());
class bookAPIControllers {
    constructor() {
        // 1. get all Books
        this.getBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const books = yield bookModel_1.default.findAll();
            res.send({
                status_code: 200,
                message: "Success",
                data: books
            });
        });
        // 2. get single Book
        this.getBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const oneBook = yield bookModel_1.default.findOne({ where: { id: id } });
                if (!oneBook) {
                    res.send({
                        status: 400,
                        message: "Book is Not Exists"
                    });
                }
                else {
                    res.send({
                        status: 200,
                        message: "Success",
                        data: oneBook
                    });
                }
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err.message
                });
            }
        });
        // 3. create Book
        this.CreateBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield joiValidation_1.default.createBookValidation.validateAsync(req.body);
                const postBook = yield bookModel_1.default.create({
                    title: result.title,
                    AuthorId: result.AuthorId,
                    rating: result.rating,
                    pages: result.pages,
                    price: result.price,
                });
                console.log(postBook);
                res.send({
                    status: 200,
                    message: "Book Created Successfully",
                    data: postBook
                });
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err.errors
                });
            }
        });
        // 4. update Book
        this.updateBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield joiValidation_1.default.updateBookValidation.validateAsync(req.body);
                console.log(result);
                const update = yield bookModel_1.default.update({
                    title: result.title,
                    AuthorId: result.AuthorId,
                    rating: result.rating,
                    pages: result.pages,
                    price: result.price
                }, { where: { id: id } });
                console.log(update);
                const updatebook = yield bookModel_1.default.findOne({ where: { id: id } });
                res.send({
                    status: 200,
                    message: "Success",
                    data: updatebook
                });
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err
                });
            }
        });
        // 5. delete Book by id
        this.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const deleteBook = yield bookModel_1.default.findOne({ where: { id: id } });
            if (deleteBook === null) {
                res.send({
                    status_code: 400,
                    message: "Book is not existed",
                    data: null
                });
            }
            else {
                const bookDelete = yield bookModel_1.default.destroy({ where: { id: req.params.id } });
                res.send({
                    status: 200,
                    message: "Success",
                    data: bookDelete
                });
            }
        });
        // 6. get Books price >= 600
        this.getBooksWithPrice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const books = yield bookModel_1.default.findAll({
                where: {
                    price: {
                        [sequelize_1.Op.gt]: 600
                    }
                }
            });
            res.send({
                status_code: 200,
                message: "Success",
                data: books
            });
        });
        // 7. get books count
        this.getBooksWithmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const books = yield bookModel_1.default.count({ where: { id: { [sequelize_1.Op.gt]: 0 } } });
            res.send({
                status_code: 200,
                message: "Success",
                data: books
            });
        });
        // 8. get books user wants (in query params).
        this.getBooksWithQuery = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { offset, limit, order_by = "price", order, search_q } = req.query;
                console.log(req.query);
                const books = yield bookModel_1.default.findAll({
                    order: [[order_by, order]],
                    offset: parseInt(offset) || 0,
                    limit: parseInt(limit) || 10,
                    search_q: search_q || "",
                });
                res.send({
                    status: 200,
                    message: "Success",
                    data: books
                });
            }
            catch (err) {
                res.send({
                    status: 400,
                    message: err.message
                });
            }
        });
    }
}
exports.default = new bookAPIControllers;
