import { db } from "@/db"
import { organization, member, user } from "@/db/schema"
import { eq } from "drizzle-orm"
import SettingsClient from "@/components/settings/SettingsClient"

export default async function SettingsPage() {
    // 1. Fetch Organization (Assuming single org for now)
    const orgs = await db.select().from(organization).limit(1);
    const org = orgs[0];

    // 2. Fetch Members if org exists
    let members = [];
    if (org) {
        members = await db.select({
            id: member.id,
            role: member.role,
            userId: member.userId,
            name: user.name,
            email: user.email,
            image: user.image
        })
            .from(member)
            .leftJoin(user, eq(member.userId, user.id))
            .where(eq(member.organizationId, org.id));
    }

    // Default Fallback if no org found (shouldn't happen with seed)
    const safeOrg = org || {
        id: "mock",
        name: "Demo Agency",
        email: "demo@example.com",
        plan: "free"
    };

    return (
        <SettingsClient
            initialOrg={safeOrg}
            initialMembers={members}
        />
    )
}
