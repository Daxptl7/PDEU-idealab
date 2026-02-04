/* eslint-disable @typescript-eslint/no-require-imports */
const { Client, Databases, Storage, ID, Permission, Role, Query } = require('node-appwrite');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Configuration
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;

// Use existing Database and Bucket
const DB_NAME = 'IdeaLabDB'; // We will lookup ID or use existing
const BUCKET_NAME = 'IdeaLabAssets'; // We will lookup ID or use existing

const EVENTS_COLLECTION_NAME = 'Events';

// Data to Migrate (from app/events/page.js)
const eventsData = [
  {
    id: "01",
    type: "past",
    category: "Internship",
    title: "Two Week Internship for GTU Students",
    date: "July 01 - 15, 2025", 
    time: "Completed",
    location: "PDEU Idea Lab",
    thumbnail: "/events/gtu-flyer.jpg", 
    reportLink: "#", 
    linkedinUrl: "https://linkedin.com", 
    description: "A comprehensive internship covering CNC machining, Laser cutting, and 3D printing technologies.",
    gallery: [
      "/events/group-photo.jpg",
      "/events/cnc-machine.jpg",
      "/events/edm-demo.jpg"
    ]
  },
  {
    id: "02",
    type: "past",
    category: "Skill Development",
    title: "3-Day Training on FDM 3D Printing",
    date: "Dec 22 - 24, 2025", 
    time: "Completed",
    location: "PDEU Idea Lab",
    thumbnail: "/events/fdm-poster.jpg",
    reportLink: "/reports/REPORT ON FDM 3D PRINTING SDP final.pdf",
    linkedinUrl: "https://linkedin.com", 
    description: "Students learned how to design, slice, and print complex geometries using FDM printers.",
    gallery: [
      "/events/fdm-group-1.jpg", 
      "/events/fdm-group-2.jpg",
      "/events/3dprinting(Dec)/3dprinting_1.png",
      "/events/3dprinting(Dec)/3dprinting_2.png", 
      "/events/3dprinting(Dec)/3dprinting_3.png",
      "/events/3dprinting(Dec)/3dprinting_4.png"
    ]
  },
  {
    id: "03",
    type: "upcoming",
    category: "Workshop",
    title: "IoT & Robotics Bootcamp",
    date: "March 15, 2026",
    time: "10:00 AM",
    location: "Idea Lab Main Hall",
    thumbnail: "https://via.placeholder.com/800x600/2563eb/FFFFFF?text=Robotics+Workshop",
    reportLink: "#",
    registrationLink: "https://forms.google.com/example", 
    description: "Join us for a 24-hour hackathon to build smart campus solutions.",
    gallery: []
  },
  {
    id: "04",
    type: "past",
    category: "Skill Development",
    title: "3-Day Skill Development Program",
    date: "Dec 15-17, 2024",
    time: "Completed",
    location: "PDEU Idea Lab",
    thumbnail: "/events/3daysskilldev1/skilldev1_1.png",
    reportLink: "#",
    linkedinUrl: "https://linkedin.com",
    description: "A comprehensive 3-day skill development program covering essential engineering and innovation skills.",
    gallery: [
      "/events/3daysskilldev1/skilldev1_2.png",
      "/events/3daysskilldev1/skilldev1_3.png",
      "/events/3daysskilldev1/skilldev1_4.png"
    ]
  },
  {
    id: "05",
    type: "past",
    category: "Skill Development",
    title: "3-Day Skill Development Program",
    date: "Dec 08-10, 2024",
    time: "Completed",
    location: "PDEU Idea Lab",
    thumbnail: "/events/3dayskilldev2/image.png",
    reportLink: "#",
    linkedinUrl: "https://linkedin.com",
    description: "A comprehensive 3-day skill development program covering essential engineering and innovation skills.",
    gallery: [
      "/events/3dayskilldev2/image_copy.png",
      "/events/3dayskilldev2/image_copy_2.png",
      "/events/3dayskilldev2/image_copy_3.png",
      "/events/3dayskilldev2/image_copy_4.png",
      "/events/3dayskilldev2/image_copy_5.png"
    ]
  },
  {
    id: "06",
    type: "past",
    category: "Awareness Session",
    title: "Awareness Session on Additive Manufacturing & AICTE IDEA LAB",
    date: "October 8, 2025",
    time: "Completed",
    location: "L D College of Engineering",
    thumbnail: "/events/LD1/image.png",
    reportLink: "#",
    linkedinUrl: "https://linkedin.com",
    description: "An awareness session on Additive Manufacturing technologies and the capabilities of AICTE IDEA LAB.",
    gallery: [
      "/events/LD1/image_copy.png",
      "/events/LD1/image_copy_2.png",
      "/events/LD1/image_copy_3.png",
      "/events/LD1/image_copy_4.png",
      "/events/LD1/image_copy_5.png",
      "/events/LD1/image_copy_6.png"
    ]
  },
  {
    id: "07",
    type: "past",
    category: "Industry Visit",
    title: "Industry Visit by Kalpataru Projects International Limited",
    date: "October 18, 2025",
    time: "Completed",
    location: "Kalpataru Projects International Limited",
    thumbnail: "/events/industrialVisit/image.png",
    reportLink: "#",
    linkedinUrl: "https://linkedin.com",
    description: "Industry visit by Kalpataru Projects International Limited to explore additive manufacturing facilities.",
    gallery: [
      "/events/industrialVisit/image_copy.png",
      "/events/industrialVisit/image_copy_2.png",
      "/events/industrialVisit/image_copy_3.png",
      "/events/industrialVisit/image_copy_4.png",
      "/events/industrialVisit/image_copy_5.png",
      "/events/industrialVisit/image_copy_6.png"
    ]
  },
  {
    id: "08",
    type: "past",
    category: "Educational Visit",
    title: "Educational Visit by L.D. College of Engineering",
    date: "July 28, 2025",
    time: "Completed",
    location: "PDEU Idea Lab",
    thumbnail: "/events/LDVISIT/image.png",
    reportLink: "#",
    linkedinUrl: "https://linkedin.com",
    description: "Educational visit by students and faculty of L.D. College of Engineering.",
    gallery: [
      "/events/LDVISIT/image_copy.png",
      "/events/LDVISIT/image_copy_2.png",
      "/events/LDVISIT/image_copy_3.png",
      "/events/LDVISIT/image_copy_4.png",
      "/events/LDVISIT/image_copy_5.png",
      "/events/LDVISIT/image_copy_6.png",
      "/events/LDVISIT/image_copy_7.png"
    ]
  },
  {
    id: "09",
    type: "past",
    category: "Seminar",
    title: "First MAT-TALK @ PDEU",
    date: "August 29, 2025",
    time: "Completed",
    location: "PDEU Idea Lab",
    thumbnail: "/events/MAT/image.png",
    reportLink: "#",
    linkedinUrl: "https://linkedin.com",
    description: "The first MAT-TALK session held at PDEU focusing on material science and innovation.",
    gallery: [
      "/events/MAT/image_copy.png",
      "/events/MAT/image_copy_2.png",
      "/events/MAT/image_copy_3.png",
      "/events/MAT/image_copy_4.png",
      "/events/MAT/image_copy_5.png",
      "/events/MAT/image_copy_6.png",
      "/events/MAT/image_copy_7.png",
      "/events/MAT/image_copy_8.png",
      "/events/MAT/image_copy_9.png"
    ]
  },
  {
    id: "10",
    type: "past",
    category: "Workshop",
    title: "Carve and Conquer – Turning Timber into Triumph",
    date: "April 16, 2025",
    time: "Completed",
    location: "PDEU Idea Lab",
    thumbnail: "/events/CNC/cnc_1.jpg",
    reportLink: "#",
    linkedinUrl: "https://linkedin.com",
    description: "A hands-on workshop on CNC wood carving and design.",
    gallery: [
      "/events/CNC/cnc_2.jpeg",
      "/events/CNC/cnc_3.jpeg",
      "/events/CNC/cnc_4.jpeg",
      "/events/CNC/cnc_5.jpeg",
      "/events/CNC/cnc_6.jpeg",
      "/events/CNC/cnc_7.jpeg",
      "/events/CNC/cnc_8.jpeg"
    ]
  }
];

