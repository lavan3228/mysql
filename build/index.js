"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorRoute_1 = __importDefault(require("./routes/authorRoute"));
const bookRoute_1 = __importDefault(require("./routes/bookRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const conn_1 = __importDefault(require("./db/conn"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 4001;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
conn_1.default
    .sync()
    .then((result) => {
    console.log("DB CONNECTED");
})
    .catch((error) => {
    console.log(error);
});
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
app.use("/user", userRoute_1.default);
app.use("/author", authorRoute_1.default);
app.use("/book", bookRoute_1.default);
