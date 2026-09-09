import type { ServiceSlide } from '@/components/ServicesCarousel';
export const leadershipSeed = [
  {
    name: "Hardik Sampat",
    image: "/images/team/hardik-back.webp",
    role: "Co-Founder · Head of Business Development",
    bio: "Hardik spent his formative professional years in Canada, where he developed deep expertise in residential construction, building materials, and property systems. After working with Home Depot, he managed end-to-end residential projects as a General Contractor before training with Primary Home Inspection in structured, standards-based inspection methodologies. At Proofit, Hardik leads business development while driving the adoption of globally inspired inspection practices, helping establish new benchmarks for transparency, quality, and preventive property care in India.",
  },
  {
    name: "Nupur Mahipal",
    image: "/images/team/nupur-back.webp",
    role: "Partner · Chief Marketing Officer (CMO)",
    bio: "Nupur brings over seven years of experience in the property inspection industry, with expertise spanning operations, client relationships, marketing, and business development. Her hands-on understanding of the industry has helped shape Proofit’s customer-first approach while strengthening its brand presence and strategic partnerships. She leads marketing and growth initiatives with a focus on building trust, creating meaningful customer experiences, and expanding Proofit’s reach across India’s evolving real estate landscape.",
  },
  {
    name: "Dhyan Parekh",
    image: "/images/team/dhyan-back.webp",
    role: "Co-Founder · Operations & Quality Lead",
    bio: "Having lived and worked in Canada, Dhyan recognised that professional home inspections were a standard part of property ownership - something largely missing in Mumbai despite its demanding climate and ageing infrastructure. Inspired to bridge that gap, he co-founded Proofit to bring globally inspired inspection standards to India. He leads inspection workflows, report structuring, and quality assurance, ensuring every report is evidence-backed, consistent, and easy for clients to understand.",
  },
];
export const careServicesSeed = [
  {
    title: "Water Leakage & Waterproofing Solutions",
    body: "Water damage can impact structural elements, interiors, and electrical systems if left untreated. Proofit Care+ provides inspection-led waterproofing and leakage rectification for residential, commercial, institutional, and industrial properties. Our solutions include terrace, basement, bathroom, and external wall waterproofing, crack repairs, seepage treatment, and structural repairs, supported by advanced inspection techniques where required.",
  },
  {
    title: "Civil Repair & Restoration",
    body: "Maintain the safety, functionality, and appearance of your property with expert civil repair solutions. Proofit Care+ undertakes masonry, plastering, painting, tile replacement, crack repairs, structural restoration, renovation, and surface repairs. Every project begins with a technical assessment followed by planned execution and quality workmanship.",
  },
  {
    title: "STP, ETP & Water Management",
    body: "Efficient water systems are critical for every property. Proofit Care+ provides installation, operation, maintenance, and servicing of Sewage Treatment Plants (STP), Effluent Treatment Plants (ETP), pumps, plumbing systems, and water infrastructure. Our solutions improve operational efficiency, reduce downtime, and ensure reliable water management.",
  },
  {
    title: "Professional Water Tank Cleaning",
    body: "Clean water begins with clean storage. We provide professional cleaning for overhead, underground, commercial, hospital, industrial, and society water tanks. Our systematic cleaning process removes sediment and contaminants while improving hygiene, water quality, and overall system performance.",
  },
  {
    title: "Facility Management Services",
    body: "Simplify property operations with integrated facility management solutions. Proofit Care+ offers preventive maintenance, technical vendor coordination, building upkeep, maintenance planning, Annual Maintenance Contracts (AMC), and day-to-day operational support - providing clients with a single trusted partner for ongoing property care.",
  },
  {
    title: "Deep Cleaning Services",
    body: "Maintain healthier, cleaner spaces with professional deep cleaning services. We provide customized cleaning solutions for homes, offices, hospitals, educational institutions, commercial buildings, industrial facilities, and housing societies. Services are tailored to your property's size, usage, and operational requirements.",
  },
  {
    title: "HVAC & Air Conditioning Services",
    body: "Ensure year-round comfort with reliable HVAC and air conditioning services. Proofit Care+ offers AC installation, repairs, preventive maintenance, duct cleaning, and Annual Maintenance Contracts for residential, commercial, healthcare, educational, and industrial properties to improve efficiency and equipment life.",
  },
  {
    title: "Pest Control Services",
    body: "Protect your property with safe and effective pest management solutions. Our services include termite treatment, rodent control, mosquito management, cockroach treatment, and general pest control for residential, commercial, institutional, and industrial properties. Programs are customized to suit the property's needs and infestation levels.",
  },
  {
    title: "Security & IT Solutions",
    body: "Strengthen your property's security and technology infrastructure. Proofit Care+ provides CCTV systems, access control, intercom solutions, networking, computer maintenance, and IT support for housing societies, commercial buildings, and institutions - ensuring reliable operations and ongoing technical assistance.",
  },
  {
    title: "Landscape & Horticulture Maintenance",
    body: "Enhance outdoor spaces with professional landscaping and horticulture services. Our offerings include lawn care, tree pruning, irrigation maintenance, seasonal plantation, garden upkeep, landscape development, and ongoing maintenance for housing societies, business parks, hospitals, and commercial properties.",
  },
  {
    title: "Façade & High-Rise Glass Cleaning",
    body: "Maintain a clean, professional exterior with specialized façade and high-rise cleaning services. We provide rope-access glass cleaning, ACP panel cleaning, façade washing, and periodic maintenance for residential towers, commercial buildings, hotels, hospitals, and business parks, following strict safety standards.",
  },
  {
    title: "Rainwater Harvesting Solutions",
    body: "Make every drop count with sustainable rainwater harvesting solutions. Proofit Care+ designs, installs, upgrades, and maintains rainwater harvesting systems for residential societies, commercial buildings, institutions, hospitals, and industrial facilities. Our solutions help reduce water dependency, improve groundwater recharge, support regulatory compliance, and promote long-term environmental sustainability.",
  },
];
export const homeServicesSeed: ServiceSlide[] = [
  {
    anchor: "service-pre-possession",
    title: "Pre Possession Inspection",
    desc: "A detailed inspection before you take possession of your new flat to identify construction defects, incomplete work, finishing issues, and quality concerns so they can be rectified by the builder.",
    benefits: [
      "Ensure promised specifications are delivered",
      "Affordable Pricing",
      "Rectification by the builder, at zero cost to you",
      "Understand the true condition of the property",
    ],
    media: { type: "image", src: "/images/svc-possession-tablet.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector checking a damp wall while homeowners observe",
  },
  {
    anchor: "service-resale",
    title: "Resale Property Inspection",
    desc: "An independent condition assessment of an older property before you commit - surfacing hidden dampness, ageing plumbing and electrical systems, and structural wear that a walkthrough can't reveal.",
    benefits: [
      "Negotiate with facts, not impressions",
      "Uncover hidden dampness and seepage",
      "Assess ageing electrical & plumbing",
      "Avoid post-purchase repair shocks",
    ],
    media: { type: "image", src: "/images/svc-resale.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector examining the condition of a resale apartment",
  },
  {
    anchor: "service-rental",
    title: "Rental Move-In / Move-Out Inspection",
    desc: "Documented condition reports at the start and end of a tenancy that protect deposits and prevent disputes - for tenants and owners alike.",
    benefits: [
      "Deposit-protecting photo evidence",
      "Neutral third-party documentation",
      "Faster, dispute-free handovers",
      "Peace of mind for both parties",
    ],
    media: { type: "image", src: "/images/svc-rental.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector documenting a rental property handover",
  },
  {
    anchor: "service-thermal",
    title: "Water Leakage & Dampness Inspection",
    desc: "AI-enabled thermal imaging and calibrated moisture meters trace leakage and dampness to its true source - non-destructively, without breaking a single tile.",
    benefits: [
      "Find the source, not just the stain",
      "100% non-destructive methods",
      "Thermal + moisture-mapped evidence",
      "Clear rectification guidance",
    ],
    media: { type: "image", src: "/images/svc-water.webp" },
    href: "/services/water-inspection",
    mediaAlt: "Proofit inspector checking moisture beside a kitchen sink",
  },
  {
    anchor: "service-renovation",
    title: "Pre-Renovation / Post-Renovation Inspection",
    desc: "Verify contractor workmanship before final payments - finishes, civil work, electrical and plumbing checked against what was promised.",
    benefits: [
      "Hold contractors to specification",
      "Catch defects before final payment",
      "Civil work integrity checks",
      "Documented quality benchmarks",
    ],
    media: { type: "image", src: "/images/svc-renovation.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector checking finishes after renovation work",
  },
  {
    anchor: "service-builder-audit",
    title: "Builder Quality Audit",
    desc: "Independent, evidence-backed quality audits for developers and societies - standardized pre-handover checks that reduce escalations and strengthen buyer confidence.",
    benefits: [
      "Standardized pre-handover audits",
      "Reduced warranty claims & escalations",
      "Data-backed quality benchmarking",
      "Stronger handovers, lower liability",
    ],
    media: { type: "image", src: "/images/svc-audit.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector auditing construction quality on site",
  },
];
