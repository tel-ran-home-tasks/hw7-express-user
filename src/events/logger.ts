import EventEmitter from "node:events";
import  fs from "node:fs";

class Logger extends EventEmitter{
    private logArray:Array<{date: string, message: string}> = [];

    log(message:string) {
        this.emit('logged', message)
    }

    addLogToArray(message: string) {
        this.logArray.push({date: new Date().toISOString(), message})
    }

    getLogArray(){
        return [...this.logArray]
    }

    save(message:string){
        this.emit('saved', message)
    }
    saveToFile(message:string){
        this.emit('toFile', message)
    }
}
export  const  logger = new Logger();
logger.on('logged', (message:string) => {
    console.log(new Date().toISOString(), message)
})

logger.on('saved', (message:string) => {
    logger.addLogToArray(message)
})

logger.on('toFile', (message:string) => {
    logger.addLogToArray(message)
    let temp = new Date().toISOString().replace(/[-:T]/g,"_");
    const fileName= `log${temp}.txt`;
    fs.writeFileSync(fileName, JSON.stringify(logger.getLogArray()));
})