import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    let jwtToken;
    //Step1: Extract the token from request header
    const authheader: any = req.headers["authorization"];
    if (!authheader) {
        //No access
        return res.send({
            status: 401,
            message: "Invalid Access Token"
        })
    }
    //Step 2: Verify JWT
    jwtToken = authheader.split(" ")[1];
    jwt.verify(jwtToken, "bdjjbesskndh", async (error: any, payload: any) => {
        if (error) {
            res.send({
                status: 401,
                message: "Invalid Access Token"
            })
        } else {
            //req.body.username = payload.username;
            next();
        }
    });
}

export default authenticateToken;


