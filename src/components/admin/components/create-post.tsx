"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { createPost, PostType } from "@/components/admin/actions/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toastManager } from "@/components/ui/toast";
import {
  BookOpen,
  GraduationCap,
  Video,
  HelpCircle,
  Layers,
  Crown,
  Save,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Link as LinkIcon,
  Globe,
  FileCheck2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const POST_TYPE_CONFIG: Record<
  PostType,
  {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeColor: string;
  }
> = {
  NOTES: {
    label: "Lecture Notes",
    description: "Curated PDF notes, textbook summaries, and revision guides.",
    icon: BookOpen,
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
  },
  PYQS: {
    label: "Previous Year Questions",
    description: "Past university examination papers and step-by-step solutions.",
    icon: GraduationCap,
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
  },
  VIDEO: {
    label: "Video Lecture",
    description: "Video tutorial links, lecture series, and topic breakdowns.",
    icon: Video,
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50",
  },
  QUIZ: {
    label: "Practice Quiz",
    description: "Interactive multiple-choice tests with scoring and answers.",
    icon: HelpCircle,
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
  },
  FLASHCARD: {
    label: "Flashcards Deck",
    description: "Spaced-repetition flashcards for quick revision and memorization.",
    icon: Layers,
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
  },
};

export function CreatePost() {
  const router = useRouter();
  const sessionQuery = useSession();

  // Support both direct session object and nested data responses
  const sessionData = sessionQuery?.data;
  const user = sessionData?.user ?? sessionData?.data?.user;
  const userId = user?.id;
  const isAdmin = user?.role === "ADMIN" || user?.role === "admin";
  const isSessionLoading = sessionQuery?.isLoading;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<PostType>("NOTES");
  const [isPremium, setIsPremium] = useState(false);
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live slug preview calculation
  const previewSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toastManager.add({
        type: "error",
        title: "Validation Error",
        description: "Please provide a title for the post.",
      });
      return;
    }

    if (!userId) {
      toastManager.add({
        type: "error",
        title: "Authentication Required",
        description: "Unable to detect a logged-in user. Please sign in to create a post.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createPost({
        title: title.trim(),
        description: description.trim() || null,
        type,
        isPremium,
        published,
        userId,
      });

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to create post.");
      }

      const createdPost = response.data;

      toastManager.add({
        type: "success",
        title: "Post Created Successfully!",
        description: `"${createdPost.title}" has been saved. Redirecting...`,
      });

      // Redirect to /admin/create-post/[postId] as required
      router.push(`/admin/create-post/${createdPost.id}`);
    } catch (err: any) {
      console.error("Submission error:", err);
      toastManager.add({
        type: "error",
        title: "Creation Failed",
        description: err.message || "An unexpected error occurred. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10 space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs px-2.5 py-0.5 rounded-full font-medium">
              Admin Portal
            </Badge>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="text-xs text-muted-foreground font-medium">Post Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            Create New Post
            <Sparkles className="size-6 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publish high-yield educational content, questions, video guides, and flashcards for students.
          </p>
        </div>

        {/* Action button header preview */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            loading={isSubmitting}
            className="gap-2 shadow-sm"
          >
            <Save className="size-4" />
            Save Post
          </Button>
        </div>
      </div>

      {/* Admin Session Banner if unauthenticated or not admin */}
      {!isSessionLoading && !userId && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">Session Authentication Required</h4>
            <p className="text-xs opacity-90 mt-0.5">
              No active user session was detected via <code className="bg-destructive/10 px-1 py-0.5 rounded">useSession()</code>.
              Please sign in with an administrator account to publish posts.
            </p>
          </div>
        </div>
      )}

      {/* Main Creation Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Main Post Information (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Essentials Card */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileCheck2 className="size-5 text-primary" />
                Post Details
              </CardTitle>
              <CardDescription>
                Define the title, slug, and core summary of the educational resource.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Title Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="post-title" className="text-sm font-semibold">
                    Post Title <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {title.length}/120 characters
                  </span>
                </div>
                <Input
                  id="post-title"
                  placeholder="e.g. Operating Systems: CPU Scheduling Algorithms & Deadlocks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                  className="font-medium text-base"
                  required
                />
                {/* Live slug feedback */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                  <LinkIcon className="size-3.5 shrink-0 text-muted-foreground/70" />
                  <span>Slug Preview:</span>
                  <code className="bg-muted/70 px-1.5 py-0.5 rounded text-[11px] text-foreground font-mono truncate max-w-md">
                    /post/{previewSlug || "post-slug-preview"}
                  </code>
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="post-description" className="text-sm font-semibold">
                    Description & Learning Outcomes
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Optional
                  </span>
                </div>
                <Textarea
                  id="post-description"
                  placeholder="Write a concise overview of what students will master through this post, key concepts covered, prerequisites, or examination tips..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="resize-y"
                />
              </div>
            </CardContent>
          </Card>

          {/* Post Type Selector Card */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Resource Type</CardTitle>
                  <CardDescription>
                    Select the format of the content you are publishing.
                  </CardDescription>
                </div>
                <Badge variant="outline" className={cn("text-xs font-semibold px-2.5 py-1", POST_TYPE_CONFIG[type].badgeColor)}>
                  {POST_TYPE_CONFIG[type].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(POST_TYPE_CONFIG) as PostType[]).map((typeKey) => {
                  const item = POST_TYPE_CONFIG[typeKey];
                  const Icon = item.icon;
                  const isSelected = type === typeKey;

                  return (
                    <button
                      key={typeKey}
                      type="button"
                      onClick={() => setType(typeKey)}
                      className={cn(
                        "flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-xs ring-2 ring-primary/20"
                          : "border-border/70 hover:border-border hover:bg-muted/30"
                      )}
                    >
                      <div
                        className={cn(
                          "size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="size-4.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className={cn("text-sm font-semibold", isSelected ? "text-foreground" : "text-muted-foreground")}>
                            {item.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings & Metadata (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Access & Monetization Card */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Crown className={cn("size-4", isPremium ? "text-amber-500" : "text-muted-foreground")} />
                Access & Monetization
              </CardTitle>
              <CardDescription className="text-xs">
                Configure student accessibility requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="is-premium-switch" className="text-sm font-medium cursor-pointer">
                      Premium Resource
                    </Label>
                    {isPremium ? (
                      <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] px-1.5 py-0">
                        PRO / MAX
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        FREE
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {isPremium
                      ? "Restricted to paid members (PRO / MAX)."
                      : "Publicly accessible to all registered users."}
                  </p>
                </div>
                <Switch
                  id="is-premium-switch"
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                />
              </div>

              {/* Publishing Status Switch */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="published-switch" className="text-sm font-medium cursor-pointer">
                      Live Publishing
                    </Label>
                    {published ? (
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0">
                        LIVE
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        DRAFT
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {published
                      ? "Visible in catalog immediately upon saving."
                      : "Saved privately in drafts for later review."}
                  </p>
                </div>
                <Switch
                  id="published-switch"
                  checked={published}
                  onCheckedChange={setPublished}
                />
              </div>
            </CardContent>
          </Card>

          {/* Author Session Card */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Author Credentials
              </CardTitle>
              <CardDescription className="text-xs">
                Derived from active useSession hook.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isSessionLoading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ) : user ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Admin Account:</span>
                    <Badge variant={isAdmin ? "default" : "secondary"} className="text-[10px] font-semibold uppercase">
                      {user?.role || "USER"}
                    </Badge>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {user?.name || "Administrator"}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {user?.email || "admin@fellownotes.app"}
                    </p>
                    <div className="pt-1 flex items-center gap-1 text-[10px] text-muted-foreground font-mono truncate">
                      <span className="opacity-60">ID:</span>
                      <span className="truncate">{userId}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  No active session found. Please sign in to link this post to your admin ID.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submission Card */}
          <Card className="border-border/60 shadow-xs bg-muted/10">
            <CardContent className="pt-6 space-y-3">
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full h-10 gap-2 font-medium"
              >
                <Save className="size-4" />
                Save & Continue
              </Button>
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Saving will generate the post ID and redirect to customize attachments, questions, and solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
