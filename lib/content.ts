/**
 * Content layer ("CMS-lite").
 * Every page pulls its copy from this file, so routine content updates are
 * one-file edits — no component changes needed. When a hosted CMS is chosen
 * (e.g. Sanity/Payload), these objects map 1:1 to collections.
 */

/* ---------------------------------- Team ---------------------------------- */
// Factual — do not embellish. Source: Proofit "About Us".
export const founders = [
  {
    name: "Hardik Sampat",
    role: "Co-Founder · Head of Business Development",
    bio: [
      "Hardik spent his formative professional years in Canada, working with Home Depot where he built deep expertise in building materials and construction systems.",
      "He went on to work as a General Contractor in Canada, managing residential projects end-to-end — structure, plumbing, electrical, waterproofing, and finishing — before training with Primary Home Inspection in structured, standards-based inspection methodology.",
      "At Proofit, Hardik leads business development and focuses on adapting North American inspection standards to Indian real estate.",
    ],
    highlights: [
      "Home Depot, Canada — building materials & construction systems",
      "General Contractor, Canada — residential projects across all trades",
      "Trained with Primary Home Inspection, Canada",
    ],
  },
  {
    name: "Dhyan Parekh",
    role: "Co-Founder · Operations & Quality Lead",
    bio: [
      "Dhyan brings international experience and process-driven thinking from his professional work in Canada, where he developed expertise in quality control, documentation, and systematic evaluation.",
      "At Proofit, he oversees inspection workflows, report structuring, and quality assurance — making sure every report that leaves our desk is evidence-backed, consistent, and clear.",
    ],
    highlights: [
      "Professional experience in Canada",
      "Quality control, documentation & systematic evaluation",
      "Owns inspection workflows, reporting & QA at Proofit",
    ],
  },
];

export const vision =
  "To establish home inspection as an essential, trusted part of every real estate deal in India — beginning with setting new benchmarks in Mumbai.";

export const mission =
  "To deliver comprehensive, clear inspection insights that help homeowners and buyers make confident, well-informed property decisions — bringing international home inspection standards to India, adapted to local construction practices.";

