import { database } from "./config";
import { ID, Query } from "react-native-appwrite";
import { VITE_DATABASE_ID, VITE_OTHERCOL_ID } from '@env';

export async function checkOtherCollection() {
    const allDocuments = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
        const response = await database.listDocuments(
            `${VITE_DATABASE_ID}`,
            `${VITE_OTHERCOL_ID}`,
            [
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

export async function addOtherCollection(body, amount) {
    try {
        const promise = await database.createDocument(
            `${VITE_DATABASE_ID}`,
            `${VITE_OTHERCOL_ID}`,
            ID.unique(),
            {"body": `${body}`,
            "amount": amount,
            }
        );
        return promise;
    } catch (error) {
        return `error`;
    }
}

export async function deleteOtherCollection(documentId) {
    try {
        const promise = await database.deleteDocument(
            `${VITE_DATABASE_ID}`,
            `${VITE_OTHERCOL_ID}`,
            `${documentId}`
        )
        return promise;
    } catch (error) {
        return `error`;
    }
}