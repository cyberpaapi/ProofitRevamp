export type NavigationItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
  overviewLabel?: string;
};

export const serviceNavigation = [
  { href: "/services/water-inspection", label: "Water Inspection" },
  { href: "/services/home-inspection", label: "Home Inspection" },
];

/** One source for header/footer ordering, wording and published subpages. */
export function buildNavigation(studies: { slug: string; title: string }[]): NavigationItem[] {
  return [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/process", label: "Our Process" },
    { href: "/services", label: "Services", overviewLabel: "All Services", children: serviceNavigation },
    { href: "/care-plus", label: "Proofit Care+" },
    { href: "/case-studies", label: "Case Studies", overviewLabel: "View all case studies", children: studies.map(study => ({ href: `/case-studies/${study.slug}`, label: study.title })) },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact Us" },
  ];
}