/* -------------------------------- Services -------------------------------- */
export type Service = {
  slug: string;
  name: string;
  short: string;
  hero: string;
  intro: string[];
  includes: { title: string; desc: string }[];
  idealFor: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "water-inspection",
    name: "Water Inspection",
    short: "Thermal-imaging led detection of leakage, seepage and dampness — without breaking a single tile.",
    hero: "Find the leak. Not after breaking three walls — before touching one.",
    intro: [
      "Water is the most expensive problem a home can hide. By the time a stain appears on your ceiling, moisture has usually been travelling inside the structure for months.",
      "Proofit's water inspection uses AI-enabled thermal imaging and calibrated moisture meters to trace leakage and dampness to its true source — bathrooms, terraces, external walls, concealed plumbing — non-destructively, with photographic and thermal evidence for every finding.",
    ],
    includes: [
      { title: "Thermal imaging survey", desc: "Full thermal scan of affected and adjoining areas to map moisture spread invisible to the naked eye." },
      { title: "Moisture mapping", desc: "Pin and pinless moisture meter readings to quantify dampness and separate active leaks from old stains." },
      { title: "Source tracing", desc: "Root-cause analysis: concealed plumbing, waterproofing failure, external ingress, or condensation." },
      { title: "Evidence-backed report", desc: "Thermal + photo documented report with severity grading and rectification guidance you can hand to any contractor or society." },
    ],
    idealFor: [
      "Recurring damp patches, peeling paint or musty odour",
      "Ceiling leakage from an upstairs flat or terrace",
      "Pre-monsoon checks of terraces and external walls",
      "Disputes with neighbours, societies or builders needing neutral evidence",
    ],
    image: "/images/thermal-camera-screen.webp",
  },
  {
    slug: "home-inspection",
    name: "Home Inspection",
    short: "Engineering-driven snag inspection for new possession, resale purchase, rentals and renovation.",
    hero: "Know your home's actual condition — before handover, purchase or renovation.",
    intro: [
      "A flat that looks finished isn't necessarily built right. Our inspectors evaluate every room, surface and system against a structured, international-standard checklist adapted to Indian construction and apartment layouts.",
      "Each inspection combines expert on-site evaluation with thermal imaging, and concludes with a detailed, photo-backed snag report — so builders rectify before you sign, and you negotiate with facts.",
    ],
    includes: [
      { title: "New flat / possession inspection", desc: "Complete snagging before you take handover — civil finishes, doors & windows, electrical, plumbing, waterproofing, fittings." },
      { title: "Resale property inspection", desc: "Condition assessment of an older property before you commit — including hidden dampness and ageing systems." },
      { title: "Rental move-in / move-out", desc: "Documented condition reports that protect deposits for both tenants and owners." },
      { title: "Pre / post renovation & builder audit", desc: "Verify contractor workmanship and builder quality with an independent, evidence-backed audit." },
    ],
    idealFor: [
      "Buyers taking possession of a new flat",
      "Purchasers of resale property",
      "Tenants and landlords at move-in / move-out",
      "Owners auditing renovation or builder workmanship",
    ],
    image: "/images/inspector-snagging.webp",
  },
  {
    slug: "proofit-care-plus",
    name: "Proofit Care+",
    short: "An annual home-care plan: scheduled inspections that catch problems while they're still small.",
    hero: "Your home, checked like clockwork — every year, before the monsoon does its worst.",
    intro: [
      "Most water damage is progressive: a hairline crack this year is a stained ceiling next year and a structural repair the year after. Proofit Care+ puts your home on a preventive schedule.",
      "Members get planned annual inspections timed around the monsoon, priority scheduling for emergencies, and a maintained condition history of their home — so small issues are caught and fixed while they're still cheap.",
    ],
    includes: [
      { title: "Annual pre-monsoon inspection", desc: "Terrace, external walls, bathrooms and plumbing checked before the rains arrive." },
      { title: "Thermal re-scan of known trouble spots", desc: "Year-on-year comparison of previously identified areas to confirm repairs are holding." },
      { title: "Priority emergency visits", desc: "Members jump the queue when a sudden leak or dampness appears." },
      { title: "Digital condition history", desc: "A running, dated record of your home's health — invaluable at resale time." },
    ],
    idealFor: [
      "Homeowners in monsoon-exposed buildings",
      "Owners of premium apartments and villas",
      "NRI owners who need eyes on their property",
      "Societies managing common-area waterproofing",
    ],
    image: "/images/careplus-rooftop.webp",
  },
];

/* --------------------------------- Process -------------------------------- */
export const processSteps = [
  {
    title: "Book & brief",
    desc: "Tell us about the property and your concern — possession date, leak history, purchase timeline. We schedule the visit and tell you exactly what to keep ready (usually: just access).",
  },
  {
    title: "On-site inspection",
    desc: "Our inspector works room by room through a structured, international-standard checklist — civil finishes, doors and windows, electrical points, plumbing fixtures, waterproofing zones.",
  },
  {
    title: "Thermal & instrument scan",
    desc: "AI-enabled thermal imaging and calibrated moisture meters find what eyes can't: moisture inside walls, missing insulation, overheating circuits, concealed leak paths.",
  },
  {
    title: "Evidence-backed report",
    desc: "Within 48 hours you receive a detailed snag report — every defect photographed, thermally documented where relevant, severity-graded, and mapped to its location.",
  },
  {
    title: "Walkthrough & next steps",
    desc: "We walk you through the findings, answer questions, and advise on rectification priorities — whether that's a builder snag list, purchase negotiation, or repair scope.",
  },
];

