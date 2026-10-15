/**
 * Copy for the Vantmere concept site. A fictional estate firm, property and
 * people. The same strings feed the in-world typography (engine/reveals.ts)
 * and the semantic HTML that screen readers and the lite version use.
 */
export const BRAND = {
  name: "Vantmere",
  tagline: "Private estates on still water",
  place: "Lake Vantmere",
  founded: "Est. 2009",
};

export const ABOUT = {
  title: "About",
  lines: ["We place few homes,", "slowly. Each is chosen", "for its light, its silence", "and its water, then", "kept for generations."],
  body: "Vantmere is a private estate firm. We place a handful of lakeside homes each year and stay with them long after the keys change hands. Each one is chosen for its light, its silence and its water.",
};

export const SERVICES = {
  title: "What we do",
  items: [
    { name: "Private acquisition", body: "We find homes that are never listed, and negotiate quietly on your behalf." },
    { name: "Off-market sales", body: "Discreet sales to a short list of qualified buyers. No public listing, no open houses." },
    { name: "Architectural development", body: "From site to keys: we commission, build and furnish houses with architects we trust." },
    { name: "Estate stewardship", body: "Maintenance, staff and seasonal care, so the house is ready whenever you are." },
  ],
};

export const TESTIMONIAL = {
  quote: "They found us a house we didn’t know we were looking for, then made every difficult part disappear.",
  by: "A. & M. Lindqvist",
  where: "Hollin Reach",
};

export const LISTINGS = [
  { name: "The Larch House", where: "Lake Vantmere", spec: "5 bedrooms · 640 m²", price: "Price on request" },
  { name: "Hollin Reach", where: "Glacier lakeshore", spec: "4 bedrooms · 480 m²", price: "Price on request" },
  { name: "Saltmere Point", where: "Coastal headland", spec: "6 bedrooms · 910 m²", price: "Price on request" },
];

export const PROCESS = {
  title: "How we work",
  steps: [
    { n: "01", name: "Listen", body: "A long conversation about how you live, before we look at a single house." },
    { n: "02", name: "Search", body: "A short list, mostly off-market, visited by us first." },
    { n: "03", name: "Secure", body: "Negotiation, surveys and legal work handled end to end." },
    { n: "04", name: "Keep", body: "Stewardship for as long as the house is yours." },
  ],
};

export const EXPERTISE = {
  title: "In numbers",
  stats: [
    { value: "38", label: "homes placed" },
    { value: "17", label: "years on the water" },
    { value: "0", label: "public listings" },
  ],
};

export const CONTACT = {
  title: "Begin a conversation",
  body: "Every Vantmere relationship starts with a private conversation.",
};

/** Demo disclosure: shown in the UI and the accessible content. */
export const CONCEPT_NOTE =
  "Vantmere is a fictional concept site designed and built by XMEL Automations. The firm, the property, the listings and the quote are illustrative.";

export const XMEL_WHATSAPP =
  "https://wa.me/917905214791?text=" +
  encodeURIComponent("Hi! I saw the Vantmere 3D real-estate concept and I'd like a website like this for my business.");

export const CHAPTERS = [
  { id: "lake", label: "The lake" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "testimonial", label: "A client’s words" },
  { id: "listings", label: "Selected homes" },
  { id: "process", label: "Process" },
  { id: "numbers", label: "In numbers" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "The jetty" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
