import type { Metadata } from "next";
import { HomeSections } from "@/components/home/HomeSections";
import { ArticleFaqJsonLd } from "@/components/JsonLd";
import { getHomepageContent } from "@/lib/homepage/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomepageContent();
  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    alternates: {
      canonical: "https://bjalogistic.id",
    },
  };
}

export default async function HomePage() {
  const content = await getHomepageContent();
  const showFaq = !content.hidden.includes("faq");
  return (
    <>
      {showFaq && (
        <ArticleFaqJsonLd
          items={content.faq.items
            .filter((f) => f.q.trim() && f.a.trim())
            .map((f) => ({ question: f.q, answer: f.a }))}
        />
      )}
      <HomeSections content={content} />
    </>
  );
}
