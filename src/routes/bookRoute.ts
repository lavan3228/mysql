import * as express from "express";
import bookAPIControllers from "../controllers/bookController";
import authenticateToken from "../middleware"

let router = express.Router();

router.get("/getAllBooks",authenticateToken, bookAPIControllers.getBooks);
router.get("/getBook/:id",authenticateToken, bookAPIControllers.getBook);
router.post("/createBook",authenticateToken, bookAPIControllers.CreateBook);
router.put("/updateBook/:id",authenticateToken, bookAPIControllers.updateBook);
router.delete("/deleteBook/:id",authenticateToken, bookAPIControllers.deleteBook);

router.get("/bookprice",authenticateToken, bookAPIControllers.getBooksWithPrice);
router.get("/bookscount",authenticateToken, bookAPIControllers.getBooksWithmin);
router.get("/books",authenticateToken, bookAPIControllers.getBooksWithQuery);

 
export default router;