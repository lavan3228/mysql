"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const authorController_1 = __importDefault(require("../controllers/authorController"));
const middleware_1 = __importDefault(require("../middleware"));
let router = express.Router();
router.get("/allAuthors", middleware_1.default, authorController_1.default.allAuthors);
router.get("/getAuthor/:id", middleware_1.default, authorController_1.default.getAuthor);
router.post("/create", middleware_1.default, authorController_1.default.CreateAuthor);
router.put("/updateAuthor/:id", middleware_1.default, authorController_1.default.updateAuthor);
router.delete("/deleteAuthor/:id", middleware_1.default, authorController_1.default.deleteAuthor);
router.get("/AuthorsWithBooks", middleware_1.default, authorController_1.default.getAuthorsWithBooks);
router.get("/AuthorWithBooks/:id", middleware_1.default, authorController_1.default.getAuthorWithBooks);
exports.default = router;
