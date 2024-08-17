import { ID, Query } from "react-native-appwrite";
import { database } from "./config";
import { VITE_COLLECTION_ID, VITE_DATABASE_ID } from '@env';

export async function list() {
    const allDocuments = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
        const response = await database.listDocuments(
            `${VITE_DATABASE_ID}`,
            `${VITE_COLLECTION_ID}`,
            [
                Query.orderAsc('name'),
                Query.limit(limit),
                Query.offset(offset)
            ]
        );
        allDocuments.push(...response.documents);

        // Check if there are more documents
        if (response.documents.length < limit) {
            hasMore = false;
        } else {
            offset += limit;
        }
    }

    return allDocuments;
}

// export async function list(){
//     try {
//         let promise = await database.listDocuments(
//             `${VITE_DATABASE_ID}`,
//             `${VITE_COLLECTION_ID}`,
//             [
//                 Query.orderAsc('name')
//             ]
//         );
//         return promise; 
//     } catch (error) {
//         return error;
//     }
// }

export async function create(name, location, yearPaid, familyDetails){
    try {
        const promise = await database.createDocument(
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

export async function SearchDocument(value){
    try {
        let promise = await database.listDocuments(
            `${VITE_DATABASE_ID}`,
            `${VITE_COLLECTION_ID}`,
            [
                Query.search("name", `${value}`)
            ]
        );
        return promise; 
    } catch (error) {
        return error;
    }
}