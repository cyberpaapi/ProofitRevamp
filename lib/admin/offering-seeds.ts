import { services } from "@/lib/content";
import { homeServicesSeed, careServicesSeed, leadershipSeed } from "./content-seeds";
import type { AdminOffering, AdminTeamMember } from "./types";

export const slugify = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const seedTeam: AdminTeamMember[] = leadershipSeed.map((item, order) => ({...item,id:`team-${slugify(item.name)}`,visible:true,order}));
export const seedOfferings: AdminOffering[] = [
  ...homeServicesSeed.map((item, order): AdminOffering => ({id:item.anchor,slug:item.anchor,title:item.title,description:item.desc,image:item.media.src,benefits:item.benefits,homepage:true,visible:true,order,category:item.href.includes("water") ? "water-inspection" : "home-inspection"})),
  ...services.find(item => item.slug === "water-inspection")!.includes.map((item, order): AdminOffering => ({id:`water-${slugify(item.title)}`,slug:slugify(item.title),title:item.title,description:item.desc,image:"/images/thermal-camera-screen.webp",benefits:[],homepage:false,visible:true,order:order+6,category:"water-inspection"})),
  ...careServicesSeed.map((item, order): AdminOffering => ({id:`care-${slugify(item.title)}`,slug:slugify(item.title),title:item.title,description:item.body,image:"/images/careplus-rooftop.webp",benefits:[],homepage:false,visible:true,order:order+10,category:"care-plus"})),
];
export function offeringHref(item: Pick<AdminOffering,"category"|"slug">) { return `${item.category === "care-plus" ? "/care-plus" : `/services/${item.category}`}#${item.slug}`; }
