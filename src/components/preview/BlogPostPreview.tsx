"use client";
import { useState } from "react";
import { BlogPostView } from "@/components/blog/BlogPostView";
import { normalizeBlogPreview } from "@/lib/blogPreview";
import type { Post } from "@/lib/blog";
import { PreviewStyles, usePreviewBridge } from "./usePreviewBridge";

export function BlogPostPreview() {
  const [post, setPost] = useState<Post | null>(null);
  usePreviewBridge({ page: "artikel" }, (raw) => setPost(normalizeBlogPreview(raw)));

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 text-sm">
        Memuat preview artikel…
      </div>
    );
  }

  return (
    <>
      <PreviewStyles />
      <BlogPostView post={post} edit />
    </>
  );
}
