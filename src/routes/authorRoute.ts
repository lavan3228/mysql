import * as express from "express";
import authorControllers from "../controllers/authorController";
import authenticateToken from "../middleware"

let router = express.Router();

router.get("/allAuthors",authenticateToken, authorControllers.allAuthors);
router.get("/getAuthor/:id",authenticateToken, authorControllers.getAuthor);
router.post("/createAuthor",authenticateToken, authorControllers.CreateAuthor);
router.put("/updateAuthor/:id",authenticateToken, authorControllers.updateAuthor);
router.delete("/deleteAuthor/:id",authenticateToken, authorControllers.deleteAuthor);

router.get("/AuthorsWithBooks",authenticateToken, authorControllers.getAuthorsWithBooks);
router.get("/AuthorWithBooks/:id",authenticateToken, authorControllers.getAuthorWithBooks);

export default router;