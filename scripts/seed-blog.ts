/**
 * One-time script: seed blog posts from .md files into Supabase.
 * Run: npx ts-node --project tsconfig.json scripts/seed-blog.ts
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const contentDir = path.join(process.cwd(), "src/content/blog");

async function seed() {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  for (const filename of files) {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
    const { data, content } = matter(raw);

    const row = {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      content,
      category: data.category ?? "Umum",
      cover: data.cover ?? null,
      author: data.author ?? "Tim BJA Logistic",
      published: true,
      date: data.date ? String(data.date).slice(0, 10) : new Date().toISOString().slice(0, 10),
    };

    const { error } = await supabase.from("posts").upsert(row, { onConflict: "slug" });

    if (error) {
      console.error(`❌ Error seeding ${slug}:`, error.message);
    } else {
      console.log(`✅ Seeded: ${slug}`);
    }
  }

  console.log("Done.");
}

seed();
