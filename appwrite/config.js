import { Account, Client, Databases } from 'react-native-appwrite';
import { VITE_ENDPOINT, VITE_PROJECT_ID } from '@env';

const client = new Client();

client
    .setEndpoint(VITE_ENDPOINT)
    .setProject(VITE_PROJECT_ID);

export const database = new Databases(client);
export const account = new Account(client);
export default client;