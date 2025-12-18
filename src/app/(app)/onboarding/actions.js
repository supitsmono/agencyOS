"use server"

import { db } from "@/db"
import { organization, member } from "@/db/schema"
import { v4 as uuidv4 } from "uuid"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    })
}

export async function createOrganization(formData) {
    const session = await getSession()
    if (!session) return { success: false, error: "Unauthorized" }

    const name = formData.get("name")
    if (!name) return { success: false, error: "Organization Name is required" }

    try {
        const orgId = uuidv4()
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + "-" + Math.floor(Math.random() * 1000)

        // 1. Create Org
        await db.insert(organization).values({
            id: orgId,
            name: name,
            slug: slug,
            plan: "free",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        // 2. Add Member (Owner)
        await db.insert(member).values({
            id: uuidv4(),
            organizationId: orgId,
            userId: session.user.id,
            role: "owner",
            joinedAt: new Date()
        })

    } catch (error) {
        console.error("Create Org Failed:", error)
        return { success: false, error: "Failed to create organization" }
    }

    redirect("/dashboard")
}
