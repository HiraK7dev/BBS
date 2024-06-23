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
        return `error`;
    }
}

export async function create(name, location, yearPaid){
    const promise = database.createDocument(
        `${VITE_DATABASE_ID}`,
        `${VITE_COLLECTION_ID}`,
        ID.unique(),
        {"name": `${name}`,
        "accountStatus": true,
        "location": `${location}`,
        "yearPaid": `${yearPaid}`,
        }
    );
    setTimeout(()=>{ window.location.href = '/'; }, 2000);
}