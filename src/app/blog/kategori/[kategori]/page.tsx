import type { Metadata } from "next";
import { CategoryListing, categoryMetadata, categoryStaticParams } from "@/lib/blogCategoryPage";

export const revalidate = 86400;

type Props = { params: Promise<{ kategori: string }> };

export async function generateStaticParams() {
  return categoryStaticParams(false);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;
  return categoryMetadata(kategori, 1);
}

export default async function BlogCategoryPage({ params }: Props) {
  const { kategori } = await params;
  return <CategoryListing slug={kategori} current={1} />;
}
