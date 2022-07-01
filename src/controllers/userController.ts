import express, { Application, Request, Response } from "express";
import validation from "../joiValidation";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import mailer from "../nodemailer"


const app:Application = express();

app.use(express.json());


class userControllers  {

    // 1. get all users
    allUsers = async (req:Request,res:Response) =>{
        const users =  await User.findAll()
        res.send({
                status_code: 200,
                message:"Success",
                data: users
            })
    }
    
    // 2. get single user by id/username/mail
    getUser = async(req:Request, res:Response) =>{
        const returnResponse: any = {
            status: 400,
            message: null,
            data: null
        }
        try{
            const username:String = req.params.id;
            let oneUser;
            if (username.endsWith(".com")) {
                oneUser = await User.findOne({where:{mail:username}})
            } else if (username.length < 3) {
                oneUser = await User.findOne({where:{id:username}})
            } else {
                oneUser = await User.findOne({where:{username:username}})
            }
            
            if(!oneUser){
                returnResponse.message = 'User Not exists';
            } else{
                returnResponse.status = 200;
                returnResponse.message = 'Success';
                returnResponse.data = oneUser
            }
        }catch(err:any){
            returnResponse.message = err.message;
        } 
        return res.send(returnResponse);
    }

    // 3. create user
    createUser = async(req:Request,res:Response) =>{
        try{
            const {username, mail, password} = await validation.createUserValidation.validateAsync(req.body)
            const hashedPassword = await bcrypt.hash(password, 10);
            const postUser = await User.create({
                username:username, 
                mail:mail, 
                password:hashedPassword, 
            })
            mailer(mail);
            res.send({
                    status: 200,
                    message: "User created successfully",
                    data: postUser
            
            })
        }catch(err:any){
            res.send({
            status: 400,
            message: err.message
            })
        } 
    }

    // 4. login user
    loginUser = async(req:Request,res:Response) =>{
        try{
            const {username, password} =  req.body
            const dbUser = await User.findOne({where:{username:username}});
            
            if (!dbUser) {
                res.send({
                    status: 400,
                    message: "Invalid User"
                })
            }else {
                const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
                
                if (isPasswordMatched === true) {
                    const payload = {username:username};
                    const jwtToken = jwt.sign(payload, "bdjjbesskndh");

                    res.send({jwtToken});
                }else {
                    res.send({
                        status: 400,
                        message: "Incorrect Password"
                    })
                }
            }
        }catch(err:any){
            console.log(err)
            res.send({
            status: 400,
            message: err.message
            })
        } 
    }

    // 5. update User
    updateUser = async(req: Request,res:Response) =>{
        try{
        const {id} = req.params
        const result = await validation.updateUserValidation.validateAsync(req.body)
        await User.update({
            username:result.username,
            mail:result.mail,
            password:result.password, 
        },{where:{id:id}})
        const updateuser = await User.findOne({where:{id:id}})
        res.send({
            status: 200,
            message: "Success",
            data: updateuser
        })
        }catch(err: any){
            res.send({
            status: 400,
            message: err.message,
        })
        }
    }

    // 6. delete User by id
    deleteUser = async(req:Request,res:Response)=>{
        const id = req.params.id
        const deleteUser = await User.findOne({where:{id:id}})
        
        if (deleteUser === null) {
            res.send({
                status_code:400,
                message:"user not exists",
                data:null
            })
        }else {
            const userDelete = await User.destroy({where:{id:req.params.id}})
            res.send({
                status: 200,
                message: "Success",
                data: userDelete
            })
        }
    }

    // 7. login user profile 
    loginUserProfile = async(req:Request, res: Response)=> {
        let { username } = req.body;
        const user = await User.findOne({where:{username:username}})
        res.send({
            status: 200,
            message:"Success",
            data: user
        });
    }

    // 8. get by id/username/mail (query params)
    getUserQuery = async(req:Request, res:Response) =>{
        const returnResponse: any = {
            status: 400,
            message: null,
            data: null
        }
        try{
            let data:any = req.query.username || req.query.mail || req.query.id; 
            let oneUser;
            console.log(data);
            if(data.endsWith(".com")) {
                oneUser = await User.findOne({where:{mail:data}})
            }else if(data.length < 3) {
                oneUser = await User.findOne({where:{id:data}})
            }else {
                oneUser = await User.findOne({where:{username:data}})
            }
            
            
            if(!oneUser){
                returnResponse.message = 'User Not exists';
            } else{
                returnResponse.status = 200;
                returnResponse.message = 'Success';
                returnResponse.data = oneUser
            }
        }catch(err:any){
            returnResponse.message = err.message;
        } 
        return res.send(returnResponse);
    }
    

}
    export = new userControllers;  
