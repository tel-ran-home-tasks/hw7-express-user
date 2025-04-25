import express, {json} from "express";
import {UserServiceEmbeddedImpl} from "./services/UserServiceEmbeddedImpl.js";
import {userRoutes} from "./routes/userRoutes.js";
import {logger} from "./events/logger.js";
import {UserController} from "./controllers/userController.js";
import {LoggerController} from "./controllers/loggerController.js";
import {PORT} from "./config/userConfig.js";


export const launchServer = ()=>{
const app = express();

const userService = new UserServiceEmbeddedImpl()
userService.restoreDataFromFile()

const userController = new UserController(userService);
const loggerController = new LoggerController()

app.use(json());

app.use('/',userRoutes(userController));
app.get('/api/logger',(req, res) => loggerController.getLoggerArray(res))

app.listen(PORT,()=>{
    console.log(`Server running at  http://localhost:${PORT}`);
});

process.on("SIGINT", ()=>{
    userService.saveDataToFile();
    logger.log("Saving data");
    logger.save('Data of user saved')
    process.exit();
})
}