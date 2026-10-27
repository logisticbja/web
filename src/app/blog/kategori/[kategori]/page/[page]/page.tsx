import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { categoryBase } from "@/lib/blogCategories";
import { CategoryListing, categoryMetadata, categoryStaticParams } from "@/lib/blogCategoryPage";

export const revalidate = 86400;

type Props = { params: Promise<{ kategori: string; page: string }> };

function parsePage(value: string) {
  return /^\d+$/.test(value) ? Number(value) : NaN;
}

export async function generateStaticParams() {
  return categoryStaticParams(true);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori, page } = await params;
  return categoryMetadata(kategori, parsePage(page));
}

export default async function BlogCategoryPagedPage({ params }: Props) {
  const { kategori, page } = await params;
  const current = parsePage(page);
  if (current === 1) permanentRedirect(categoryBase(kategori));
  return <CategoryListing slug={kategori} current={current < 2 ? NaN : current} />;
}
