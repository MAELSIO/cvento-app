import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "@/lib/data/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} — CVento`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <a href="/blog" className="mb-8 inline-flex items-center gap-2.5 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>
      <p className="text-xs text-ink-faint">
        {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{post.title}</h1>

      <div className="mt-8 flex flex-col gap-6">
        {post.sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-display text-lg font-semibold">{section.heading}</h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="mt-2 text-sm leading-relaxed text-ink-soft">{p}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-[var(--radius-lg)] bg-primary-tint p-6 text-center">
        {post.cta === "diagnostic" ? (
          <>
            <p className="mb-3 font-semibold text-primary-dark">
              Votre CV actuel applique-t-il déjà ces conseils ?
            </p>
            <a
              href="/diagnostic"
              className="inline-block rounded-[var(--radius-sm)] bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
            >
              Diagnostiquer mon CV gratuitement
            </a>
          </>
        ) : (
          <>
            <p className="mb-3 font-semibold text-primary-dark">
              Mettez ces conseils en pratique avec CVento.
            </p>
            <a
              href="/signup"
              className="inline-block rounded-[var(--radius-sm)] bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
            >
              Créer mon CV gratuitement
            </a>
          </>
        )}
      </div>
    </main>
  );
}
