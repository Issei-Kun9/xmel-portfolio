import type { Market } from "./market";

/**
 * Simulated conversations for the AI demo (ChatDemo). Always labelled as a
 * demo on the page. Every script has six messages (lead, AI, lead, AI, lead,
 * AI) so the timeline beside the phone lines up with the chat.
 */
export type Msg = { from: "lead" | "ai"; text: string; time: string };
export type Script = {
  contact: string;
  channel: string;
  source: string;
  messages: Msg[];
  booked: string;
  notify: string;
  /** What the AI asks to qualify, for the timeline ("Budget, timeline, pre-approval"). */
  qualifies: string;
  /** What gets booked, mid-sentence ("the showing"). */
  books: string;
};
export type ScriptSet = Record<Market, Script>;

const m = (from: Msg["from"], text: string, time: string): Msg => ({ from, text, time });

export const REAL_ESTATE: ScriptSet = {
  us: {
    contact: "Sarah M.", channel: "Text message", source: "Zillow",
    messages: [
      m("lead", "Hi, is the 3-bed on Oak Street still available?", "2:14 AM"),
      m("ai", "Hi Sarah! Yes, it is. Quick question so I can help: are you hoping to move in the next 3 months, and are you pre-approved?", "2:14 AM"),
      m("lead", "Yes to both, within 2 months.", "2:16 AM"),
      m("ai", "Great. I can set up a showing: Saturday 11 AM or Sunday 4 PM?", "2:16 AM"),
      m("lead", "Saturday works", "2:17 AM"),
      m("ai", "Booked! Saturday 11 AM at 14 Oak Street. I'll text you a reminder the day before.", "2:17 AM"),
    ],
    booked: "Showing booked · Sat 11:00 AM",
    notify: "Hot lead: pre-approved, moving in 2 months",
    qualifies: "Timeline and pre-approval",
    books: "the showing",
  },
  in: {
    contact: "Priya S.", channel: "WhatsApp", source: "MagicBricks",
    messages: [
      m("lead", "Hi, Baner wala 3BHK abhi available hai?", "2:14 AM"),
      m("ai", "Hi Priya! Haan, available hai. Aap kab tak shift karna chahte hain, aur budget roughly ₹1.2 Cr ke aas-paas hai?", "2:14 AM"),
      m("lead", "Haan, 2 mahine mein. Budget theek hai.", "2:16 AM"),
      m("ai", "Perfect. Site visit ke liye Saturday 11 AM ya Sunday 4 PM?", "2:16 AM"),
      m("lead", "Saturday 11 AM", "2:17 AM"),
      m("ai", "Done! Saturday 11 AM site visit booked. Location pin aur reminder bhej diya hai.", "2:17 AM"),
    ],
    booked: "Site visit booked · Sat 11:00 AM",
    notify: "Hot lead: budget ₹1.2 Cr, buying in 2 months",
    qualifies: "Budget and move-in timeline",
    books: "the site visit",
  },
};

export const HOME_SERVICES: ScriptSet = {
  us: {
    contact: "Mike R.", channel: "Text message", source: "your website",
    messages: [
      m("lead", "Water heater is leaking all over the garage. Can someone come tonight?", "11:52 PM"),
      m("ai", "Sorry to hear that, Mike. First, turn the cold-water valve on top of the heater clockwise to stop the flow. What's your ZIP code?", "11:52 PM"),
      m("lead", "Done, it stopped. 78704", "11:54 PM"),
      m("ai", "Thanks. A technician can be there between 7 and 8 AM, or I can flag it as an emergency call-out tonight. Which do you prefer?", "11:54 PM"),
      m("lead", "7 AM is fine now that it's off", "11:55 PM"),
      m("ai", "Booked for 7 AM. You'll get a text when the tech is on the way.", "11:55 PM"),
    ],
    booked: "Job booked · Tomorrow 7:00 AM",
    notify: "Water heater leak, valve closed, ZIP 78704",
    qualifies: "The problem, urgency and ZIP code",
    books: "the job",
  },
  in: {
    contact: "Rahul K.", channel: "WhatsApp", source: "Google Maps",
    messages: [
      m("lead", "AC se paani tapak raha hai, aaj koi aa sakta hai?", "9:40 PM"),
      m("ai", "Hi Rahul! Haan, zaroor. Split AC hai ya window? Aur aapka area/pincode?", "9:40 PM"),
      m("lead", "Split, 1.5 ton. Andheri West 400053", "9:42 PM"),
      m("ai", "Theek hai. Kal subah 10-11 ya shaam 5-6 ka slot free hai. Kaunsa chalega?", "9:42 PM"),
      m("lead", "Subah 10 baje", "9:43 PM"),
      m("ai", "Booked! Kal 10 AM technician aa jayega. Visit charge ₹299, service ke baad adjust ho jayega.", "9:43 PM"),
    ],
    booked: "Service booked · Tomorrow 10:00 AM",
    notify: "Split AC leak, Andheri West, 400053",
    qualifies: "AC type, problem and pincode",
    books: "the service visit",
  },
};

