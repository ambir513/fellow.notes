"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePost, deletePost, PostType } from "@/components/admin/actions/post";
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
  CardFooter,
} from "@/components/ui/card";
import { toastManager } from "@/components/ui/toast";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Video,
  HelpCircle,
  Layers,
  Crown,
  Save,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  User,
  PlusCircle,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PostDetailsProps {
  post: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    type: PostType;
    published: boolean;
    isPremium: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
    user?: {
      name: string | null;
      email: string | null;
      role: string | null;
    } | null;
    note?: any;
    video?: any;
    quiz?: any;
    flashcard?: any;
  };
}

const POST_TYPE_LABELS: Record<PostType, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  NOTES: { label: "Lecture Notes", icon: BookOpen },
  PYQS: { label: "PYQs & Solutions", icon: GraduationCap },
  VIDEO: { label: "Video Lecture", icon: Video },
  QUIZ: { label: "Practice Quiz", icon: HelpCircle },
  FLASHCARD: { label: "Flashcards Deck", icon: Layers },
};

export function PostDetails({ post }: PostDetailsProps) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description || "");
  const [type, setType] = useState<PostType>(post.type);
  const [isPremium, setIsPremium] = useState(post.isPremium);
  const [published, setPublished] = useState(post.published);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);

  const handleCopySlug = () => {
    navigator.clipboard.writeText(post.slug);
    setCopiedSlug(true);
    toastManager.add({
      type: "success",
      title: "Copied!",
      description: "Post slug copied to clipboard.",
    });
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toastManager.add({
        type: "error",
        title: "Validation Error",
        description: "Post title cannot be empty.",
      });
      return;
    }

    try {
      setIsUpdating(true);
      const res = await updatePost({
        id: post.id,
        title: title.trim(),
        description: description.trim() || null,
        type,
        isPremium,
        published,
      });

      if (!res.success) {
        throw new Error(res.error || "Failed to update post.");
      }

      toastManager.add({
        type: "success",
        title: "Changes Saved",
        description: "Post details have been updated successfully.",
      });
      router.refresh();
    } catch (err: any) {
      toastManager.add({
        type: "error",
        title: "Update Failed",
        description: err.message || "Failed to save post changes.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deletePost(post.id);

      if (!res.success) {
        throw new Error(res.error || "Failed to delete post.");
      }

      toastManager.add({
        type: "success",
        title: "Post Deleted",
        description: "The post was permanently removed.",
      });
      router.push("/admin/create-post");
    } catch (err: any) {
      toastManager.add({
        type: "error",
        title: "Delete Failed",
        description: err.message || "Failed to delete the post.",
      });
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const TypeIcon = POST_TYPE_LABELS[type]?.icon || FileText;

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10 space-y-8">
      {/* Top Breadcrumb and Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/create-post")}
            className="gap-1.5"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">ID: {post.id}</span>
              <Badge variant={published ? "default" : "outline"} className="text-[10px]">
                {published ? "LIVE" : "DRAFT"}
              </Badge>
              {isPremium && (
                <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px]">
                  PREMIUM
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground truncate max-w-xl mt-1">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin/create-post">
            <Button variant="outline" size="sm" className="gap-1.5">
              <PlusCircle className="size-3.5" />
              Create Another
            </Button>
          </Link>
          <Button
            variant="default"
            size="sm"
            onClick={handleUpdate}
            loading={isUpdating}
            className="gap-1.5 shadow-sm"
          >
            <Save className="size-3.5" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Success Banner */}
      <div className="flex items-start justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="size-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h4 className="font-semibold text-sm">Post successfully registered in database!</h4>
            <p className="text-xs opacity-90 mt-0.5">
              You can now edit metadata below, upload associated content attachments, or toggle live publishing.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopySlug}
          className="flex items-center gap-1.5 text-xs font-mono bg-background/80 hover:bg-background text-foreground px-2.5 py-1 rounded-md border border-border shadow-xs transition-colors shrink-0"
        >
          {copiedSlug ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
          <span>{post.slug}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Edit Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-border/60 shadow-xs">
            <CardHeader>
              <CardTitle className="text-lg">Edit Post Details</CardTitle>
              <CardDescription>
                Update the title, slug, and general description of this educational resource.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="edit-title" className="text-sm font-semibold">
                  Post Title
                </Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="font-medium text-base"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-sm font-semibold">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                />
              </div>

              {/* Resource Type */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Content Format</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(POST_TYPE_LABELS) as PostType[]).map((typeKey) => {
                    const item = POST_TYPE_LABELS[typeKey];
                    const Icon = item.icon;
                    const isSelected = type === typeKey;

                    return (
                      <button
                        key={typeKey}
                        type="button"
                        onClick={() => setType(typeKey)}
                        className={cn(
                          "flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border/70 hover:bg-muted/40 text-muted-foreground"
                        )}
                      >
                        <Icon className="size-4" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Type-Specific Content Module Card */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TypeIcon className="size-5 text-primary" />
                <div>
                  <CardTitle className="text-base">{POST_TYPE_LABELS[type].label} Attachments</CardTitle>
                  <CardDescription className="text-xs">
                    Content payload associated with this resource.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {type === "NOTES" && (
                <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/20 text-center space-y-2">
                  <BookOpen className="size-8 mx-auto text-muted-foreground/60" />
                  <h4 className="text-sm font-semibold">Note Document Attachment</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    {post.note
                      ? `Attached Note: ${post.note.title} (${post.note.fileUrl})`
                      : "No PDF file currently attached. You can link a file document through the note management module."}
                  </p>
                </div>
              )}

              {type === "PYQS" && (
                <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/20 text-center space-y-2">
                  <GraduationCap className="size-8 mx-auto text-muted-foreground/60" />
                  <h4 className="text-sm font-semibold">PYQ Exam Paper & Solution</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Link university year, semester, and downloadable question papers with detailed marking scheme solutions.
                  </p>
                </div>
              )}

              {type === "VIDEO" && (
                <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/20 text-center space-y-2">
                  <Video className="size-8 mx-auto text-muted-foreground/60" />
                  <h4 className="text-sm font-semibold">Video Lecture Link</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    {post.video
                      ? `Video URL: ${post.video.url}`
                      : "Attach YouTube, Vimeo, or S3 video streaming links for this lecture."}
                  </p>
                </div>
              )}

              {type === "QUIZ" && (
                <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/20 text-center space-y-2">
                  <HelpCircle className="size-8 mx-auto text-muted-foreground/60" />
                  <h4 className="text-sm font-semibold">Quiz Questions & Options</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Create question sets, multiple-choice options, and score weightings for this quiz.
                  </p>
                </div>
              )}

              {type === "FLASHCARD" && (
                <div className="p-4 rounded-xl border border-dashed border-border/80 bg-muted/20 text-center space-y-2">
                  <Layers className="size-8 mx-auto text-muted-foreground/60" />
                  <h4 className="text-sm font-semibold">Flashcard Deck</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Manage prompt questions and concise revision answers for student memorization.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings & Danger Zone (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing & Access */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Status & Access</CardTitle>
              <CardDescription className="text-xs">Manage post visibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
                <div className="space-y-0.5 pr-2">
                  <Label htmlFor="toggle-premium" className="text-sm font-medium cursor-pointer">
                    Premium Post
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {isPremium ? "PRO / MAX members only" : "Free for everyone"}
                  </p>
                </div>
                <Switch
                  id="toggle-premium"
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
                <div className="space-y-0.5 pr-2">
                  <Label htmlFor="toggle-published" className="text-sm font-medium cursor-pointer">
                    Publish Live
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {published ? "Visible on platform" : "Hidden in drafts"}
                  </p>
                </div>
                <Switch
                  id="toggle-published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
              </div>
            </CardContent>
          </Card>

          {/* Metadata Card */}
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> Created:
                </span>
                <span className="font-medium text-foreground">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="size-3.5" /> Author:
                </span>
                <span className="font-medium text-foreground truncate max-w-[150px]">
                  {post.user?.name || post.user?.email || "Admin"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Slug:</span>
                <span className="font-mono text-muted-foreground truncate max-w-[150px]">
                  {post.slug}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone: Delete Post */}
          <Card className="border-destructive/30 shadow-xs bg-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-destructive flex items-center gap-1.5">
                <AlertTriangle className="size-4" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-xs">
                Permanent actions regarding this post.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showDeleteConfirm ? (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="size-3.5" />
                  Delete Post
                </Button>
              ) : (
                <div className="space-y-3 p-3 rounded-lg border border-destructive/40 bg-background/80">
                  <p className="text-xs font-medium text-destructive">
                    Are you sure? This action cannot be undone.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-1/2 text-xs"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="w-1/2 text-xs"
                      loading={isDeleting}
                      onClick={handleDelete}
                    >
                      Confirm Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
