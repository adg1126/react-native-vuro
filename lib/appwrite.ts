import { Account, Client, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.APPWRITE_DATABASE_ID,
  userCollectionId: process.env.APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: process.env.APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.APPWRITE_FILE_BUCKET_ID,
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId!) // Your project ID
  .setPlatform(appwriteConfig.platform!); // Your application ID or bundle ID.

const account = new Account(client);

// Register User
export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe').then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
