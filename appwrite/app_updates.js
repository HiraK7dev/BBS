import { database } from "./config";
import { VITE_DATABASE_ID, VITE_UPDATE_ID } from '@env';

export async function checkVersion(){
    try {
        let promise = await database.listDocuments(
            `${VITE_DATABASE_ID}`,
            `${VITE_UPDATE_ID}`,
        );
        return promise; 
    } catch (error) {
        return `error`;
    }
}