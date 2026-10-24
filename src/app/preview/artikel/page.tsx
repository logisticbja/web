import type { Metadata } from "next";
import { BlogPostPreview } from "@/components/preview/BlogPostPreview";

export const metadata: Metadata = {
  title: { absolute: "Preview Artikel — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default function BlogPostPreviewPage() {
  return <BlogPostPreview />;
}