/** One demo per industry page, in that trade's own words. */
export const INDUSTRY_CHATS: Record<string, ScriptSet> = {
  "real-estate-agents": REAL_ESTATE,
  roofers: {
    us: {
      contact: "Dana W.", channel: "Text message", source: "Google",
      messages: [
        m("lead", "Hail last night, now there's a drip in the upstairs bedroom. Do you do insurance claims?", "10:31 PM"),
        m("ai", "Sorry about the leak, Dana. Yes, we inspect storm damage and document it for your insurer. Is the roof shingle or metal, and what's the address?", "10:31 PM"),
        m("lead", "Shingle, about 12 years old. 4411 Ridge Ln", "10:33 PM"),
        m("ai", "Thanks. We can do a free inspection tomorrow at 9 AM or 1 PM. Meanwhile a bucket and towel under the drip will help.", "10:33 PM"),
        m("lead", "9 AM please", "10:34 PM"),
        m("ai", "Booked for 9 AM at 4411 Ridge Ln. The inspector will text when on the way and bring photos for your claim.", "10:34 PM"),
      ],
      booked: "Inspection booked · Tomorrow 9:00 AM",
      notify: "Hail leak, 12-yr shingle roof, insurance claim",
      qualifies: "Damage, roof type and address",
      books: "the free inspection",
    },
    in: {
      contact: "Srinivas R.", channel: "WhatsApp", source: "IndiaMART",
      messages: [
        m("lead", "Terrace pe waterproofing chahiye, monsoon se pehle. Rate kya hai?", "8:05 PM"),
        m("ai", "Namaste Srinivas ji! Rate area aur surface pe depend karta hai. Terrace roughly kitne sq ft hai, aur abhi leakage hai?", "8:05 PM"),
        m("lead", "Around 1200 sq ft. Haan, 2 rooms mein seepage.", "8:07 PM"),
        m("ai", "Samajh gaya. Free site inspection ke baad exact quote denge. Kal 11 AM ya Saturday 10 AM, kya suit karega?", "8:07 PM"),
        m("lead", "Saturday 10 AM, Kondapur", "8:08 PM"),
        m("ai", "Booked! Saturday 10 AM, Kondapur. Engineer moisture check karke quote wahin de dega.", "8:08 PM"),
      ],
      booked: "Site inspection · Sat 10:00 AM",
      notify: "1,200 sq ft terrace, seepage in 2 rooms, Kondapur",
      qualifies: "Area, seepage and location",
      books: "the site inspection",
    },
  },
  plumbers: {
    us: HOME_SERVICES.us,
    in: {
      contact: "Anita D.", channel: "WhatsApp", source: "Justdial",
      messages: [
        m("lead", "Kitchen sink block ho gaya hai, paani wapas aa raha hai. Plumber mil jayega?", "7:48 PM"),
        m("ai", "Hi Anita ji! Haan. Sirf kitchen sink hai ya bathroom drain bhi slow hai? Aur aapka area?", "7:48 PM"),
        m("lead", "Sirf kitchen. HSR Layout", "7:50 PM"),
        m("ai", "Theek hai. Aaj 8:30-9 PM ya kal subah 9 baje plumber aa sakta hai. Visit ₹199, kaam ke hisaab se final.", "7:50 PM"),
        m("lead", "Aaj hi bhej do", "7:51 PM"),
        m("ai", "Done! Plumber 8:30-9 PM tak pahunch jayega. Naam aur number abhi bhej raha hoon.", "7:51 PM"),
      ],
      booked: "Plumber booked · Today 8:30 PM",
      notify: "Kitchen sink blockage, HSR Layout",
      qualifies: "The problem and area",
      books: "the visit",
    },
  },
  hvac: {
    us: {
      contact: "Carlos P.", channel: "Text message", source: "Facebook ad",
      messages: [
        m("lead", "AC is blowing warm air and it's 96 degrees. How soon can you come?", "4:12 PM"),
        m("ai", "Sorry, Carlos, that's miserable in this heat. Is the outdoor unit running, and roughly how old is the system?", "4:12 PM"),
        m("lead", "Outside fan is on but it's loud. Maybe 9 years.", "4:14 PM"),
        m("ai", "Could be a capacitor, a common quick fix. A tech can come today 6-8 PM or tomorrow 8-10 AM. The diagnostic is $89, credited to the repair.", "4:14 PM"),
        m("lead", "Today please", "4:15 PM"),
        m("ai", "You're booked for today, 6-8 PM. I'll text the tech's name and photo when they're on the way.", "4:15 PM"),
      ],
      booked: "Repair booked · Today 6–8 PM",
      notify: "No cooling, loud outdoor unit, 9-yr system",
      qualifies: "Symptoms and system age",
      books: "the repair",
    },
    in: HOME_SERVICES.in,
  },
  electricians: {
    us: {
      contact: "Jen L.", channel: "Text message", source: "your website",
      messages: [
        m("lead", "Looking for a quote to install a Level 2 EV charger in my garage", "9:03 PM"),
        m("ai", "Happy to help, Jen! Do you know your main panel size (100A or 200A), and how far is the panel from where you park?", "9:03 PM"),
        m("lead", "200A I think, panel is in the garage", "9:05 PM"),
        m("ai", "That usually makes it a simple install. An electrician can do a quick site visit and firm quote Thursday 10 AM or Friday 2 PM.", "9:05 PM"),
        m("lead", "Friday 2", "9:06 PM"),
        m("ai", "Booked for Friday 2 PM. If you have the charger model, reply with it and we'll check the specs first.", "9:06 PM"),
      ],
      booked: "Site visit · Fri 2:00 PM",
      notify: "EV charger install, 200A panel in garage",
      qualifies: "Panel size and install location",
      books: "the quote visit",
    },
    in: {
      contact: "Karthik M.", channel: "WhatsApp", source: "Google Maps",
      messages: [
        m("lead", "Naye flat mein full wiring check aur inverter connection karwana hai", "6:20 PM"),
        m("ai", "Hi Karthik! Zaroor. Flat kitne BHK ka hai, aur inverter already liya hai ya suggest karein?", "6:20 PM"),
        m("lead", "2BHK, Velachery. Inverter nahi liya abhi", "6:22 PM"),
        m("ai", "Theek hai. Electrician wiring check karke load ke hisaab se inverter bhi suggest karega. Kal 11 AM ya 4 PM?", "6:22 PM"),
        m("lead", "4 PM", "6:23 PM"),
        m("ai", "Booked! Kal 4 PM, Velachery. Inspection free hai, quote wahin milega.", "6:23 PM"),
      ],
      booked: "Inspection booked · Tomorrow 4:00 PM",
      notify: "2BHK wiring check + inverter, Velachery",
      qualifies: "Flat size and what's needed",
      books: "the inspection",
    },
  },
  dentists: {
    us: {
      contact: "Tom B.", channel: "Text message", source: "Google",
      messages: [
        m("lead", "Do you take new patients? Cracked a molar and it's starting to hurt", "8:47 PM"),
        m("ai", "Yes, we do, Tom, and sorry you're in pain. Is it constant or only when you chew? And do you have dental insurance?", "8:47 PM"),
        m("lead", "Only when I chew. Delta Dental PPO", "8:49 PM"),
        m("ai", "We're in-network with Delta PPO. We have an urgent slot tomorrow at 8:30 AM, or 3:15 PM.", "8:49 PM"),
        m("lead", "8:30", "8:50 PM"),
        m("ai", "Booked for 8:30 AM. I've sent the new-patient form so you can skip the clipboard. Avoid chewing on that side tonight.", "8:50 PM"),
      ],
      booked: "New patient · Tomorrow 8:30 AM",
      notify: "Cracked molar, pain on chewing, Delta PPO",
      qualifies: "Symptoms and insurance",
      books: "the appointment",
    },
    in: {
      contact: "Meera J.", channel: "WhatsApp", source: "Instagram",
      messages: [
        m("lead", "Hi, aligners ka cost kitna hai? Teeth thode crooked hain", "10:15 PM"),
        m("ai", "Hi Meera! Cost case pe depend karta hai, usually ₹60,000 se start. Pehle 3D scan se exact plan milega. Aapne pehle braces pehne hain?", "10:15 PM"),
        m("lead", "Nahi, kabhi nahi", "10:17 PM"),
        m("ai", "Theek hai. Consultation aur 3D scan is hafte free hai. Saturday 12 PM ya Monday 6 PM?", "10:17 PM"),
        m("lead", "Saturday 12", "10:18 PM"),
        m("ai", "Booked! Saturday 12 PM, SmileCraft Satellite. Location aur reminder bhej diya hai.", "10:18 PM"),
      ],
      booked: "Aligner consult · Sat 12:00 PM",
      notify: "Aligners enquiry, first-time, from Instagram",
      qualifies: "What they want and their history",
      books: "the consultation",
    },
  },
  "interior-designers": {
    us: {
      contact: "Rachel K.", channel: "Text message", source: "Houzz",
      messages: [
        m("lead", "We just bought a house and want help with the living room and kitchen. Do you do full design?", "9:26 PM"),
        m("ai", "Congratulations, Rachel! Yes, full design through install. Are you thinking a refresh (furniture and styling) or renovation too? And a rough budget?", "9:26 PM"),
        m("lead", "Some renovation in the kitchen. Maybe $40-60k total", "9:29 PM"),
        m("ai", "That's a great range for both rooms. The next step is a 30-min discovery call with the designer: Tuesday 10 AM or Wednesday 5 PM?", "9:29 PM"),
        m("lead", "Wednesday 5", "9:30 PM"),
        m("ai", "Booked! Wednesday 5 PM. Feel free to send photos and any Pinterest boards before then.", "9:30 PM"),
      ],
      booked: "Discovery call · Wed 5:00 PM",
      notify: "New homeowner, living + kitchen reno, $40–60k",
      qualifies: "Scope and budget",
      books: "the discovery call",
    },
    in: {
      contact: "Nikhil & Sneha", channel: "WhatsApp", source: "your website",
      messages: [
        m("lead", "3BHK ka full interior karwana hai, possession next month. Budget approx kitna lagega?", "9:10 PM"),
        m("ai", "Hi Nikhil! Congratulations on the new home. Modular kitchen, wardrobes aur false ceiling sab chahiye? Carpet area kitna hai?", "9:10 PM"),
        m("lead", "Haan sab. Around 1,350 sq ft, Wakad", "9:12 PM"),
        m("ai", "Is scope ke liye usually ₹12-18 lakh range hota hai. Free site visit aur 3D design discussion: Sunday 11 AM ya 4 PM?", "9:12 PM"),
        m("lead", "Sunday 11", "9:13 PM"),
        m("ai", "Booked! Sunday 11 AM site visit, Wakad. Floor plan ho toh yahin bhej dijiye.", "9:13 PM"),
      ],
      booked: "Site visit · Sun 11:00 AM",
      notify: "3BHK full interior, 1,350 sq ft, Wakad",
      qualifies: "Scope, size and possession date",
      books: "the site visit",
    },
  },
  salons: {
    us: {
      contact: "Aisha T.", channel: "Text message", source: "Instagram",
      messages: [
        m("lead", "Hi! Do you have anything Saturday for balayage? First time here", "11:08 PM"),
        m("ai", "Hi Aisha, welcome! Balayage takes about 3 hours. Is your hair past your shoulders, and has it been colored in the last 6 months?", "11:08 PM"),
        m("lead", "Just past shoulders, colored in the spring", "11:10 PM"),
        m("ai", "Perfect. Maya, our color specialist, has Saturday 10 AM or 1 PM. New clients get a free toning gloss.", "11:10 PM"),
        m("lead", "10 AM!", "11:11 PM"),
        m("ai", "You're booked with Maya, Saturday 10 AM. Feel free to text inspiration photos anytime.", "11:11 PM"),
      ],
      booked: "Balayage · Sat 10:00 AM",
      notify: "New client, balayage, shoulder-length",
      qualifies: "Hair length and color history",
      books: "the appointment",
    },
    in: {
      contact: "Simran K.", channel: "WhatsApp", source: "Instagram",
      messages: [
        m("lead", "Bridal makeup ka package hai? Wedding 14 Feb ko hai", "10:40 PM"),
        m("ai", "Hi Simran! Congratulations! Haan, bridal packages ₹25,000 se start. HD ya airbrush pasand karengi? Aur pre-bridal bhi chahiye?", "10:40 PM"),
        m("lead", "Airbrush. Pre-bridal bhi", "10:42 PM"),
        m("ai", "Perfect. Trial session ke liye aaiye, dates bhi lock ho jayengi. Is Friday 3 PM ya Sunday 12 PM?", "10:42 PM"),
        m("lead", "Sunday 12", "10:43 PM"),
        m("ai", "Booked! Sunday 12 PM trial, Rajouri Garden. 14 Feb aapke liye hold kar diya hai.", "10:43 PM"),
      ],
      booked: "Bridal trial · Sun 12:00 PM",
      notify: "Bridal airbrush + pre-bridal, wedding 14 Feb",
      qualifies: "Style, date and add-ons",
      books: "the trial",
    },
  },
};
