import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite';
import { parseStringify } from './utils';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_FILE_BUCKET_ID,
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId!) // Your project ID
  .setPlatform(appwriteConfig.platform!); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser({ email, password, username }: SignupProps) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error('Failed to create account.');

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (err: any) {
    throw new Error(err);
  }
}

// Sign In
export async function signIn({ email, password }: SigninProps) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error('Failed to validate user session.');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error('Failed to validate user session.');

    const currentUserJson = currentUser.documents[0];
    return parseStringify(currentUserJson);
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getAllVideos() {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.videoCollectionId!
    );

    return videos.documents;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getLatestVideos() {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.videoCollectionId!,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    return videos.documents;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getVideo(query: string) {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.videoCollectionId!,
      [Query.search('title', query)]
    );

    return videos.documents;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getUserVideos(userId: string) {
  try {
    const videos = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.videoCollectionId!,
      [Query.equal('users', userId)]
    );

    return videos.documents;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (err: any) {
    throw new Error(err);
  }
}
