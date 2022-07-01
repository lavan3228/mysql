import express, { Application, Request, Response } from "express";
import { Sequelize } from "sequelize/types";
import validation from "../joiValidation";
import Book from "../models/bookModel";
import { Op } from "sequelize";

const app:Application = express();

app.use(express.json());


class bookAPIControllers {

    // 1. get all Books
    getBooks = async (req:Request,res:Response) =>{
        const books =  await Book.findAll()   
        res.send({
            status_code: 200,
            message:"Success",
            data: books
        })
    }            
    
    // 2. get single Book
    getBook = async(req:Request, res:Response) =>{
        try{
            const id = req.params.id
            const oneBook = await Book.findOne({where:{id:id}})
            if(!oneBook){
                res.send({
                    status: 400,
                    message:"Book is Not Exists"
                })
            }else{
                res.send({
                    status: 200,
                    message:"Success",
                    data: oneBook
            })
            }
        }catch(err:any){
            res.send({
            status: 400,
            message: err.message
            })
        } 
    }

   // 3. create Book
    CreateBook = async(req:Request,res:Response) =>{
        try{
            const result = await validation.createBookValidation.validateAsync(req.body)
            const postBook = await Book.create({
                title:result.title, 
                AuthorId:result.AuthorId, 
                rating:result.rating,
                pages:result.pages,
                price:result.price,
            })
            console.log(postBook    )
            res.send({
                    status: 200,
                    message: "Book Created Successfully",
                    data: postBook
            })
        }catch(err:any){
            res.send({
            status: 400,
            message: err.errors
            })
        } 
    }

   // 4. update Book
    updateBook = async(req: Request,res:Response) =>{
        try{
        const {id} = req.params
        const result:any = await validation.updateBookValidation.validateAsync(req.body)
        console.log(result);
        
        const update:any = await Book.update({
            title:result.title, 
                AuthorId:result.AuthorId, 
                rating:result.rating,
                pages:result.pages,
                price:result.price 
        },{where:{id:id}})
        console.log(update)
        const updatebook = await Book.findOne({where:{id:id}})
        res.send({
            status: 200,
            message: "Success",
            data: updatebook
        })
        }catch(err: any){
            res.send({
            status: 400,
            message: err
        })
        }
    }

    // 5. delete Book by id
    deleteBook = async(req:Request,res:Response)=>{
        const id = req.params.id
        const deleteBook = await Book.findOne({where:{id:id}})
        
        if (deleteBook === null) {
            res.send({
                status_code:400,
                message:"Book is not existed",
                data:null
            })
        }else {
            const bookDelete = await Book.destroy({where:{id:req.params.id}})
            res.send({
                status: 200,
                message: "Success", 
                data: bookDelete
            })
        }
    }
    
    // 6. get Books price >= 600
    getBooksWithPrice = async (req:Request,res:Response) =>{
        const books =  await Book.findAll({
            where: {
                price:{
                [Op.gt]:600
                }
            }
        });   
        res.send({
            status_code: 200,
            message:"Success",
            data: books
        })
    }    

    // 7. get books count
    getBooksWithmin = async (req:Request,res:Response) =>{
        const books =  await Book.count({where:{id:{[Op.gt]:0}}})
        res.send({
            status_code: 200,
            message:"Success",
            data: books
        })
    } 

    // 8. get books user wants (in query params).
    getBooksWithQuery = async (req: Request, res: Response) => {
        try{
            const { offset, limit, order_by = "price", order, search_q }: any = req.query;
            console.log(req.query);
            const books = await Book.findAll ({
                order:[[order_by, order]],
                offset: parseInt(offset) || 0,
                limit: parseInt(limit) || 10,
                search_q: search_q || "" ,  
                
            })
            res.send({    
                status: 200,
                message: "Success",
                data: books

            })
        }catch(err:any){
            res.send({
                status: 400,
                message: err.message
            })
        }
    }

}
    

export default new bookAPIControllers;
