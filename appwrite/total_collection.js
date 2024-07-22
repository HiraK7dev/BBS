import { database } from "./config";
import { VITE_DATABASE_ID, VITE_TOTAL_ID } from '@env';

export async function checkTotal(){
    try {
        let promise = await database.listDocuments(
            `${VITE_DATABASE_ID}`,
            `${VITE_TOTAL_ID}`,
        );
        return promise; 
    } catch (error) {
        return `error`;
    }
}

export async function updateTotal(documentId, data){
    try {
        const result = await database.updateDocument(
            `${VITE_DATABASE_ID}`,
            `${VITE_TOTAL_ID}`,
            `${documentId}`, // documentId
            data,
        );
        return result;
    } catch (error) {
        return `error`;
    }
}