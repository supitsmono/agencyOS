import { db } from "@/db"
import { application, decisionAudit } from "@/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { v4 as uuidv4 } from "uuid"
import { NextResponse } from "next/server"

// Security: Ideally use a CRON_SECRET env var. 
// For this v1, we'll check for a basic header or assume the route is protected by middleware/deployment config.
// Since user asked for "protect via secret or header":
const CRON_SECRET = process.env.CRON_SECRET || "local_dev_secret";

export async function GET(request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Updated Logic (Mentor Mode):
        // 1. Find apps CURRENTLY in Shadow Review
        // 2. Check their ENTRY time via decisionAudit (toState = 'Shadow Review')
        // 3. If latest entry time > 48h ago -> Expire

        const now = new Date();
        const cutoff = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48 hours ago

        // 1. Get Candidates
        const candidates = await db.select()
            .from(application)
            .where(eq(application.decisionState, "Shadow Review"));

        if (candidates.length === 0) {
            return NextResponse.json({ success: true, count: 0, message: "No items in Shadow Review." });
        }

        let processedCount = 0;
        const expiredApps = [];

        // 2. Check Audit Logs for each candidate
        // Note: Doing this in loop for clarity/correctness over complex SQL join for now. 
        // Shadow Review volume is expected to be low.
        for (const app of candidates) {
            const lastEntryLog = await db.select()
                .from(decisionAudit)
                .where(and(
                    eq(decisionAudit.applicationId, app.id),
                    eq(decisionAudit.toState, "Shadow Review")
                ))
                .orderBy(desc(decisionAudit.createdAt))
                .limit(1);

            // Determine entry time. Fallback to updatedAt if audit missing (edge case)
            const entryTime = lastEntryLog.length > 0 ? lastEntryLog[0].createdAt : app.updatedAt;

            if (entryTime < cutoff) {
                expiredApps.push(app);
            }
        }

        if (expiredApps.length === 0) {
            return NextResponse.json({ success: true, count: 0, message: "No expired items found." });
        }

        // 3. Expire them
        await db.transaction(async (tx) => {
            for (const app of expiredApps) {
                // Update State
                await tx.update(application)
                    .set({
                        decisionState: "Passed",
                        updatedAt: new Date()
                    })
                    .where(eq(application.id, app.id));

                // Insert Audit Log
                await tx.insert(decisionAudit).values({
                    id: uuidv4(),
                    applicationId: app.id,
                    userId: "system_cron", // Special system user ID
                    fromState: "Shadow Review",
                    toState: "Passed",
                    action: "auto_expire",
                    decisionSource: "system_expiry",
                    createdAt: new Date()
                });

                processedCount++;
            }
        });

        return NextResponse.json({
            success: true,
            count: processedCount,
            message: `Successfully expired ${processedCount} applications.`
        });

    } catch (error) {
        console.error("Cron Cleanup Failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
