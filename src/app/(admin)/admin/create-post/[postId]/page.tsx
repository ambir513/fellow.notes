import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PostDetails } from "@/components/admin/components/post-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
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
    return (
      <div className="mx-auto max-w-lg py-20 px-6 text-center space-y-4">
        <div className="size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="size-6" />
        </div>
        <h2 className="text-xl font-bold">Post Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The post with ID <code className="font-mono bg-muted px-1.5 py-0.5 rounded">{postId}</code> could not be found. It may have been deleted.
        </p>
        <div className="pt-2">
          <Link href="/admin/create-post">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Return to Create Post
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <PostDetails post={post} />
    </main>
  );
}
