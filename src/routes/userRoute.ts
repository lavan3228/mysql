import * as express from "express";
import userControllers from "../controllers/userController";
import authenticateToken from "../middleware"

let router = express.Router();

router.get("/getAllUsers",authenticateToken, userControllers.allUsers);
router.get("/getUser/:id",authenticateToken, userControllers.getUser);
router.post("/createUser", userControllers.createUser);
router.put("/updateUser/:id",authenticateToken, userControllers.updateUser);
router.delete("/deleteUser/:id",authenticateToken, userControllers.deleteUser);

router.post("/login", userControllers.loginUser); 
router.get("/loginUser",authenticateToken, userControllers.loginUserProfile);

router.get("/getUserQuery",authenticateToken, userControllers.getUserQuery);

export default router;