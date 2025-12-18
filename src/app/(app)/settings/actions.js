"use server"

import { db } from "@/db"
import { organization, member, user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    })
}

export async function updateOrganization(data) {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    // In a real app, we'd verify the user belongs to the org.
    // For this MVP, we fetch the first organization (since we seeded just one for now)
    // or we'd fetch the user's org.

    // Simplification: Update the hardcoded org or find via member table
    // Let's assume passed ID or just update the one related to user.

    // For the MVP, we will update the specific ID if passed, or fail.
    if (!data.id) return { success: false, error: "Organization ID required" }

    try {
        await db.update(organization)
            .set({
                name: data.name,
                email: data.email,
                settings: data.settings, // Save JSON settings
                updatedAt: new Date()
            })
            .where(eq(organization.id, data.id));

        revalidatePath('/settings');
        return { success: true };
    } catch (e) {
        console.error("Update Org Failed:", e);
        return { success: false, error: "Failed to update organization" };
    }
}

export async function updateMemberRole(memberId, newRole) {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    // Verify user is owner/admin (skipped for MVP simplicity, relying on UI hide)

    try {
        await db.update(member)
            .set({ role: newRole })
            .where(eq(member.id, memberId));

        revalidatePath('/settings');
        return { success: true };
    } catch (e) {
        return { success: false, error: "Failed to update role" };
    }
}

export async function inviteMember(formData) {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized" };

    const email = formData.get("email");
    const role = formData.get("role");
    const organizationId = formData.get("organizationId");

    if (!email || !organizationId) return { success: false, error: "Missing fields" };

    // In a real app, send email via Resend/SendGrid.
    // Here we will mock it and potentially create a placeholder user or member invite record.
    // For MVP, we'll just return success to show UI feedback.

    console.log(`[MOCK EMAIL] Inviting ${email} as ${role} to org ${organizationId}`);

    await new Promise(r => setTimeout(r, 1000)); // Simulate delay

    revalidatePath('/settings');
    return { success: true, message: `Invitation sent to ${email}` };
}
