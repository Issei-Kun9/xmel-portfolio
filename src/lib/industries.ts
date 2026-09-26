import type { Market } from "./market";

/** A sample business shown in the site / Google mockups. Illustrative only. */
export type Sample = {
  biz: string;
  domain: string;
  city: string;
  query: string;
  /** What Google shows after the business name, e.g. "Roofing in Austin, TX". */
  serpTitle: string;
  headline: string;
  sub: string;
  cta: string;
  rivals: [string, string];
};

export type Industry = {
  slug: string;
  name: string;
  /** "roofers", used mid-sentence. */
  plural: string;
  pains: string[];
  /** Which AI product fits: real estate or home services. */
  ai: "real-estate" | "home-services";
  samples: Record<Market, Sample>;
};

export const DEFAULT_SAMPLES: Record<Market, Sample> = {
  us: {
    biz: "Summit Roofing Co.", domain: "summitroofing.com", city: "Austin, TX", query: "roofer near me",
    serpTitle: "Roofing in Austin, TX", headline: "Trusted by homeowners across Austin.",
    sub: "Free quote in 24 hours. Licensed, insured, and on time.", cta: "Get a free quote",
    rivals: ["ProRoof Austin", "Lone Star Roofers"],
  },
  in: {
    biz: "Sharma Interiors", domain: "sharmainteriors.in", city: "Pune", query: "interior designer in pune",
    serpTitle: "Interior Design in Pune", headline: "Homes in Pune, designed to be lived in.",
    sub: "Free site visit and 3D design within a week.", cta: "Book a free site visit",
    rivals: ["Pune Home Decor", "Studio Casa Pune"],
  },
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "real-estate-agents", name: "Real estate agents", plural: "real estate agents", ai: "real-estate",
    pains: [
      "Portal leads go cold in minutes, and you're showing a house when they come in.",
      "Your website is a brokerage template that looks like every other agent's.",
      "Buyers search \"realtor in [your area]\" and find the big teams first.",
    ],
    samples: {
      us: { biz: "Harper Realty Group", domain: "harperrealty.com", city: "Tampa, FL", query: "realtor in tampa", serpTitle: "Real Estate Agents in Tampa, FL", headline: "Find your place in Tampa.", sub: "Local agents, 200+ homes sold, replies within minutes.", cta: "Book a showing", rivals: ["Bayfront Homes Tampa", "Gulf Coast Realty"] },
      in: { biz: "Kapoor Properties", domain: "kapoorproperties.in", city: "Gurugram", query: "property dealer in gurugram", serpTitle: "Property Consultants in Gurugram", headline: "Verified homes in Gurugram, zero brokerage surprises.", sub: "RERA-registered. Site visits 7 days a week.", cta: "Book a site visit", rivals: ["Gurgaon Homes Hub", "NCR Realty Point"] },
    },
  },
  {
    slug: "roofers", name: "Roofers", plural: "roofers", ai: "home-services",
    pains: [
      "Storm-season calls come in while you're on a roof, and they call the next roofer.",
      "Your site doesn't show your work, so homeowners can't trust you with a $15k job.",
      "\"Roofer near me\" shows three competitors before you.",
    ],
    samples: { us: DEFAULT_SAMPLES.us, in: { biz: "Deccan Roofing Solutions", domain: "deccanroofing.in", city: "Hyderabad", query: "roof waterproofing hyderabad", serpTitle: "Roof Waterproofing in Hyderabad", headline: "Leak-proof roofs before the monsoon.", sub: "Free inspection. 10-year written warranty.", cta: "Book a free inspection", rivals: ["Hyderabad Waterproofing Co", "Shield Roof Care"] } },
  },
  {
    slug: "plumbers", name: "Plumbers", plural: "plumbers", ai: "home-services",
    pains: [
      "Emergency calls at night go to voicemail, and those are your best-paying jobs.",
      "Your website isn't built to get a click-to-call on a phone.",
      "Google shows the lead-gen directories, not you.",
    ],
    samples: {
      us: { biz: "Clearflow Plumbing", domain: "clearflowplumbing.com", city: "Phoenix, AZ", query: "emergency plumber phoenix", serpTitle: "24/7 Plumber in Phoenix, AZ", headline: "A plumber at your door in 60 minutes.", sub: "Upfront pricing. Available 24/7, including holidays.", cta: "Call now", rivals: ["Desert Pipe Pros", "Valley Rooter"] },
      in: { biz: "QuickFix Plumbing", domain: "quickfixplumbing.in", city: "Bengaluru", query: "plumber near me bangalore", serpTitle: "Plumbers in Bengaluru", headline: "Leaks fixed today, anywhere in Bengaluru.", sub: "Verified plumbers. Fixed visit charge.", cta: "Book on WhatsApp", rivals: ["Bangalore Plumbing Hub", "PipeCare BLR"] },
    },
  },
  {
    slug: "hvac", name: "HVAC companies", plural: "HVAC companies", ai: "home-services",
    pains: [
      "Peak-season calls pile up and missed calls turn into lost installs.",
      "Your site lists services but never asks for the booking.",
      "\"AC repair near me\" goes to franchises with bigger budgets.",
    ],
    samples: {
      us: { biz: "Northwind Heating & Air", domain: "northwindhvac.com", city: "Dallas, TX", query: "ac repair dallas", serpTitle: "AC Repair & Installation in Dallas, TX", headline: "Cool again by tonight.", sub: "Same-day AC repair. Financing on new systems.", cta: "Schedule service", rivals: ["Metroplex Air", "Lone Star Cooling"] },
      in: { biz: "CoolAir Services", domain: "coolairservices.in", city: "Mumbai", query: "ac repair mumbai", serpTitle: "AC Repair & Service in Mumbai", headline: "AC service at home, same day in Mumbai.", sub: "All brands. 90-day service warranty.", cta: "Book a service", rivals: ["Mumbai AC Care", "Chill Point Services"] },
    },
  },
  {
    slug: "electricians", name: "Electricians", plural: "electricians", ai: "home-services",
    pains: [
      "You can't answer the phone on a job, so the caller moves on.",
      "No website, or one that hasn't changed since 2015.",
      "Customers can't find you for the jobs you actually want.",
    ],
    samples: {
      us: { biz: "Brightline Electric", domain: "brightlineelectric.com", city: "Denver, CO", query: "electrician denver", serpTitle: "Licensed Electricians in Denver, CO", headline: "Licensed electricians, on time, every time.", sub: "Panel upgrades, EV chargers, rewiring. Free estimates.", cta: "Get an estimate", rivals: ["Mile High Electric", "Front Range Wiring"] },
      in: { biz: "Volt Electricals", domain: "voltelectricals.in", city: "Chennai", query: "electrician near me chennai", serpTitle: "Electricians in Chennai", headline: "Safe wiring and repairs across Chennai.", sub: "Licensed electricians. Same-day visits.", cta: "Book on WhatsApp", rivals: ["Chennai Electric Works", "PowerFix Chennai"] },
    },
  },
  {
    slug: "dentists", name: "Dental clinics", plural: "dental clinics", ai: "home-services",
    pains: [
      "Appointment enquiries after hours wait until morning, and patients book elsewhere.",
      "Your site doesn't make a nervous patient feel safe enough to book.",
      "\"Dentist near me\" is the most competitive search in town.",
    ],
    samples: {
      us: { biz: "Maple Family Dental", domain: "mapledental.com", city: "Columbus, OH", query: "dentist near me columbus", serpTitle: "Family Dentist in Columbus, OH", headline: "Gentle dentistry for the whole family.", sub: "New patients welcome. Most insurance accepted.", cta: "Book an appointment", rivals: ["Columbus Smile Studio", "Buckeye Dental Care"] },
      in: { biz: "SmileCraft Dental Clinic", domain: "smilecraftdental.in", city: "Ahmedabad", query: "dentist in ahmedabad", serpTitle: "Dental Clinic in Ahmedabad", headline: "Painless dental care in Ahmedabad.", sub: "Root canals, implants and aligners. Evening slots.", cta: "Book an appointment", rivals: ["Ahmedabad Dental Studio", "Pearl Smile Clinic"] },
    },
  },
  {
    slug: "interior-designers", name: "Interior designers", plural: "interior designers", ai: "home-services",
    pains: [
      "Enquiries from Instagram and Houzz sit unanswered while you're on site.",
      "Your portfolio lives on Instagram, not on a site that sells a ₹20L / $50k project.",
      "Clients search for designers in their city and find the aggregators.",
    ],
    samples: {
      us: { biz: "Oak & Linen Interiors", domain: "oakandlinen.com", city: "Charlotte, NC", query: "interior designer charlotte", serpTitle: "Interior Designers in Charlotte, NC", headline: "Rooms that feel like you, finally.", sub: "Full-service design from concept to install.", cta: "Book a consultation", rivals: ["Queen City Interiors", "Charlotte Design House"] },
      in: DEFAULT_SAMPLES.in,
    },
  },
  {
    slug: "salons", name: "Salons & spas", plural: "salons and spas", ai: "home-services",
    pains: [
      "Booking requests come in on DMs at midnight and sit there.",
      "No online booking, so every appointment is a phone call.",
      "New clients search \"salon near me\" and never see you.",
    ],
    samples: {
      us: { biz: "Luxe Hair Studio", domain: "luxehairstudio.com", city: "Atlanta, GA", query: "hair salon atlanta", serpTitle: "Hair Salon in Atlanta, GA", headline: "Your best hair day, every visit.", sub: "Color, cuts and extensions. Book online in 30 seconds.", cta: "Book now", rivals: ["Peachtree Salon", "ATL Style Bar"] },
      in: { biz: "Glow Salon & Spa", domain: "glowsalon.in", city: "Delhi", query: "salon near me delhi", serpTitle: "Salon & Spa in South Delhi", headline: "Look good, feel better, in South Delhi.", sub: "Hair, skin and bridal. Book on WhatsApp.", cta: "Book on WhatsApp", rivals: ["Delhi Beauty Lounge", "Hauz Khas Salon"] },
    },
  },
];

export function industryBySlug(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