/* ----------------------------------- FAQ ---------------------------------- */
export const faqs = [
  {
    q: "What exactly is a home inspection?",
    a: "A home inspection is an independent, third-party evaluation of a property's condition — civil finishes, plumbing, electrical, waterproofing, doors, windows and fittings — performed with instruments and documented in a photo-backed report. It tells you the property's actual condition, not the brochure's version.",
  },
  {
    q: "Why do I need an inspection for a brand-new flat?",
    a: "New construction routinely carries snags: hollow tiles, seepage-prone bathrooms, unfinished waterproofing, faulty electrical points. Identifying them before possession means the builder rectifies them at their cost, not yours. Our reports are structured so builders can act on them directly.",
  },
  {
    q: "What is thermal imaging and why does it matter?",
    a: "Thermal cameras visualise temperature differences on surfaces. Damp walls, water travelling inside a slab, missing insulation and overheating wiring all show distinct thermal signatures — invisible to the naked eye. It lets us find problems non-destructively, without breaking tiles or walls.",
  },
  {
    q: "How long does an inspection take?",
    a: "A typical 2–3 BHK apartment takes 2 to 4 hours depending on size and condition. Water-leak investigations vary with complexity — tracing a source across floors can take longer.",
  },
  {
    q: "When do I get the report?",
    a: "Within 48 hours of the inspection. Every finding is photographed, thermally documented where relevant, severity-graded and mapped to its location in the home.",
  },
  {
    q: "Can I use the report with my builder or society?",
    a: "Yes — that's precisely what it's designed for. The report is an independent, evidence-backed document. Buyers use it for pre-possession rectification, owners use it in society and neighbour disputes, and purchasers use it in price negotiation.",
  },
  {
    q: "Do you break tiles or walls to find leaks?",
    a: "No. Our method is non-destructive: thermal imaging plus moisture meters trace the leak path from the surface. You only open up the one spot that actually needs repair — instead of exploratory demolition.",
  },
  {
    q: "Which areas do you serve?",
    a: "Mumbai, Navi Mumbai and Thane. For projects outside this area, contact us — we take up select assignments.",
  },
  {
    q: "What does an inspection cost?",
    a: "Pricing depends on property size and inspection type. Contact us on WhatsApp or through the enquiry form with your configuration (e.g. 2BHK, new possession) and we'll share a quote the same day.",
  },
  {
    q: "Are your inspectors qualified?",
    a: "Inspections are led by a team trained in North American inspection methodology — our co-founder trained with Primary Home Inspection in Canada and worked as a General Contractor there — adapted to Indian construction styles and apartment layouts.",
  },
];

/* ---------------------------------- Blog ---------------------------------- */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  image: string;
  tag: string;
  body: { h?: string; p: string }[];
};

