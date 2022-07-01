"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class validation {
    constructor() {
        // author validation
        this.createAuthorValidation = joi_1.default.object({
            name: joi_1.default.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().required(),
            gender: joi_1.default.string().valid('male', 'female').required(),
            birth_place: joi_1.default.string().min(2).max(16).required(),
        });
        this.updateAuthorValidation = joi_1.default.object({
            name: joi_1.default.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().optional(),
            gender: joi_1.default.string().valid('male', 'female').optional(),
            birth_place: joi_1.default.string().min(2).max(16).optional(),
        });
        //book validation 
        this.createBookValidation = joi_1.default.object({
            title: joi_1.default.string().min(2).max(124).trim().required(),
            AuthorId: joi_1.default.number().integer().required(),
            rating: joi_1.default.number().min(1).max(5).required(),
            pages: joi_1.default.number().integer().required(),
            price: joi_1.default.number().integer().required()
        });
        this.updateBookValidation = joi_1.default.object({
            title: joi_1.default.string().min(2).max(124).trim().optional(),
            AuthorId: joi_1.default.number().integer().optional(),
            rating: joi_1.default.number().min(1).max(5).optional(),
            pages: joi_1.default.number().integer().optional(),
            price: joi_1.default.number().integer().optional()
        });
        //user validation
        this.createUserValidation = joi_1.default.object({
            username: joi_1.default.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().required(),
            mail: joi_1.default.string().min(5).max(32).required().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
            password: joi_1.default.string().min(3).max(15).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
        this.updateUserValidation = joi_1.default.object({
            username: joi_1.default.string().optional(),
            mail: joi_1.default.string().min(5).max(26).email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).optional(),
            password: joi_1.default.string().min(3).max(15).optional()
        });
    }
}
exports.default = new validation;
