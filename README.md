# Ikorodu Realtors — Property Marketplace + Seller Dashboard

Professional real estate management dashboard for **Ikorodu Realtors**, Lagos, Nigeria.

## Routes

**Marketplace (public)**
- `/` — Browse 100 properties with type pills, area, budget, status and sort filters
- `/sell` — "List your property" form; sends the seller's details to your WhatsApp or email
- `/map` — Map of all available listings, filterable by type and area
- `/listings/[id]` — Listing detail with enquiry buttons

**Seller dashboard (admin)**
- `/dashboard`, `/properties`, `/leads` and the other CRM pages

## Hero video

The banner plays the tour split into 3 clips side by side (`public/videos/clip-1..3.mp4` with matching `.jpg` posters), so it stays sharp on wide screens. The same clips are the video tours on listing pages for houses and apartments. Replace them with real footage per listing when ready.

## Listing pages

`/listings/[id]` has a photo gallery, a video tour tab (houses and apartments only), property facts, features, enquiry buttons and similar listings. Facts such as year built, parking, furnishing and features are sample values generated in `src/data/listing-details.ts`; replace them with real data.

## Enquiries

Realtor names are not shown publicly. Every listing has WhatsApp and Email buttons that go to the owner: WhatsApp +234 913 925 5152, ikorodurealtors@gmail.com. Change them in `src/lib/contact.ts`.

## Data

`src/data/properties.ts` (100 listings) and `src/data/realtors.ts` (20 realtors) are sample data. Listings 9–100 are generated: names, prices, addresses and coordinates are placeholders, and photos are reused from the first eight listings. Replace with a database when ready.

## Features

- **Dashboard** — Overview metrics, recent listings, quick actions
- **Properties** — List + interactive map (Leaflet / OpenStreetMap) centered on Ikorodu
- Property cards with Naira pricing, beds/baths/size, status badges
- Search, filter by status, sort by price
- Map markers with price labels; click to preview / fly-to
- Sidebar navigation matching the reference design
- Clean white / light-grey UI with blue accents

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Leaflet + react-leaflet
- Lucide icons

## Getting Started

```bash
cd ikorodu-realtors
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Navigate to **Properties** to see the list + map view.

## Sample Data

Eight realistic Ikorodu listings (Agric, Igbogbo, Elepe, Oke-Eletu, etc.) with coordinates for the map.

## Next Steps

- Connect a real database (Prisma + PostgreSQL)
- Add Property form with image/video upload
- Lead / enquiry management
- Auth & role-based access
