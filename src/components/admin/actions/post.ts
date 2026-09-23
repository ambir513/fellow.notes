"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PostType } from "../../../../generated/prisma/enums";

export { PostType };

export interface CreatePostInput {
    title: string;
    description?: string | null;
    type: PostType;
    isPremium?: boolean;
    published?: boolean;
    userId: string;
}

export interface UpdatePostInput {
    id: string;
    title?: string;
    description?: string | null;
    type?: PostType;
    isPremium?: boolean;
    published?: boolean;
}

export type ActionResponse<T = unknown> = {
    success: boolean;
    data?: T;
    error?: string;
};

function generateSlug(title: string): string {
    const clean = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    const shortId = Math.random().toString(36).substring(2, 8);
    return `${clean || "post"}-${shortId}`;
}

/**
 * Server action to create a new post
 */
export async function createPost(input: CreatePostInput): Promise<ActionResponse<{ id: string; slug: string; title: string }>> {
    try {
        if (!input.title || !input.title.trim()) {
            return { success: false, error: "Title is required" };
        }

        if (!input.type) {
            return { success: false, error: "Post type is required" };
        }

        if (!input.userId) {
            return { success: false, error: "User ID is required. Please ensure you are logged in." };
        }

        const user = await prisma.user.findUnique({
            where: { id: input.userId },
            select: { id: true, role: true },
        });


        if (!user) {
            return { success: false, error: "Invalid user: user does not exist in the database." };
        }

        let slug = generateSlug(input.title);
        let attempts = 0;
        while (await prisma.post.findUnique({ where: { slug } })) {
            slug = `${generateSlug(input.title)}-${Math.random().toString(36).substring(2, 6)}`;
            attempts++;
            if (attempts > 5) break;
        }

        const post = await prisma.post.create({
            data: {
                title: input.title.trim(),
                slug,
                description: input.description?.trim() || null,
                type: input.type,
                isPremium: Boolean(input.isPremium),
                published: Boolean(input.published),
                userId: input.userId,
            },
            select: {
                id: true,
                slug: true,
                title: true,
            },
        });

        revalidatePath("/admin");
        revalidatePath("/admin/create-post");
        revalidatePath("/admin/manage-posts");

        return {
            success: true,
            data: post,
        };
    } catch (error: any) {
        console.error("Error creating post:", error);
        return {
            success: false,
            error: error?.message || "Failed to create post. Please try again.",
        };
    }
}

/**
 * Server action to update an existing post
 */
export async function updatePost(input: UpdatePostInput): Promise<ActionResponse<any>> {
    try {
        if (!input.id) {
            return { success: false, error: "Post ID is required" };
        }

        const existingPost = await prisma.post.findUnique({
            where: { id: input.id },
        });

        if (!existingPost) {
            return { success: false, error: "Post not found" };
        }

        const updatedPost = await prisma.post.update({
            where: { id: input.id },
            data: {
                ...(input.title !== undefined ? { title: input.title.trim() } : {}),
                ...(input.description !== undefined ? { description: input.description?.trim() || null } : {}),
                ...(input.type !== undefined ? { type: input.type } : {}),
                ...(input.isPremium !== undefined ? { isPremium: Boolean(input.isPremium) } : {}),
                ...(input.published !== undefined ? { published: Boolean(input.published) } : {}),
            },
        });

        revalidatePath(`/admin/create-post/${input.id}`);
        revalidatePath("/admin");
        revalidatePath("/admin/manage-posts");

        return {
            success: true,
            data: updatedPost,
        };
    } catch (error: any) {
        console.error("Error updating post:", error);
        return {
            success: false,
            error: error?.message || "Failed to update post. Please try again.",
        };
    }
}

/**
 * Server action to delete an existing post
 */
export async function deletePost(id: string): Promise<ActionResponse<{ id: string }>> {
    try {
        if (!id) {
            return { success: false, error: "Post ID is required" };
        }

        await prisma.post.delete({
            where: { id },
        });

        revalidatePath("/admin");
        revalidatePath("/admin/manage-posts");

        return {
            success: true,
            data: { id },
        };
    } catch (error: any) {
        console.error("Error deleting post:", error);
        return {
            success: false,
            error: error?.message || "Failed to delete post. Please try again.",
        };
    }
}

/**
 * Server query action to get post details by ID
 */
export async function getPostById(id: string): Promise<ActionResponse<any>> {
    try {
        if (!id) {
            return { success: false, error: "Post ID is required" };
        }

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        role: true,
                    },
                },
                note: true,
                video: true,
                quiz: true,
                flashcard: true,
            },
        });

        if (!post) {
            return { success: false, error: "Post not found" };
        }

        return {
            success: true,
            data: post,
        };
    } catch (error: any) {
        console.error("Error fetching post:", error);
        return {
            success: false,
            error: error?.message || "Failed to retrieve post details.",
        };
    }
}
