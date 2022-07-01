import nodemailer from "nodemailer";
import express from "express";

const app = express();

// initialize transporter

function mailer(value:any){
    const transporter = nodemailer.createTransport({
        service : "gmail",
        port : 5252,
        secure : false,
        requireTLS : true,
        auth :{
            user : "ck301878@gmail.com",
            pass : "iuhlglizifcqzphm"
        },
        logger : true ,
        debug : true,
    })

    const options = {
        from : "ck301878@gmail.com",
        to  : value,
        subject : "User Created Successfully",                                                                                                                                                                                                                                                                                                                                                                                                                                   
        template : 'email'
        //text:"look hear!"
    }


    transporter.sendMail(options , (err:any , info:any) =>{
        if (err) throw err
        console.log("email is sent" + info.response)
    })

}

export default mailer;



