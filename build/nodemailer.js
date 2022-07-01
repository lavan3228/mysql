"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// initialize transporter
function mailer(value) {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        port: 5252,
        secure: false,
        requireTLS: true,
        auth: {
            user: "ck301878@gmail.com",
            pass: "iuhlglizifcqzphm"
        },
        logger: true,
        debug: true,
    });
    const options = {
        from: "ck301878@gmail.com",
        to: value,
        subject: "User Created Successfully",
        template: 'email'
        //text:"look hear!"
    };
    transporter.sendMail(options, (err, info) => {
        if (err)
            throw err;
        console.log("email is sent" + info.response);
    });
}
exports.default = mailer;
