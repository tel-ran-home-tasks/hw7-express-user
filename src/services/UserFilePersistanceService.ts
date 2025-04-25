export interface UserFilePersistance {
    saveDataToFile():string;
    restoreDataFromFile():string;
}