import { ID, Query } from "react-native-appwrite";
import { database } from "./config";
import { VITE_COLLECTION_ID, VITE_DATABASE_ID } from '@env';

export async function list(){
    try {
        let promise = await database.listDocuments(
            `${VITE_DATABASE_ID}`,
            `${VITE_COLLECTION_ID}`,
            [
                Query.orderAsc('name')
            ]
        );
        return promise; 
    } catch (error) {
        return error;
    }
}

export async function create(name, location, yearPaid, familyDetails){
    try {
        const promise = database.createDocument(
            `${VITE_DATABASE_ID}`,
            `${VITE_COLLECTION_ID}`,
            ID.unique(),
            {"name": `${name}`,
            "accountStatus": true,
            "location": `${location}`,
            "yearPaid": `${yearPaid}`,
            "familyDetails": `${familyDetails}`,
            }
        );
        return promise;
    } catch (error) {
        return `error`;
    }
}

export async function update(documentId, data){
    try {
        const result = await database.updateDocument(
            `${VITE_DATABASE_ID}`,
            `${VITE_COLLECTION_ID}`,
            `${documentId}`, // documentId
            data,
        );
        return result;
    } catch (error) {
        return `error`;
    }
}

export async function deleteDocument(documentId){
    try {
        const result = await database.deleteDocument(
            `${VITE_DATABASE_ID}`,
            `${VITE_COLLECTION_ID}`,
            `${documentId}`
        );
        return result;
    } catch (error) {
        return `error`;
    }
}