export const posts: Post[] = [
  {
    slug: "monsoon-proofing-mumbai-apartment",
    title: "Monsoon-proofing your Mumbai apartment: the pre-rain checklist",
    excerpt: "Four months of rain will find every weakness in your home. Here's what to check in April, not August.",
    date: "2026-05-14",
    readMins: 6,
    image: "/images/blog-monsoon.webp",
    tag: "Waterproofing",
    body: [
      { p: "Mumbai's monsoon is a four-month stress test. Water finds hairline cracks in parapets, tired sealant around windows, and choked drainage outlets — and by the time you see a stain indoors, moisture has been moving through the structure for weeks." },
      { h: "Start at the top", p: "Terraces and overhead tanks are the most common ingress points. Look for ponding water marks, cracked screed, and gaps where the waterproofing membrane meets the parapet wall. A five-minute visual check after the first pre-monsoon shower tells you a lot." },
      { h: "Windows and external walls", p: "Run a hand along window frames after rain — dampness at the sill or lintel means sealant has failed. On external walls, hairline cracks wider than a credit card edge deserve attention before, not after, the rains." },
      { h: "Bathrooms: the quiet offenders", p: "Bathroom waterproofing failures don't wait for monsoon, but rain magnifies them. Musty odour, lifting tiles or a damp patch on the wall behind a shower area are all early signals." },
      { h: "When to call for a thermal scan", p: "If your building has a leak history, a pre-monsoon thermal inspection maps moisture already inside walls and slabs — before the rain tops it up. It's the difference between a targeted repair in May and a soaked ceiling in August." },
    ],
  },
  {
    slug: "what-thermal-imaging-reveals",
    title: "What thermal imaging reveals that your eyes can't",
    excerpt: "Damp walls, missing insulation, overheating circuits — all invisible until you look in infrared.",
    date: "2026-04-02",
    readMins: 5,
    image: "/images/thermal-camera-screen.webp",
    tag: "Technology",
    body: [
      { p: "A freshly painted wall can hide months of water damage. A thermal camera can't be fooled by paint: evaporating moisture cools the surface, and that cool signature glows unmistakably on an infrared image." },
      { h: "How it works", p: "Thermal cameras read surface temperature differences as small as a tenth of a degree. Moisture, air leakage, missing insulation and electrical hot spots each produce characteristic patterns a trained inspector can read like a map." },
      { h: "What we routinely find", p: "Leak paths travelling far from their visible symptom — a bathroom leak surfacing two rooms away; dampness rising inside walls before any stain appears; loose electrical connections heating up inside switchboards; gaps in insulation behind finished surfaces." },
      { h: "Why non-destructive matters", p: "The traditional approach to a leak is exploratory demolition: break tiles until you find water. Thermal imaging inverts that — trace the moisture path first, then open only the one spot that needs repair. Less cost, less dust, less guesswork." },
    ],
  },
  {
    slug: "new-flat-possession-snag-list",
    title: "Taking possession of a new flat? Snag it before you sign",
    excerpt: "The builder's fit-and-finish warranty works best before handover. Here's what a possession inspection catches.",
    date: "2026-03-10",
    readMins: 7,
    image: "/images/inspector-snagging.webp",
    tag: "Buying",
    body: [
      { p: "Possession day is exciting — and it's also your maximum point of leverage. Defects flagged before handover get fixed on the builder's schedule and budget. The same defects discovered after you move in become your problem." },
      { h: "What a snag inspection covers", p: "Room by room: tile hollowness and levels, wall and ceiling finish, door and window operation and sealing, every electrical point tested, plumbing fixtures and drainage flow, balcony slopes, and waterproofing-critical zones scanned thermally." },
      { h: "The numbers", p: "A typical new 2–3 BHK in Mumbai yields dozens of snags — most are minor finish issues, but nearly every inspection also surfaces a handful of significant items: bathroom seepage indicators, improperly sealed windows, or unsafe electrical work." },
      { h: "How the report helps", p: "Our reports are formatted the way builder site teams work — location-mapped, photographed, severity-graded — so rectification is a checklist, not an argument. Most builders in our experience act on a professional report far faster than on a verbal complaint list." },
    ],
  },
  {
    slug: "early-signs-hidden-water-damage",
    title: "5 early signs of hidden water damage in your home",
    excerpt: "Peeling paint, musty smells, warm spots on walls — your home telegraphs its leaks. Learn to read the signals.",
    date: "2026-02-18",
    readMins: 4,
    image: "/images/defect-damp-patch.webp",
    tag: "Maintenance",
    body: [
      { p: "Water damage is progressive: cheap to fix early, expensive to fix late. These five signals are your early-warning system." },
      { h: "1. Paint that bubbles or flakes", p: "Blistering paint means moisture is pushing through from inside the wall. It almost never dries out on its own — the source is still active." },
      { h: "2. A musty smell that won't leave", p: "Persistent mustiness in a room or cupboard usually means concealed dampness and early mould growth, often before anything is visible." },
      { h: "3. Stains that return after repainting", p: "If a patch reappears within months of painting over it, the leak path is live. Repainting treats the symptom; the moisture keeps moving." },
      { h: "4. Tiles that sound hollow or lift", p: "Moisture in the bedding layer debonds tiles. A hollow sound underfoot in a bathroom or near an external wall is worth investigating." },
      { h: "5. Swollen wood or sticking doors", p: "Timber swells with ambient moisture. A door that suddenly sticks in a dry month points to a local humidity source — often a concealed leak." },
    ],
  },
];

