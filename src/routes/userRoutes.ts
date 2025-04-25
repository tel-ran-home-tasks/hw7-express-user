import {UserController} from "../controllers/userController.js";
import {Router} from "express";

export const userRoutes = (controller:UserController):Router =>{
    const router = Router();
    router.post("/api/users",controller.addUser);
    router.get("/api/user",controller.getUser);
    router.delete("/api/users",controller.removeUser);
    router.put("/api/users",controller.updateUser);
    router.get("/api/users",controller.getAllUsers);

    return router;
}