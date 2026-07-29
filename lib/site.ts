export const site = {
  name: "Proofit",
  legalName: "Proofit Company",
  tagline: "Home inspection, proven.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.proofitcompany.com",
  phone: "+91-9594013666",
  phoneHref: "tel:+919594013666",
  phones: [
    { label: "+91 98337 79955", href: "tel:+919833779955" },
    { label: "+91 98202 68840", href: "tel:+919820268840" },
    { label: "+91 95940 13666", href: "tel:+919594013666" },
  ],
  email: "info@proofitcompany.com",
  whatsapp: "https://api.whatsapp.com/send?phone=919594013666&text=Inspection%20Enquiry",
  city: "Mumbai",
  serviceArea: "Mumbai, Navi Mumbai & Thane",
};
