import express, { Application, Request, Response } from "express";
import validation from "../joiValidation";
import Author from "../models/authorModel";
import Book from "../models/bookModel";

const app: Application = express();

app.use(express.json());


Author.hasMany(Book, {
    foreignKey: 'AuthorId',
});
Book.belongsTo(Author);


class authorControllers {

    // 1. get all Authors
    allAuthors = async (req: Request, res: Response) => {
        const users = await Author.findAll()
        res.send({
            status_code: 200,
            message: "Success",
            data: users
        })
    }

    /**
     * This helps to get the author details based on the id 
     * @param req - This contains id of the author to extract, 
     * @param res - returns returnResponse object
     */
    getAuthor = async (req: Request, res: Response) => {
        const returnResponse: any = {
            status: 400,
            message: null,
            data: null
        }
        try {
            const id = req.params.id
            const oneUser = await Author.findOne({ where: { id: id } })
            if (!oneUser) {
                returnResponse.message = 'Author Not Exists';
            } else {
                returnResponse.status = 200;
                returnResponse.message = 'success';
                returnResponse.data = oneUser;
            }
        } catch (err: any) {    
            returnResponse.message = err.message;
        }
        return res.send(returnResponse);
    }

    // 3. create Author
    CreateAuthor = async (req: Request, res: Response) => {
        try {
            const result = await validation.createAuthorValidation.validateAsync(req.body)
            const postAuthor = await Author.create({
                name: result.name,
                gender: result.gender,
                birth_place: result.birth_place,
            })
            res.send({
                status: 200,
                message: "Author Created Successfully",
                data: postAuthor
            })
        } catch (err: any) {
            res.send({
                status: 400,
                message: err
            })
        }
    }

    // 4. update Author
    updateAuthor = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const result: any = await validation.updateAuthorValidation.validateAsync(req.body)
            await Author.update({
                name: result.name,
                gender: result.gender,
                birth_place: result.birth_place,
            }, { where: { id: id } })
            const updateuser = await Author.findOne({ where: { id: id } })
            res.send({
                status: 200,
                message: "Success",
                data: updateuser
            })
        } catch (err: any) {
            res.send({
                status: 400,
                message: err
            })
        }
    }

    // 5. delete Author by id
    deleteAuthor = async (req: Request, res: Response) => {
        const id = req.params.id
        const deleteAuthor = await Author.findOne({ where: { id: id } })

        if (deleteAuthor === null) {
            return res.send({
                status_code: 400,
                message: "user not existed",
                data: null
            });
        } else {
            const authorDelete = await Author.destroy({ where: { id: req.params.id } })
            res.send({
                status: 200,
                message: "Success",
                data: authorDelete
            })
        }
    }

    // 6. getAuthors(withBooks)
    getAuthorsWithBooks = async (req: Request, res: Response) => {
        const data = await Author.findAll({
            include: [{
                model: Book,
                required: true,
                attributes: ["title", "rating", "pages", "price"]
            }],
            attributes: ["id", "name", "gender", "birth_place"]
        })
        res.send({
            status: 200,
            message: "Success",
            data: data
        })
    }

    // 7. getAuthor(withBooks)
    getAuthorWithBooks = async (req: Request, res: Response) => {
        const id = req.params.id
        const data = await Author.findOne({
            include: [{
                model: Book,
                required: true,
                attributes: ["title", "rating", "pages", "price"]
            }],
            attributes: ["id","name", "gender", "birth_place"], where: { id: id }
        })
        if (data === null) {
            res.send(
                {
                    status_code: 400,
                    message: "Author not exists",
                    data: null
                }
            )
        } else {
            res.send({
                status_code: 200,
                message: "Success",
                data: data
            })
        }
    }
}


export = new authorControllers;
