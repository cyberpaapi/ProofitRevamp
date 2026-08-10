export const site = {
  name: "Proofit",
  legalName: "Proofit Company",
  tagline: "Home inspection, proven.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.proofitcompany.com",
  phone: "+91 98337 79955",
  phoneHref: "tel:+919833779955",
  phones: [
    { label: "+91 98337 79955", href: "tel:+919833779955" },
    { label: "+91 98202 68840", href: "tel:+919820268840" },
    { label: "+91 95940 13666", href: "tel:+919594013666" },
  ],
  email: "info@proofitcompany.com",
  whatsapp: "https://api.whatsapp.com/send?phone=919833779955&text=Inspection%20Enquiry",
  whatsappSampleReport:
    "https://api.whatsapp.com/send?phone=919833779955&text=Hi%20Proofit%2C%20I%27d%20like%20to%20see%20a%20sample%20inspection%20report.",
  city: "Mumbai",
  serviceArea: "Mumbai-wide, with services available in Mumbai's neighbouring cities on request",
  serviceAreaClaim: "Serving Mumbai-wide. We also offer services to Mumbai's neighbouring cities on request.",
};
