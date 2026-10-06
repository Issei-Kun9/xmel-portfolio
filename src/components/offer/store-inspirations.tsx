import Image from "next/image";
import { ExternalLink } from "lucide-react";

/**
 * Real Indian online stores to point at when choosing a look. These are NOT
 * our work: each card credits the brand and links out, and the section says
 * so. Screenshots live in /public/inspiration/ecom (1440×900 captures at
 * 960×600).
 */
const STORES = [
  { name: "Minimalist", slug: "beminimalist-co", url: "https://beminimalist.co/", kind: "Skincare", why: "Clinical, white and product-first. The offer sits right in the hero." },
  { name: "Sugar Cosmetics", slug: "sugarcosmetics-com", url: "https://www.sugarcosmetics.com/", kind: "Beauty", why: "Big model imagery with shop-by-category tiles directly below." },
  { name: "Nicobar", slug: "nicobar-com", url: "https://www.nicobar.com/", kind: "Fashion", why: "Editorial, magazine-like hero. Quiet navigation that lets the product speak." },
  { name: "Suta", slug: "suta-in", url: "https://suta.in/", kind: "Sarees & ethnic", why: "Warm, festive storytelling with new arrivals front and centre." },
  { name: "The Souled Store", slug: "thesouledstore-com", url: "https://www.thesouledstore.com/", kind: "Apparel", why: "Men / Women split in one tap, with a strong home-grown trust line." },
  { name: "Bewakoof", slug: "bewakoof-com", url: "https://www.bewakoof.com/", kind: "Apparel", why: "Loud, playful colour and a social-proof number in the first screen." },
  { name: "Bombay Shaving Company", slug: "bombayshavingcompany-com", url: "https://www.bombayshavingcompany.com/", kind: "Grooming", why: "Dark, bold, product-hero layout with a search bar up top." },
  { name: "boAt", slug: "boat-lifestyle-com", url: "https://www.boat-lifestyle.com/", kind: "Electronics", why: "Sale-led hero with warranty, EMI and delivery promises right under it." },
  { name: "Chumbak", slug: "chumbak-com", url: "https://www.chumbak.com/", kind: "Home & gifting", why: "Round category bubbles and a bright lifestyle banner that sells the vibe." },
  { name: "Blue Tokai", slug: "bluetokaicoffee-com", url: "https://www.bluetokaicoffee.com/", kind: "Coffee", why: "Clean product banner, then shop by how you brew — easy for first-timers." },
  { name: "The Whole Truth", slug: "thewholetruthfoods-com", url: "https://www.thewholetruthfoods.com/", kind: "Food", why: "A brand promise as the headline. Honest, text-led and memorable." },
  { name: "Vahdam", slug: "vahdamteas-in", url: "https://www.vahdamteas.in/", kind: "Tea & wellness", why: "One hero product, a clear benefit, and press logos as trust." },
];

export default function StoreInspirations() {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {STORES.map((s) => (
        <li key={s.slug}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex flex-col h-full rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--accent-line)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] transition-colors duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tertiary)]">
              <Image
                src={`/inspiration/ecom/${s.slug}.webp`}
                alt={`${s.name} online store homepage`}
                width={960}
                height={600}
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[rgba(11,11,14,0.78)] backdrop-blur font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-primary)]">
                {s.kind}
              </span>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <h3 className="flex items-center justify-between gap-3 font-display text-[16px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1.5">
                {s.name}
                <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />
              </h3>
              <p className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
                {s.why}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
