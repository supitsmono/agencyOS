import { db } from "@/db";
import { application, member } from "@/db/schema";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/")
    }

    // Check Organization Membership
    const membership = await db.query.member.findFirst({
        where: eq(member.userId, session.user.id)
    })

    if (!membership) {
        redirect("/onboarding")
    }

    // Fetch all applications from database
    const applications = await db.select().from(application).orderBy(application.createdAt);

    return (
        <DashboardWrapper initialApplications={applications} userRole={membership.role} />
    );
}