if (!API_KEY || !PROJECT_ID || !ENDPOINT) {
    console.error('Error: Configuration missing. Please check .env.local');
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

// Helper to delay execution
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function uploadFile(bucketId, relativePath) {
    if (!relativePath) return null;
    if (relativePath.startsWith('http')) return { url: relativePath, id: null }; // External link

    const localPath = path.join(__dirname, '../public', relativePath);
     if (!fs.existsSync(localPath)) {
        console.warn(`File not found: ${localPath} - using placeholder`);
        return null;
    }

    try {
        console.log(`Uploading ${relativePath}...`);
        const fileBuffer = fs.readFileSync(localPath);
        const file = await storage.createFile(bucketId, ID.unique(), new File([fileBuffer], path.basename(localPath)));
        const imageUrl = `${ENDPOINT}/storage/buckets/${bucketId}/files/${file.$id}/view?project=${PROJECT_ID}`;
        await sleep(200); // small delay
        return { url: imageUrl, id: file.$id };
    } catch (error) {
        console.error(`Upload failed for ${relativePath}:`, error.message);
        return null;
    }
}

async function main() {
    try {
        console.log('Starting Events migration...');

        const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
        const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

        if (!dbId || !bucketId) {
            throw new Error("Database ID or Bucket ID missing in .env.local. Run init_appwrite.js first.");
        }

        // 1. Setup Events Collection
        let eventsColId = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID;
        if (!eventsColId) {
            console.log('Creating Events Collection...');
            const col = await databases.createCollection(dbId, ID.unique(), EVENTS_COLLECTION_NAME, [Permission.read(Role.any())]);
            eventsColId = col.$id;

            // Attributes
            await databases.createStringAttribute(dbId, eventsColId, 'title', 256, true);
            await databases.createStringAttribute(dbId, eventsColId, 'description', 5000, true);
            await databases.createStringAttribute(dbId, eventsColId, 'date', 100, true);
            await databases.createStringAttribute(dbId, eventsColId, 'time', 100, true);
            await databases.createStringAttribute(dbId, eventsColId, 'location', 256, true);
            await databases.createStringAttribute(dbId, eventsColId, 'category', 100, true);
            await databases.createStringAttribute(dbId, eventsColId, 'type', 50, true); // upcoming, past
            await databases.createUrlAttribute(dbId, eventsColId, 'thumbnail', true);
            await databases.createStringAttribute(dbId, eventsColId, 'gallery', 5000, false, undefined, true); // Array of strings (URLs)
            
            // Optional links
            await databases.createUrlAttribute(dbId, eventsColId, 'reportLink', false);
            await databases.createUrlAttribute(dbId, eventsColId, 'linkedinUrl', false);
            await databases.createUrlAttribute(dbId, eventsColId, 'registrationLink', false);

            console.log(`Created Events Collection: ${eventsColId}`);
            console.log(`IMPORTANT: Update NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID=${eventsColId} in .env.local`);
            console.log('Waiting for attributes to be processed...');
            await sleep(2000);
        }

        // Check for duplicates
        const existingDocs = await databases.listDocuments(dbId, eventsColId);
        const existingTitles = new Set(existingDocs.documents.map(d => d.title));

        // 2. Migrate Data
        for (const event of eventsData) {
            if (existingTitles.has(event.title)) {
                console.log(`Skipping "${event.title}" (already exists)`);
                continue;
            }

            console.log(`Processing event: ${event.title}`);

            // Upload Thumbnail
            const thumbResult = await uploadFile(bucketId, event.thumbnail);
            const thumbnailUrl = thumbResult ? thumbResult.url : (event.thumbnail.startsWith('http') ? event.thumbnail : '');

            // Upload Gallery Images
            const galleryUrls = [];
            if (event.gallery && event.gallery.length > 0) {
                for (const imgPath of event.gallery) {
                    const result = await uploadFile(bucketId, imgPath);
                    if (result) galleryUrls.push(result.url);
                }
            }

            // Create Document
            await databases.createDocument(dbId, eventsColId, ID.unique(), {
                title: event.title,
                description: event.description,
                date: event.date,
                time: event.time,
                location: event.location,
                category: event.category,
                type: event.type,
                thumbnail: thumbnailUrl,
                gallery: galleryUrls,
                reportLink: event.reportLink === '#' ? null : event.reportLink,
                linkedinUrl: event.linkedinUrl,
                registrationLink: event.registrationLink
            });

            await sleep(500);
        }

        console.log('Events Migration Completed!');
        console.log('Please update your .env.local with the new Events Collection ID if generated.');

    } catch (error) {
        console.error('Migration failed:', error);
    }
}

main();
