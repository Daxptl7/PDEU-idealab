import { databases } from "./appwrite";
import { Query } from "appwrite";

export async function getGalleryImages() {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
      [Query.limit(100)] // Adjust limit as needed
    );
    return response.documents.map(doc => ({
      id: doc.$id, // Use Appwrite ID
      src: doc.imageUrl,
      category: doc.category,
      title: doc.title,
      imageId: doc.imageId
    }));
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

export async function getPeople() {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_PEOPLE_COLLECTION_ID,
      [Query.limit(100)]
    );
    return response.documents.map(doc => ({
      id: doc.$id,
      type: doc.type,
      name: doc.name,
      role: doc.role,
      department: doc.department,
      bio: doc.bio,
      image: doc.imageUrl,
      email: doc.email,
      linkedin: doc.linkedin,
      imageId: doc.imageId
    }));
  } catch (error) {
    console.error("Error fetching people:", error);
    return [];
  }
}

export async function getEvents() {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID,
      [Query.limit(100)]
    );
    return response.documents.map(doc => ({
      ...doc,
      id: doc.$id,
      src: doc.thumbnail,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getIndustryContributions() {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_INDUSTRY_COLLECTION_ID,
      [Query.limit(100), Query.orderDesc("Date")]
    );
    return response.documents.map(doc => ({
      id: doc.$id,
      title: doc.title,
      description: doc.description,
      date: doc.Date, // Matches 'Date' column in Appwrite
      thumbnail: doc.thumbnail,
      contributor: doc.contributor,
      contribution_amount: doc.contribution_amount,
    }));
  } catch (error) {
    console.error("Error fetching industry contributions:", error);
    return [];
  }
}
