/**
 * Real websites we admire, by market and category, for the /inspiration
 * gallery. These are NOT our work: every card credits the business and links
 * out, and the page says so. Clients use them to point at a style they like.
 */
export type InspoMarket = "in" | "us";

export const INSPO_CATEGORIES = [
  { slug: "real-estate", name: "Real estate" },
  { slug: "interiors", name: "Interior design" },
  { slug: "dental", name: "Dental clinics" },
  { slug: "skin", name: "Skin & aesthetic clinics" },
  { slug: "salons", name: "Salons & spas" },
  { slug: "jewellers", name: "Jewellers" },
  { slug: "fitness", name: "Gyms & fitness" },
  { slug: "cafes", name: "Cafés & restaurants" },
  { slug: "home-services", name: "Home services" },
  { slug: "roofers", name: "Roofers" },
  { slug: "plumbers", name: "Plumbers" },
  { slug: "hvac", name: "HVAC" },
  { slug: "electricians", name: "Electricians" },
] as const;

export type Inspo = {
  name: string;
  url: string;
  market: InspoMarket;
  category: (typeof INSPO_CATEGORIES)[number]["slug"];
  /** What's worth borrowing from this site, in one line. */
  why: string;
};

export const INSPIRATION: Inspo[] = [
  // India
  { market: "in", category: "real-estate", name: "Godrej Properties", url: "https://www.godrejproperties.com/", why: "Project-first browsing by city, with an enquiry form on every listing." },
  { market: "in", category: "real-estate", name: "Prestige Group", url: "https://www.prestigeconstructions.com/", why: "City-by-city project browsing for a big Bangalore developer." },
  { market: "in", category: "real-estate", name: "Lodha", url: "https://www.lodhagroup.com/", why: "Luxury developer look: full-bleed imagery and very little text." },
  { market: "in", category: "interiors", name: "Livspace", url: "https://www.livspace.com/in", why: "Design ideas gallery that turns browsing into a free consultation booking." },
  { market: "in", category: "interiors", name: "DesignCafe", url: "https://www.designcafe.com/", why: "Warranty, homes delivered and experience centres: trust in one screen." },
  { market: "in", category: "dental", name: "Clove Dental", url: "https://clovedental.in/", why: "Clinic finder and toll-free booking for a multi-city practice." },
  { market: "in", category: "dental", name: "Sabka Dentist", url: "https://sabkadentist.com/", why: "Treatment-led pages (aligners, braces) with an appointment form always close." },
  { market: "in", category: "skin", name: "Kaya Clinic", url: "https://www.kaya.in/", why: "Treatment-led navigation with consultation booking everywhere." },
  { market: "in", category: "salons", name: "Lakmé Salon", url: "https://www.lakmesalon.in/", why: "Premium beauty brand feel with a clear Book Appointment path." },
  { market: "in", category: "salons", name: "Enrich", url: "https://www.enrichbeauty.com/", why: "Salon locator, services and memberships, plus WhatsApp booking." },
  { market: "in", category: "salons", name: "Naturals", url: "https://naturals.in/", why: "Salon locator front and centre for an 800+ outlet chain." },
  { market: "in", category: "jewellers", name: "Tanishq", url: "https://www.tanishq.co.in/", why: "Rich collection pages that feel like walking into the store." },
  { market: "in", category: "jewellers", name: "CaratLane", url: "https://www.caratlane.com/", why: "Modern, light jewellery store with try-at-home style offers." },
  { market: "in", category: "fitness", name: "cult.fit", url: "https://www.cult.fit/", why: "Bold, energetic brand with memberships and classes one tap away." },
  { market: "in", category: "cafes", name: "Third Wave Coffee", url: "https://www.thirdwavecoffeeroasters.com/", why: "Warm, product-led café brand with a store locator." },
  { market: "in", category: "home-services", name: "Urban Company", url: "https://www.urbancompany.com/", why: "Plumber, electrician and AC repair booked like ordering food." },
  // United States
  { market: "us", category: "roofers", name: "Baker Roofing", url: "https://bakerroofing.com/", why: "A century of trust up front, with one confident estimate form." },
  { market: "us", category: "roofers", name: "Tecta America", url: "https://www.tectaamerica.com/", why: "Drone-shot hero video that makes the company feel huge." },
  { market: "us", category: "plumbers", name: "Roto-Rooter", url: "https://www.rotorooter.com/", why: "Location finder and emergency paths side by side: problem, place, call." },
  { market: "us", category: "plumbers", name: "Benjamin Franklin Plumbing", url: "https://www.benjaminfranklinplumbing.com/", why: "One sharp promise (\"The Punctual Plumber\") carries the whole brand." },
  { market: "us", category: "hvac", name: "Bardi", url: "https://bardi.com/", why: "Friendly branding, motion and real team photos that feel local." },
  { market: "us", category: "hvac", name: "Service Experts", url: "https://www.serviceexperts.com/", why: "Clean service menu and booking that works for stressed homeowners." },
  { market: "us", category: "electricians", name: "Mister Sparky", url: "https://www.mistersparky.com/", why: "Bold colour, personality and a Book Now button everywhere." },
  { market: "us", category: "electricians", name: "Mr. Electric", url: "https://mrelectric.com/", why: "Straightforward trust signals and upfront-pricing messaging." },
  { market: "us", category: "dental", name: "Tusk Dental", url: "https://www.tuskdental.ie/", why: "Bold, modern branding that makes a dentist feel like a design brand." },
  { market: "us", category: "dental", name: "Zen Dental Studio", url: "https://www.zen.dentist/", why: "Spa-like calm: neutral palette and warm photography." },
  { market: "us", category: "dental", name: "Seattle Dental Co.", url: "https://www.seattledentalco.com/", why: "Simple, welcoming layout with booking one tap away." },
  { market: "us", category: "real-estate", name: "The Agency", url: "https://www.theagencyre.com/", why: "Luxury editorial look: big imagery, restrained type." },
  { market: "us", category: "real-estate", name: "DeLeon Realty", url: "https://deleonrealty.com/", why: "Listings and neighbourhood guides front and centre." },
  { market: "us", category: "interiors", name: "Suzy Hoodless", url: "https://suzyhoodless.com/", why: "Confident colour that still navigates simply." },
  { market: "us", category: "interiors", name: "Jessica Nelson Design", url: "https://jessicanelsondesign.com/", why: "Photo-led portfolio with plain, clear project labels." },
  { market: "us", category: "salons", name: "Drybar", url: "https://www.drybar.com/", why: "Playful brand voice with booking always in reach." },
  { market: "us", category: "salons", name: "Parlor by Haides", url: "https://www.haidesprojects.com/", why: "Generous whitespace that reads premium." },
];

/** Industry-page slug → gallery category, so /for/<industry> can deep-link a filter. */
export const INDUSTRY_TO_CATEGORY: Record<string, Inspo["category"]> = {
  "real-estate-agents": "real-estate",
  "interior-designers": "interiors",
  dentists: "dental",
  salons: "salons",
  roofers: "roofers",
  plumbers: "plumbers",
  hvac: "hvac",
  electricians: "electricians",
};
