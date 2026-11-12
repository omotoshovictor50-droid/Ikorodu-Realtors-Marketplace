import { properties } from "@/data/properties";
import { realtors } from "@/data/realtors";

export const categories = Array.from(
  new Set(properties.map((p) => p.category))
).sort();
export const areas = Array.from(new Set(properties.map((p) => p.area))).sort();

export const getRealtor = (id: string) => realtors.find((r) => r.id === id);
export const getProperty = (id: string) => properties.find((p) => p.id === id);
export const listingsFor = (realtorId: string) =>
  properties.filter((p) => p.realtorId === realtorId);
export const areasFor = (realtorId: string) =>
  Array.from(new Set(listingsFor(realtorId).map((p) => p.area)));
