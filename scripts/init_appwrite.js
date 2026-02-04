/* eslint-disable @typescript-eslint/no-require-imports */
const { Client, Databases, Storage, ID, Permission, Role } = require('node-appwrite');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Configuration
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;

// Data from app/gallery/page.js
const galleryImages = [
  // ... (Full array will be populated in next step or I can put it here now)
  // I will put a placeholder here and fill it with the actual data in the tool call
  // Copying data from previous turn...
  { id: 101, src: "/events/3dprinting(Dec)/3dprinting_1.png", category: "Workshop", title: "3D Printing Workshop" },
  { id: 102, src: "/events/3dprinting(Dec)/3dprinting_2.png", category: "Workshop", title: "3D Printing Workshop" },
  { id: 103, src: "/events/3dprinting(Dec)/3dprinting_3.png", category: "Workshop", title: "3D Printing Workshop" },
  { id: 104, src: "/events/3dprinting(Dec)/3dprinting_4.png", category: "Workshop", title: "3D Printing Workshop" },
  { id: 111, src: "/events/3daysskilldev1/skilldev1_1.png", category: "Workshop", title: "Skill Dev Program 1" },
  { id: 112, src: "/events/3daysskilldev1/skilldev1_2.png", category: "Workshop", title: "Skill Dev Program 1" },
  { id: 113, src: "/events/3daysskilldev1/skilldev1_3.png", category: "Workshop", title: "Skill Dev Program 1" },
  { id: 114, src: "/events/3daysskilldev1/skilldev1_4.png", category: "Workshop", title: "Skill Dev Program 1" },
  { id: 121, src: "/events/3dayskilldev2/image.png", category: "Workshop", title: "Skill Dev Program 2" },
  { id: 122, src: "/events/3dayskilldev2/image_copy.png", category: "Workshop", title: "Skill Dev Program 2" },
  { id: 123, src: "/events/3dayskilldev2/image_copy_2.png", category: "Workshop", title: "Skill Dev Program 2" },
  { id: 124, src: "/events/3dayskilldev2/image_copy_3.png", category: "Workshop", title: "Skill Dev Program 2" },
  { id: 125, src: "/events/3dayskilldev2/image_copy_4.png", category: "Workshop", title: "Skill Dev Program 2" },
  { id: 126, src: "/events/3dayskilldev2/image_copy_5.png", category: "Workshop", title: "Skill Dev Program 2" },
  { id: 131, src: "/events/CNC/cnc_1.jpg", category: "Workshop", title: "CNC Workshop" },
  { id: 132, src: "/events/CNC/cnc_2.jpeg", category: "Workshop", title: "CNC Workshop" },
  { id: 133, src: "/events/CNC/cnc_3.jpeg", category: "Workshop", title: "CNC Workshop" },
  { id: 134, src: "/events/CNC/cnc_4.jpeg", category: "Workshop", title: "CNC Workshop" },
  { id: 135, src: "/events/CNC/cnc_5.jpeg", category: "Workshop", title: "CNC Workshop" },
  { id: 136, src: "/events/CNC/cnc_6.jpeg", category: "Workshop", title: "CNC Workshop" },
  { id: 137, src: "/events/CNC/cnc_7.jpeg", category: "Workshop", title: "CNC Workshop" },
  { id: 138, src: "/events/CNC/cnc_8.jpeg", category: "Workshop", title: "CNC Workshop" },
  { id: 201, src: "/events/LD1/image_copy_6.png", category: "Community", title: "LD Awareness Session" },
  { id: 202, src: "/events/LD1/image.png", category: "Community", title: "LD Awareness Session" },
  { id: 203, src: "/events/LD1/image_copy.png", category: "Community", title: "LD Awareness Session" },
  { id: 204, src: "/events/LD1/image_copy_2.png", category: "Community", title: "LD Awareness Session" },
  { id: 205, src: "/events/LD1/image_copy_3.png", category: "Community", title: "LD Awareness Session" },
  { id: 206, src: "/events/LD1/image_copy_4.png", category: "Community", title: "LD Awareness Session" },
  { id: 207, src: "/events/LD1/image_copy_5.png", category: "Community", title: "LD Awareness Session" },
  { id: 211, src: "/events/LDVISIT/image.png", category: "Community", title: "LD Educational Visit" },
  { id: 212, src: "/events/LDVISIT/image_copy.png", category: "Community", title: "LD Educational Visit" },
  { id: 213, src: "/events/LDVISIT/image_copy_2.png", category: "Community", title: "LD Educational Visit" },
  { id: 214, src: "/events/LDVISIT/image_copy_3.png", category: "Community", title: "LD Educational Visit" },
  { id: 215, src: "/events/LDVISIT/image_copy_4.png", category: "Community", title: "LD Educational Visit" },
  { id: 216, src: "/events/LDVISIT/image_copy_5.png", category: "Community", title: "LD Educational Visit" },
  { id: 217, src: "/events/LDVISIT/image_copy_6.png", category: "Community", title: "LD Educational Visit" },
  { id: 218, src: "/events/LDVISIT/image_copy_7.png", category: "Community", title: "LD Educational Visit" },
  { id: 221, src: "/events/industrialVisit/image.png", category: "Community", title: "Industry Visit (Kalpataru)" },
  { id: 222, src: "/events/industrialVisit/image_copy.png", category: "Community", title: "Industry Visit (Kalpataru)" },
  { id: 223, src: "/events/industrialVisit/image_copy_2.png", category: "Community", title: "Industry Visit (Kalpataru)" },
  { id: 224, src: "/events/industrialVisit/image_copy_3.png", category: "Community", title: "Industry Visit (Kalpataru)" },
  { id: 225, src: "/events/industrialVisit/image_copy_4.png", category: "Community", title: "Industry Visit (Kalpataru)" },
  { id: 226, src: "/events/industrialVisit/image_copy_5.png", category: "Community", title: "Industry Visit (Kalpataru)" },
  { id: 227, src: "/events/industrialVisit/image_copy_6.png", category: "Community", title: "Industry Visit (Kalpataru)" },
  { id: 231, src: "/events/MAT/image.png", category: "Community", title: "MAT-TALK Session" },
  { id: 232, src: "/events/MAT/image_copy.png", category: "Community", title: "MAT-TALK Session" },
  { id: 233, src: "/events/MAT/image_copy_2.png", category: "Community", title: "MAT-TALK Session" },
  { id: 234, src: "/events/MAT/image_copy_3.png", category: "Community", title: "MAT-TALK Session" },
  { id: 235, src: "/events/MAT/image_copy_4.png", category: "Community", title: "MAT-TALK Session" },
  { id: 236, src: "/events/MAT/image_copy_5.png", category: "Community", title: "MAT-TALK Session" },
  { id: 237, src: "/events/MAT/image_copy_6.png", category: "Community", title: "MAT-TALK Session" },
  { id: 238, src: "/events/MAT/image_copy_7.png", category: "Community", title: "MAT-TALK Session" },
  { id: 239, src: "/events/MAT/image_copy_8.png", category: "Community", title: "MAT-TALK Session" },
  { id: 240, src: "/events/MAT/image_copy_9.png", category: "Community", title: "MAT-TALK Session" },
  { id: 301, src: "/events/cnc-machine.jpg", category: "Projects", title: "Advanced CNC Machinery" }
];

