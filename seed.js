
import { db } from "./src/db/index.js";
import { application, organization, member, user } from "./src/db/schema.js";
import { mockApplications } from "./src/lib/mock-data.js";
import { v4 as uuidv4 } from 'uuid';

async function seed() {
    console.log("Seeding database...");

    // 1. Create Default Organization
    const techAgencyId = uuidv4();
    await db.insert(organization).values({
        id: techAgencyId,
        name: "Acme Model Mgmt",
        email: "contact@acmemodels.com",
        slug: "acme-models",
        plan: "pro",
        createdAt: new Date(),
        updatedAt: new Date()
    });
    console.log("Organization created.");

    // 2. Create Applications
    for (const app of mockApplications) {
        await db.insert(application).values({
            id: uuidv4(),
            name: app.name,
            email: app.email,
            age: app.age,
            height: app.height,
            location: app.location,
            status: app.status,
            folder: app.folder,
            category: app.category,
            images: app.images,
            stats: app.stats,
            message: app.message,
            instagram: app.instagram,
            phone: app.phone,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    console.log("Seeding complete!");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
