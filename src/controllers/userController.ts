import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { User } from "../model/userTypes.js";
import { logger } from "../events/logger.js";

export class UserController {
    constructor(private userService: UserService) {}

    addUser = (req: Request, res: Response) => {
        logger.log("Add user request received");
        const user: User = req.body;
        const isSuccess = this.userService.addUser(user);

        if (isSuccess) {
            res.status(200).send("User added");
            logger.save("User successfully added");
        } else {
            res.status(409).send("User already exists");
        }
    };

    getUser = (req: Request, res: Response) => {
        const id = parseInt(req.query.userId as string);
        const user = this.userService.getUser(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    };

    removeUser = (req: Request, res: Response) => {
        const user: User = req.body;
        const removed = this.userService.removeUser(user.id);

        if (removed) {
            res.status(200).json(removed);
        } else {
            res.status(404).send("User not found");
        }
    };

    updateUser = (req: Request, res: Response) => {
        const user: User = req.body;
        const isSuccess = this.userService.updateUser(user);

        if (isSuccess) {
            res.status(200).send("User updated");
        } else {
            res.status(404).send("User not found");
        }
    };

    getAllUsers = (_: Request, res: Response) => {
        const users = this.userService.getAllUsers();
        res.status(200).json(users);
    };
}

