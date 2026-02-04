/* eslint-disable @typescript-eslint/no-require-imports */
const { Client, Databases } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function main() {
    try {
        console.log('Fetching events from Appwrite...');
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID
        );

        console.log(`Total Events Found: ${response.total}`);
        response.documents.forEach((doc, index) => {
            console.log(`${index + 1}. [${doc.type}] ${doc.title} (ID: ${doc.$id})`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
