import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog — CV, lettre de motivation, entretien | CVento",
  description: "Conseils concrets sur le CV, la lettre de motivation et l'entretien d'embauche, pour le marché français.",
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <a href="/" className="mb-8 inline-flex items-center gap-2 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>
      <h1 className="text-3xl font-bold">Le blog</h1>
      <p className="mt-2 text-ink-soft">CV, lettre de motivation, entretien : des conseils concrets, sans blabla.</p>

      <div className="mt-8 flex flex-col gap-6">
        {BLOG_POSTS.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-[var(--radius-lg)] border border-line bg-surface p-6 hover:border-primary"
          >
            <p className="text-xs text-ink-faint">
              {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
