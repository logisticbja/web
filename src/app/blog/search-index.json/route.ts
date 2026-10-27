import { getListablePosts } from "@/lib/blogPagination";

export const revalidate = 86400;
export const dynamic = "force-static";

export async function GET() {
  const posts = await getListablePosts();
  const index = posts.map((post) => ({ t: post.title, s: post.slug, c: post.category || "" }));
  return Response.json(index);
}
