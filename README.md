# Ikorodu Realtors — Property Marketplace + Seller Dashboard

Professional real estate management dashboard for **Ikorodu Realtors**, Lagos, Nigeria.

## Run on your computer

1. Install Node.js 20 or newer.
2. In the project folder run `npm install`, then `npm run dev`.
3. Open http://localhost:3000

## Put it online with GitHub Pages

1. Upload the whole project to a GitHub repo (including the `.github` folder).
2. In the repo go to Settings > Pages and set Source to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

## Routes

**Marketplace (public)**
- `/` — Browse 100 properties with type pills, area, budget, status and sort filters
- `/sell` — "List your property" form; sends the seller's details to your WhatsApp or email
- `/map` — Map of all available listings, filterable by type and area
- `/property/?id=...` — Listing detail (photos, video tour, details, floating WhatsApp prefilled with the reference)
- `/admin` — Admin: add and edit properties (needs the database, see ADMIN-SETUP.md)

**Seller dashboard (admin)**
- `/dashboard`, `/properties`, `/leads` and the other CRM pages

## Hero video

The banner plays the tour split into 4 clips side by side (`public/videos/clip-1..4.mp4` with matching `.jpg` posters), so it stays sharp on wide screens. The same clips are the video tours on listing pages for houses and apartments. Replace them with real footage per listing when ready.

## Prices

Every listing has an asking price (`price`) and a net price (`netPrice`, the lowest price the owner will accept). Net prices in the sample data are generated 3-10% below asking; replace with real figures.

## Listing pages

`/property/?id=...` has a photo gallery, a video tour tab (houses and apartments only), property facts, features, enquiry buttons and similar listings. The built-in sample listings (shown until the database is connected) are mapped in `src/lib/listings.ts`.

## Logo

The logo files are in `public/brand/` (`logo.webp` full logo, `mark.webp` header icon) and `src/app/icon.png` (browser tab icon). The full logo is also the loading screen (`src/components/market/Splash.tsx`): it shows on every full page load for at least 1.6 seconds, then fades out. Replace the files to change the logo.

## Admin

`/admin` is the page where you add and edit properties, photos, videos and map pins without code. Setup steps are in `ADMIN-SETUP.md`. The database tables are in `supabase/schema.sql`. Until the database is connected the site shows built-in sample listings.

## Pages

Homepage sections: hero, About Us, property listings, Realtor Partnerships, How it works, Contact. Other pages: `/about`, `/listings` (Properties), `/partners`, `/technology`, `/vision`, `/contact`, `/privacy`, `/terms`, `/disclaimer`. All wording lives in `src/data/content.ts`. The Privacy Policy, Terms of Use and Disclaimer are drafts: have a Nigerian lawyer review them before going live.

## Enquiries

Realtor names and contacts are not shown publicly, and listings have no contact buttons. One floating WhatsApp button (+234 913 925 5152) stays at the bottom right and hops on scroll; on a listing page its message is pre-filled with that property's reference. The site-level contact points are the header WhatsApp button, the Contact section and page, and the footer (ikorodurealtors@gmail.com). Change numbers in `src/lib/contact.ts`.

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
