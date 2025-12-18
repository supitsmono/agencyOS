import { db } from "@/db"
import { application, decisionAudit } from "@/db/schema"
import { applyAIEvaluation } from "@/app/actions"
import { v4 as uuidv4 } from "uuid"
import { NextResponse } from "next/server"

// This API simulates the "Email Parser" or "Typeform Webhook"
// It receives raw application data, creates the record, and triggers the AI Agent.
// Usage: POST /api/ingest
// Body: { name, email, age, height, location, gender, images: [], stats: {} }

const INGEST_SECRET = process.env.INGEST_SECRET || "local_dev_secret";

export async function POST(request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${INGEST_SECRET}`) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // 1. Validate Basic Payload (Minimal check, schema handles rest)
        if (!body.email || !body.name) {
            return NextResponse.json({ success: false, error: "Missing required fields (name, email)" }, { status: 400 });
        }

        const newId = uuidv4();
        const now = new Date();

        // 2. Insert into Database
        // Note: In production, this would parse specific Typeform/Email fields.
        // For v1, we accept a clean JSON object matching our schema structure.

        // Determine Board based on explicit field or generic logic if missing
        // (logic is in evaluateBoardFit, but we need a default board to store)
        const board = body.board || "Main";

        await db.insert(application).values({
            id: newId,
            name: body.name,
            email: body.email,
            age: parseInt(body.age) || null,
            height: body.height,
            location: body.location || "Unknown",
            gender: body.gender || "Female",
            board: board,
            images: body.images || [],
            stats: body.stats || {},
            decisionState: "Pending Review", // Start here
            folder: "inbox",
            status: "new",
            createdAt: now,
            updatedAt: now,
        }); // Sync driver handled by drizzle-orm/better-sqlite3 if configured correctly, 
        // but we are in API route context where db instance is imported.
        // Drizzle 'insert' is usually awaitable or .run() depending on driver.
        // Since we fixed 'actions.js' to be sync, we should check 'db/index.js' again.
        // 'src/db/index.js' exports 'db = drizzle(sqlite)'.
        // In Better-SQLite3, queries are synchronous.
        // HOWEVER, Next.js API routes are async.
        // We can wrap DB calls in simple 'await' if Drizzle wrapper handles it, 
        // OR just call them (sync).
        // Let's use standard awaiting for expected Promise-like behavior from Drizzle ORM wrapper
        // unless we know for sure it returns result directly.
        // Actually, with better-sqlite3 Drizzle adapter, standard 'await db.select...' works 
        // but the transaction *inner* function must be sync.
        // Outer calls like 'await db.insert...' are fine.

        console.log(`[Ingest] Created application ${newId} for ${body.name}`);

        // 3. Trigger AI Agent 🧠
        // This is the "Auto-Eval" step
        console.log(`[Ingest] Triggering AI for ${newId}...`);

        // Call with isSystem bypass
        // Note: We need to await this to ensure audit logs are written before API returns,
        // or we can fire-and-forget (but debugging is harder). Let's await.
        const aiResult = await applyAIEvaluation(newId, body.stats, { isSystem: true });

        console.log(`[Ingest] AI Result:`, aiResult);

        return NextResponse.json({
            success: true,
            id: newId,
            message: "Application received and queued for AI."
        });

    } catch (error) {
        console.error("Ingest Failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