/* ------------------------------- Case studies ------------------------------ */
export type CaseStudy = {
  slug: string;
  title: string;
  location: string;
  service: string;
  image: string;
  problem: string;
  approach: string;
  outcome: string;
  stats: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "powai-possession-inspection",
    title: "47 snags caught before possession of a new 3BHK",
    location: "Powai, Mumbai",
    service: "Home Inspection",
    image: "/images/inspector-snagging.webp",
    problem: "A young couple was days from registering their new 3BHK. The flat looked flawless on the walkthrough — fresh paint, polished tiles, everything apparently ready.",
    approach: "A full possession inspection: room-by-room snagging against our structured checklist, every electrical point tested, plumbing flow-checked, and thermal scans of all waterproofing-critical zones.",
    outcome: "47 documented snags including seepage indicators in the master bathroom and six faulty electrical points. The builder rectified every item before registration — at zero cost to the buyers.",
    stats: [
      { label: "Snags documented", value: "47" },
      { label: "Significant defects", value: "9" },
      { label: "Cost to buyer", value: "₹0" },
    ],
  },
  {
    slug: "bandra-recurring-dampness",
    title: "A dampness mystery three contractors couldn't solve",
    location: "Bandra West, Mumbai",
    service: "Water Inspection",
    image: "/images/duotone-split-room.webp",
    problem: "A bedroom wall in a resale flat kept blooming with damp patches. Three contractors had repainted and re-plastered it over two years. The patch always returned.",
    approach: "Thermal imaging traced the moisture path upward — not sideways from the adjacent bathroom, as every contractor had assumed, but down from a hairline crack in the terrace parapet two floors above.",
    outcome: "One targeted waterproofing repair at the parapet, confirmed by a follow-up thermal scan. The wall has stayed dry through a full monsoon since.",
    stats: [
      { label: "Failed repairs before us", value: "3" },
      { label: "Walls broken to find it", value: "0" },
      { label: "Monsoons dry since", value: "1+" },
    ],
  },
  {
    slug: "andheri-bathroom-seepage",
    title: "Neighbour dispute resolved with evidence, not arguments",
    location: "Andheri East, Mumbai",
    service: "Water Inspection",
    image: "/images/bathroom-moisture-check.webp",
    problem: "Water stains on a ceiling triggered a dispute between neighbours — each blaming the other's bathroom. The society was stuck between two contradictory plumbers' opinions.",
    approach: "Moisture mapping and thermal scans of both flats, documented in a neutral, evidence-backed report that traced the leak to a failed shower-area waterproofing membrane in the flat above.",
    outcome: "The report gave the society an objective basis for the repair order. The repair was completed within three weeks, and the dispute ended with the evidence — not in court.",
    stats: [
      { label: "Flats inspected", value: "2" },
      { label: "Weeks to resolution", value: "3" },
      { label: "Legal escalation", value: "None" },
    ],
  },
];

/* --------------------------------- Careers -------------------------------- */
export const openings = [
  {
    title: "Home Inspector",
    type: "Full-time · Mumbai",
    desc: "Civil engineers or experienced site professionals who can read a building like a book. You'll run possession and resale inspections end-to-end, working with thermal imaging and structured checklists. 2+ years site experience preferred.",
  },
  {
    title: "Trainee Inspector",
    type: "Full-time · Mumbai",
    desc: "Start of career? We train you in international-standard inspection methodology — thermal imaging, moisture diagnostics, structured reporting — alongside our senior inspectors. Civil/architecture background is a plus, curiosity is mandatory.",
  },
  {
    title: "Operations Coordinator",
    type: "Full-time · Mumbai",
    desc: "Own the schedule: bookings, inspector routing, report dispatch and client follow-up. You keep the machine running so inspectors can focus on inspecting. Strong communication in English and Hindi/Marathi.",
  },
];

/* ------------------------------- Testimonials ------------------------------ */
export const testimonials = [
  {
    quote: "The builder's site team fixed in two weeks what we'd been chasing for months — because Proofit's report made every defect impossible to argue with.",
    name: "Homebuyer, Powai",
    context: "New flat possession inspection",
  },
  {
    quote: "Three contractors broke walls guessing. Proofit found the actual source two floors up without touching a tile.",
    name: "Flat owner, Bandra West",
    context: "Water leakage investigation",
  },
  {
    quote: "As an NRI I needed someone I could trust to be my eyes. The report was so detailed I felt like I'd walked the flat myself.",
    name: "NRI owner, Thane",
    context: "Resale purchase inspection",
  },
];

export const stats = [
  { value: 300, suffix: "+", label: "Inspections completed" },
  { value: 12000, suffix: "+", label: "Defects documented" },
  { value: 48, suffix: "hr", label: "Report turnaround" },
  { value: 100, suffix: "%", label: "Non-destructive methods" },
];
