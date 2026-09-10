import type { AdminOffering } from "./types";

export const offeringOrderVersion = 3;

/** Apply the requested slot swap once, while preserving subsequent admin ordering. */
export function migrateOfferingOrder(offerings: AdminOffering[], version: number): AdminOffering[] {
  if (version >= offeringOrderVersion) return offerings;
  const thermal = offerings.find(item => item.id === "service-thermal");
  const renovation = offerings.find(item => item.id === "service-renovation");
  if (!thermal || !renovation) return offerings;
  return offerings.map(item => item.id === thermal.id
    ? { ...item, order: renovation.order }
    : item.id === renovation.id ? { ...item, order: thermal.order } : item);
}
