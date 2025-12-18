"use server"

import { db } from "@/db"
import { application } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateApplicationFolder(id, folder) {
    try {
        await db.update(application)
            .set({ folder: folder })
            .where(eq(application.id, id))

        revalidatePath('/dashboard')
        return { success: true }
    } catch (error) {
        console.error("Failed to update folder:", error)
        return { success: false, error: "Failed to update application" }
    }
}

export async function updateApplicationCategory(id, category) {
    try {
        await db.update(application)
            .set({ category: category })
            .where(eq(application.id, id))

        revalidatePath('/dashboard')
        return { success: true }
    } catch (error) {
        console.error("Failed to update category:", error)
        return { success: false, error: "Failed to update category" }
    }
}
