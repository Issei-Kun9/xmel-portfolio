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
  { market: "in", category: "real-estate", name: "Mahindra Lifespaces", url: "https://www.mahindralifespaces.com/", why: "Striking architecture photo with a project search right in the hero." },
  { market: "in", category: "real-estate", name: "Puravankara", url: "https://www.puravankara.com/", why: "Warm family imagery with a 50-year trust milestone up front." },
  { market: "in", category: "real-estate", name: "Oberoi Realty", url: "https://www.oberoirealty.com/", why: "Cinematic aerial view that sells the location before the flat." },
  { market: "in", category: "interiors", name: "Urban Ladder", url: "https://www.urbanladder.com/", why: "Design and shop in one: rooms, offers and categories one click away." },
  { market: "in", category: "dental", name: "Sabka Dentist", url: "https://sabkadentist.com/", why: "Treatment-led pages (aligners, braces) with an appointment form always close." },
  { market: "in", category: "skin", name: "Kaya Clinic", url: "https://www.kaya.in/", why: "Treatment-led navigation with consultation booking everywhere." },
  { market: "in", category: "skin", name: "Oliva Clinic", url: "https://www.olivaclinic.com/", why: "A clear promise, a doctor's face and trust stats right under the hero." },
  { market: "in", category: "skin", name: "Dr Batra's", url: "https://www.drbatras.com/", why: "Leads with trust (ratings, clinics, patients) and a book-appointment button." },
  { market: "in", category: "salons", name: "Enrich", url: "https://www.enrichbeauty.com/", why: "Salon locator, services and memberships, plus WhatsApp booking." },
  { market: "in", category: "salons", name: "Naturals", url: "https://naturals.in/", why: "Salon locator front and centre for an 800+ outlet chain." },
  { market: "in", category: "jewellers", name: "CaratLane", url: "https://www.caratlane.com/", why: "Modern, light jewellery store with try-at-home style offers." },
  { market: "in", category: "jewellers", name: "BlueStone", url: "https://www.bluestone.com/", why: "Dramatic jewellery close-ups with category shopping built into the hero." },
  { market: "in", category: "jewellers", name: "Malabar Gold & Diamonds", url: "https://www.malabargoldanddiamonds.com/", why: "A famous face and a 'responsible jeweller' promise in one frame." },
  { market: "in", category: "fitness", name: "Gold's Gym India", url: "https://goldsgym.in/", why: "Bold athletic imagery with a single 'book a free trial' call to action." },
  { market: "in", category: "cafes", name: "Third Wave Coffee", url: "https://www.thirdwavecoffeeroasters.com/", why: "Warm, product-led café brand with a store locator." },
  { market: "in", category: "cafes", name: "Theobroma", url: "https://theobroma.in/", why: "Mouth-watering product photography with ordering one tap away." },
  { market: "in", category: "home-services", name: "Urban Company", url: "https://www.urbancompany.com/", why: "Plumber, electrician and AC repair booked like ordering food." },
  // United States
  { market: "us", category: "roofers", name: "Erie Home", url: "https://www.eriehome.com/", why: "Real homes, a clear 'most trusted' claim and a free-estimate button." },
  { market: "us", category: "plumbers", name: "Roto-Rooter", url: "https://www.rotorooter.com/", why: "Location finder and emergency paths side by side: problem, place, call." },
  { market: "us", category: "plumbers", name: "Benjamin Franklin Plumbing", url: "https://www.benjaminfranklinplumbing.com/", why: "One sharp promise (\"The Punctual Plumber\") carries the whole brand." },
  { market: "us", category: "hvac", name: "Bardi", url: "https://bardi.com/", why: "Friendly branding, motion and real team photos that feel local." },
  { market: "us", category: "hvac", name: "One Hour Heating & Air", url: "https://www.onehourheatandair.com/", why: "Bold colours, friendly technicians and 'enter your ZIP' booking." },
  { market: "us", category: "electricians", name: "Mister Sparky", url: "https://www.mistersparky.com/", why: "Bold colour, personality and a Book Now button everywhere." },
  { market: "us", category: "electricians", name: "Mr. Electric", url: "https://mrelectric.com/", why: "Straightforward trust signals and upfront-pricing messaging." },
  { market: "us", category: "dental", name: "Zen Dental Studio", url: "https://www.zen.dentist/", why: "Spa-like calm: neutral palette and warm photography." },
  { market: "us", category: "dental", name: "Seattle Dental Co.", url: "https://www.seattledentalco.com/", why: "Simple, welcoming layout with booking one tap away." },
  { market: "us", category: "dental", name: "Aspen Dental", url: "https://www.aspendental.com/", why: "A big smiling-patient photo with scheduling front and centre." },
  { market: "us", category: "real-estate", name: "The Agency", url: "https://www.theagencyre.com/", why: "Luxury editorial look: big imagery, restrained type." },
  { market: "us", category: "real-estate", name: "Compass", url: "https://www.compass.com/", why: "Search-first hero: find a home in one step." },
  { market: "us", category: "interiors", name: "Suzy Hoodless", url: "https://suzyhoodless.com/", why: "Confident colour that still navigates simply." },
  { market: "us", category: "interiors", name: "Kelly Wearstler", url: "https://www.kellywearstler.com/", why: "Moody, editorial imagery that sells a signature style." },
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

/**
 * Homepage screenshots we captured and host ourselves (public/inspiration/),
 * above-the-fold at desktop width. Every listed site has one; sites that
 * blocked automated visits or were covered by popups were left out.
 */
const SHOTS = new Set([
  "mahindralifespaces-com", "puravankara-com", "oberoirealty-com", "urbanladder-com", "sabkadentist-com",
  "kaya-in", "olivaclinic-com", "drbatras-com", "enrichbeauty-com", "naturals-in", "caratlane-com",
  "bluestone-com", "malabargoldanddiamonds-com", "goldsgym-in", "thirdwavecoffeeroasters-com", "theobroma-in",
  "urbancompany-com", "eriehome-com", "rotorooter-com", "benjaminfranklinplumbing-com", "bardi-com",
  "onehourheatandair-com", "mistersparky-com", "mrelectric-com", "zen-dentist", "seattledentalco-com",
  "aspendental-com", "theagencyre-com", "compass-com", "suzyhoodless-com", "kellywearstler-com",
]);

export function shotFor(url: string): string | null {
  const slug = new URL(url).hostname.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-");
  return SHOTS.has(slug) ? `/inspiration/${slug}.webp` : null;
}