// Data from app/people/page.js
const peopleData = [
  { id: "f1", type: "director", name: "Prof. Anirbid Sircar", role: "Chief Mentor", department: "PDEU", bio: "Guiding the strategic vision of the Idea Lab.", image: "/people images/Anirbid.jpeg", email: "AnirbidSircar@sot.pdpu.ac.in", linkedin: "#" },
  { id: "f2", type: "faculty", name: "Prof. Vishvesh Badheka", role: "Principal Investigator", department: "Mechanical", bio: "Leading the investigation and execution of lab projects.", image: "/people images/vishveshBadheka.jpeg", email: "vishvesh.badheka@sot.pdpu.ac.in", linkedin: "#" },
  { id: "f3", type: "faculty", name: "Dr. Hiren Kumar Thakkar", role: "Co-Principal Investigator", department: "CSE", bio: "Co-leading technical initiatives and computer science integration.", image: "/people images/HirenSir.jpeg", email: "hiren.thakkar@sot.pdpu.ac.in", linkedin: "#" },
  { id: "t1", type: "faculty", name: "Dr. Manish Paliwal", role: "TechGuru (CSE)", department: "CSE", bio: "Expert mentor for Computer Science and Engineering projects.", image: "/people images/ManishPaliwal.jpeg", email: "manish.paliwal@sot.pdpu.ac.in", linkedin: "#" },
  { id: "t2", type: "faculty", name: "Dr. Krunal Mehta", role: "TechGuru (Mechanical)", department: "Mechanical", bio: "Specialist in mechanical systems and design mentorship.", image: "/people images/KrunalMehta.jpeg", email: "krunal.mehta@sot.pdpu.ac.in", linkedin: "#" },
  { id: "t3", type: "faculty", name: "Dr. Ravi Kant", role: "TechGuru (Mechanical)", department: "Mechanical", bio: "Expert guidance in manufacturing and mechanical engineering.", image: "/people images/RaviKant.jpeg", email: "ravi.kant@sot.pdpu.ac.in", linkedin: "#" },
  { id: "t4", type: "faculty", name: "Dr. Shreyas Tiwari", role: "TechGuru (ECE)", department: "ECE", bio: "Mentor for Electronics and Communication Engineering innovations.", image: "/people images/ShreyasTiwari.jpeg", email: "shreyas.tiwari@sot.pdpu.ac.in", linkedin: "#" },
  { id: "t5", type: "faculty", name: "Dr. Manish Kumar", role: "TechGuru (ECE)", department: "ECE", bio: "Technical guidance in electronics and signal processing.", image: "/people images/ManishKumar.jpeg", email: "manish.kumar@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st1", type: "student", name: "Mr. Kushagra Patel", role: "Student Ambassador", department: "Mechanical", bio: "Student leader representing the Mechanical department.", image: "/people images/KushagraPatel.jpeg", email: "24BME085@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st2", type: "student", name: "Mr. Megh Raval", role: "Student Ambassador", department: "Mechanical", bio: "Driving student engagement in mechanical innovation.", image: "/people images/MeghRaval.jpeg", email: "24BME089@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st3", type: "student", name: "Mr. Raj Pandya", role: "Student Ambassador", department: "Mechanical", bio: "Facilitating peer learning and workshops.", image: "/people images/RajPandya.jpeg", email: "24BME091@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st4", type: "student", name: "Ms. Shaili Gupta", role: "Student Ambassador", department: "CSE", bio: "Representing Computer Science students in the lab.", image: "/people images/ShailiGupta.jpeg", email: "24BCP180@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st5", type: "student", name: "Mr. Dax Savaliya", role: "Student Ambassador", department: "CSE", bio: "Encouraging coding and software projects in the lab.", image: "/people images/DaxSavaliya.jpeg", email: "24BCP175@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st6", type: "student", name: "Mr. Krish Suthar", role: "Student Ambassador", department: "ECE", bio: "Bridging the gap between students and electronics resources.", image: "/people images/krish.png", email: "24BEC079@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st7", type: "student", name: "Ms. Anupreksha Jain", role: "Student Ambassador", department: "ECE", bio: "Promoting innovation in electronics among peers.", image: "/people images/anupreksha.png", email: "23BEC196@sot.pdpu.ac.in", linkedin: "#" },
  { id: "st8", type: "student", name: "Ms.Sourav Thakker", role: "Student Ambassador", department: "ICT", bio: "Hardware Hacker | Embedded Systems, Linux, UAVs & Analog Circuitry.", image: "/people images/sourav.png", email: "23BEC196@sot.pdpu.ac.in", linkedin: "#" }
];


