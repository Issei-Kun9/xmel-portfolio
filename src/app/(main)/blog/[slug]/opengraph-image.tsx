import { getAllPosts, getPost, CATEGORY_LABELS } from "@/lib/blog";
import { OG_SIZE, renderOg } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "XMEL Automations blog post";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({
    eyebrow: post ? `${CATEGORY_LABELS[post.category]} · Guide` : "Blog",
    title: post?.title ?? "XMEL Automations blog",
    footer: post ? `By Yashwardhan Chauhan · ${post.readTime}` : undefined,
  });
}
