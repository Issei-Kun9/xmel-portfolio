/** Blog categories, safe to import from client components (no fs). */
export type PostCategory = "real-estate" | "home-services" | "websites" | "seo" | "automation";

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  "real-estate": "Real Estate",
  "home-services": "Home Services",
  websites: "Websites",
  seo: "SEO",
  automation: "Automation",
};