if (!PROJECT_ID || !API_KEY) {
    console.error('Error: NEXT_PUBLIC_APPWRITE_PROJECT_ID and APPWRITE_API_KEY are required in .env.local');
    process.exit(1);
}

const client = new Client();
client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

// Constants
const DB_NAME = 'IdeaLabDB';
const GALLERY_COLLECTION_NAME = 'Gallery';
const PEOPLE_COLLECTION_NAME = 'People';
const BUCKET_NAME = 'IdeaLabAssets';

// Helper to delay execution
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    try {
        console.log('Starting migration process...');

        // 1. Setup Database
        let dbId;
        if (process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) {
            dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
            console.log(`Using existing Database ID: ${dbId}`);
        } else {
            console.log('Creating new Database...');
            const db = await databases.create(ID.unique(), DB_NAME);
            dbId = db.$id;
            console.log(`Created Database: ${dbId}`);
            console.log(`IMPORTANT: Update NEXT_PUBLIC_APPWRITE_DATABASE_ID=${dbId} in .env.local`);
        }

        // 2. Setup Bucket
        let bucketId;
        if (process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID) {
            bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
            console.log(`Using existing Bucket ID: ${bucketId}`);
        } else {
            console.log('Creating new Storage Bucket...');
            const bucket = await storage.createBucket(ID.unique(), BUCKET_NAME, [Permission.read(Role.any())], false, true, undefined, ['jpg', 'jpeg', 'png', 'svg', 'webp']);
            bucketId = bucket.$id;
            console.log(`Created Bucket: ${bucketId}`);
            console.log(`IMPORTANT: Update NEXT_PUBLIC_APPWRITE_BUCKET_ID=${bucketId} in .env.local`);
        }

        // 3. Setup Gallery Collection
        let galleryColId = process.env.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID;
        if (!galleryColId) {
            console.log('Creating Gallery Collection...');
            const col = await databases.createCollection(dbId, ID.unique(), GALLERY_COLLECTION_NAME, [Permission.read(Role.any())]);
            galleryColId = col.$id;
            
            // Attributes
            await databases.createStringAttribute(dbId, galleryColId, 'title', 256, true);
            await databases.createStringAttribute(dbId, galleryColId, 'category', 100, true);
            await databases.createStringAttribute(dbId, galleryColId, 'imageId', 256, true);
            await databases.createUrlAttribute(dbId, galleryColId, 'imageUrl', true);

            console.log(`Created Gallery Collection: ${galleryColId}`);
            console.log(`IMPORTANT: Update NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID=${galleryColId} in .env.local`);
            console.log('Waiting for attributes to be processed...');
            await sleep(2000);
        }

        // 4. Setup People Collection
        let peopleColId = process.env.NEXT_PUBLIC_APPWRITE_PEOPLE_COLLECTION_ID;
        if (!peopleColId) {
            console.log('Creating People Collection...');
            const col = await databases.createCollection(dbId, ID.unique(), PEOPLE_COLLECTION_NAME, [Permission.read(Role.any())]);
            peopleColId = col.$id;

            // Attributes
            await databases.createStringAttribute(dbId, peopleColId, 'name', 256, true);
            await databases.createStringAttribute(dbId, peopleColId, 'role', 256, true);
            await databases.createStringAttribute(dbId, peopleColId, 'department', 100, true);
            await databases.createStringAttribute(dbId, peopleColId, 'bio', 1000, false);
            await databases.createStringAttribute(dbId, peopleColId, 'type', 50, true);
            await databases.createStringAttribute(dbId, peopleColId, 'email', 256, false);
            await databases.createStringAttribute(dbId, peopleColId, 'linkedin', 512, false);
            await databases.createStringAttribute(dbId, peopleColId, 'imageId', 256, false);
            await databases.createUrlAttribute(dbId, peopleColId, 'imageUrl', false);

            console.log(`Created People Collection: ${peopleColId}`);
            console.log(`IMPORTANT: Update NEXT_PUBLIC_APPWRITE_PEOPLE_COLLECTION_ID=${peopleColId} in .env.local`);
            console.log('Waiting for attributes to be processed...');
            await sleep(2000);
        }

        // Fetch existing documents to prevent duplicates
        console.log('Fetching existing records to avoid duplicates...');
        const existingGalleryDocs = await databases.listDocuments(dbId, galleryColId);
        const existingGalleryTitles = new Set(existingGalleryDocs.documents.map(d => d.title));

        const existingPeopleDocs = await databases.listDocuments(dbId, peopleColId);
        const existingPeopleNames = new Set(existingPeopleDocs.documents.map(d => d.name));

        // 5. Migrate Gallery Images
        console.log('Migrating Gallery Images...');
        for (const item of galleryImages) {
            if (existingGalleryTitles.has(item.title)) {
                console.log(`Skipping "${item.title}" (already exists)`);
                continue;
            }

            const relativePath = item.src; 
            const localPath = path.join(__dirname, '../public', relativePath);
            
            try {
                if (fs.existsSync(localPath)) {
                    console.log(`Uploading ${relativePath}...`);
                    const fileBuffer = fs.readFileSync(localPath);
                    
                    const fileId = ID.unique();
                    const file = await storage.createFile(bucketId, fileId, new File([fileBuffer], path.basename(localPath)));
                    
                    const imageUrl = `${ENDPOINT}/storage/buckets/${bucketId}/files/${file.$id}/view?project=${PROJECT_ID}`;

                    await databases.createDocument(dbId, galleryColId, ID.unique(), {
                        title: item.title,
                        category: item.category,
                        imageId: file.$id,
                        imageUrl: imageUrl
                    });
                     // Short delay to avoid rate limits/connection issues
                    await sleep(500); 
                } else {
                    console.warn(`File not found: ${localPath}`);
                }
            } catch (err) {
                console.error(`Failed to upload ${relativePath}:`, err.message);
            }
        }

        // 6. Migrate People
        console.log('Migrating People...');
        for (const person of peopleData) {
            if (existingPeopleNames.has(person.name)) {
                 console.log(`Skipping "${person.name}" (already exists)`);
                 continue;
            }

            let fileId = null;
            let imageUrl = null;

            try {
                if (person.image) {
                     const relativePath = person.image;
                     const localPath = path.join(__dirname, '../public', relativePath);
                     if (fs.existsSync(localPath)) {
                        console.log(`Uploading ${relativePath}...`);
                        const fileBuffer = fs.readFileSync(localPath);
                        const fid = ID.unique();
                        const file = await storage.createFile(bucketId, fid, new File([fileBuffer], path.basename(localPath)));
                        fileId = file.$id;
                        imageUrl = `${ENDPOINT}/storage/buckets/${bucketId}/files/${file.$id}/view?project=${PROJECT_ID}`;
                     } else {
                         console.warn(`File not found: ${localPath}`);
                     }
                }

                await databases.createDocument(dbId, peopleColId, ID.unique(), {
                    name: person.name,
                    role: person.role,
                    department: person.department,
                    bio: person.bio || '',
                    type: person.type,
                    email: person.email || '',
                    linkedin: person.linkedin || '#',
                    imageId: fileId,
                    imageUrl: imageUrl
                });
                await sleep(500);

            } catch (err) {
                console.error(`Failed to process person ${person.name}:`, err.message);
            }
        }

        console.log('Migration process finished.');

    } catch (error) {
        console.error('Migration failed:', error);
    }
}

main();
