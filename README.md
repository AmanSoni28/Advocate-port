# Advo — Advocate Shashank Shekhar Tripathi Website + CMS

Next.js 16 (App Router) bilingual (English/Hindi) website with a MongoDB-backed
CMS covering every page. A single admin logs in at `/admin/login` and edits
all text (both languages) and images from `/admin`. Changes appear on the
live site immediately — no rebuild or restart needed.

This file exists so future changes don't require re-reading the whole
codebase. Read this first, then jump straight to the relevant file.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin panel is at
`/admin/login`.

**Important:** `next.config.mjs` does **not** use `output: "export"` (it was
removed — static export cannot support a DB-backed login/CMS). This must stay
removed. Deploy to a host that runs a real Node server (Vercel, Render, a VPS
with `next start`), not static/shared hosting.

## Environment variables (`.env.local`)

| Var | Purpose |
|---|---|
| `DB_URL` | MongoDB connection string. Currently a **non-SRV** (direct host list) connection string — this machine's network couldn't resolve `mongodb+srv://` DNS records, so it was converted to the equivalent direct form. Same cluster/credentials either way. If moving to a host with normal DNS, the original `mongodb+srv://` form from Atlas would also work. |
| `SESSION_SECRET` | Random 32+ byte string, used to sign the admin session JWT (`jose`). Rotating this invalidates all existing admin sessions. |
| `ADMIN_EMAIL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Only read by `scripts/create-admin.mjs`, and only needed transiently while running it. Not read by the app itself. Safe to remove from `.env.local` after creating the admin account. |

## Data models (`src/models/`)

Mongoose, connected via `src/lib/mongodb.js` (`dbConnect()` — cached global
connection, safe across dev hot-reload).

- **`HomeContent.js`** — one singleton document (found via `findOne({})`,
  upserted), holding content for the **entire site**, not just `/`. Home page
  sections: `navbar`, `disclaimer`, `bookingModal`, `hero`, `stats`, `about`,
  `practice`, `whyChoose`, `featuredCases`, `testimonials`, `latestUpdates`,
  `consultationBanner`, `contactSection`. Other-pages sections: `pageHero`
  (one entry per inner page's banner: `about`, `practiceAreas`,
  `courtExperience`, `caseStudies`, `media`, `articles`, `testimonials`),
  `recognitions` (About page), `caseStudiesPage` (just an `outcome` label —
  the actual case data is `featuredCases.items`, reused), `courtExperiencePage`
  (`courts[]` + `process[]`). Every bilingual text field is stored as **two
  flat sibling fields**, `fieldName_en` / `fieldName_hi` (never a nested
  `{en, hi}` object) — this is the convention everywhere in this system
  (schema, seed script, admin forms, `pick()` helper). List sections
  (`practice.items`, `whyChoose.items`, `featuredCases.items`,
  `testimonials.items`, `latestUpdates.articles`, `.media`, `.achievements`,
  `about.timeline`, `consultationBanner.features`, `courtExperiencePage.courts`,
  `.process`) are arrays of Mongoose subdocuments (auto `_id` per item).
  Images are referenced by ObjectId fields (e.g. `hero.bgImageId`) pointing
  into `ImageAsset`, never embedded.
  - **Content reuse across pages:** several inner-page grids render the exact
    same list a Home component already shows, just in a different layout —
    `ArticlesGrid`/`MediaGrid` (Articles/Media pages) read
    `latestUpdates.articles`/`.media` (same as Home's LatestUpdates panels);
    `TestimonialsGrid` (Testimonials page) reads `testimonials.items` (same
    as Home's carousel); `Recognitions` (About page) reads
    `latestUpdates.achievements`; `CaseStudiesContent` (Case Studies page)
    reads `featuredCases.items` (same as Home's Featured Cases, plus a
    `tag_en`/`tag_hi` field on each item that's only shown on this page).
    Editing any of these updates both places at once — that's intentional,
    not a bug.
- **`SiteSettings.js`** — a second singleton: `phone`, `email`, `address`,
  `mapsEmbedUrl`, `rights_en`, `rights_hi`. Single source of truth for
  contact info — several public components used to hardcode these
  independently; they were all normalized to read from here.
- **`AdminUser.js`** — `email`, `username`, `passwordHash` (bcrypt). Expected
  to hold exactly one document. No public signup route exists anywhere —
  only `scripts/create-admin.mjs` can create one, and it refuses to run if
  one already exists.
- **`ImageAsset.js`** — `data` (Buffer), `mimeType`, `filename`, `sizeBytes`.
  No GridFS (images run 1.6–2.7MB, well under Mongo's 16MB doc cap). On
  replace, a **new** document is inserted and the reference field is
  repointed — old image URLs never change bytes, so `GET /api/images/[id]`
  can send `Cache-Control: immutable` safely, and there's no cache-busting
  logic anywhere.

## Auth (`src/lib/auth/`, `src/proxy.js`)

- `password.js` — bcrypt hash/verify.
- `session.js` — signs/verifies a JWT (`jose`, HS256) containing
  `{ adminId, email }`, stored in an httpOnly cookie named `session`
  (`SESSION_COOKIE_NAME`), 7-day expiry.
- `dal.js` — `verifySession()`, wrapped in React `cache()`. Reads the cookie,
  decrypts it, returns `{ isAuth, adminId, email }`. This is the **real**
  auth check, called at the top of every admin page/layout/API route.
- `src/proxy.js` — Next 16 renamed `middleware.js` → `proxy.js` (exported
  function is `proxy`, not `middleware`). Runs only as an **optimistic**
  redirect for `/admin/:path*`: no session → redirect to `/admin/login`;
  already logged in and hitting `/admin/login` → redirect to `/admin`. It
  does **not** replace the real check — every admin API route also calls
  `verifySession()` itself (defense in depth, matches the official Next.js
  auth guide's recommended pattern).
- Cookie is `secure: process.env.NODE_ENV === "production"` — required so
  login still works over plain `http://localhost` in dev.
- **Known limitation:** sessions are stateless (no DB-backed revocation
  list). Logging out clears the browser's cookie, but a copied/leaked token
  or one issued before deleting/replacing the admin account stays valid
  until its own 7-day expiry, or until `SESSION_SECRET` is rotated (which
  invalidates *every* session at once). Fine for a single-admin low-stakes
  site; would need real session storage if that ever matters.

## Public site data flow

1. `src/app/layout.js` (RootLayout, **async Server Component**,
   `export const dynamic = "force-dynamic"`) calls `getHomeContent()` +
   `getSiteSettings()` from `src/lib/content.js` on **every request** — this
   is what makes admin edits appear live with zero caching logic to manage.
2. Result is passed into `<Providers home={home} settings={settings}>`
   (`src/context/Providers.jsx`), which wraps everything in
   `HomeContentProvider` (`src/components/HomeContentProvider.jsx`) —
   exposes `useHomeContent()` and `useSiteSettings()` hooks.
3. Every Home component (and `Navbar`, `ConsultationBanner`, `ContactSection`,
   `BookingModal`, `About`, `WhyChoose`, `StatHighlights`, `PracticeArea` —
   all reused on the other 7 pages too) reads via these hooks instead of the
   old `t()`/static-data-file pattern.
4. **`pick(obj, field, lang)`** (`src/lib/pickField.js`) is the bilingual
   field reader: returns `obj[field + "_" + lang]`, falling back to
   `obj[field + "_en"]` if the Hindi value is missing/blank — mirrors the
   original `t()` fallback behavior exactly.
5. **`imageUrl(id)`** (`src/lib/imageUrl.js`) → `/api/images/${id}` or `null`.
6. **`resolveIcon(name)`** (`src/lib/iconMap.js`) → maps an icon-name string
   stored in the DB (e.g. `"Scale"`) back to the actual `lucide-react`
   component. Only `practice.items[].icon`, `whyChoose.items[].icon`,
   `latestUpdates.articles[].icon`, `latestUpdates.achievements[].icon` are
   DB-driven; every other icon in the UI (Hero cards, About credentials,
   StatHighlights, ConsultationBanner features) is intentionally hardcoded
   in its component, not admin-editable.
7. `translations.js` / `LanguageContext`'s `t()` **still exists** but is now
   unused by any page — every page's content is CMS-driven. It's only kept
   around as (a) the historical source the seed/patch scripts read from, and
   (b) a safety net if something wasn't migrated. Nav link **labels**
   (`navbar.navLinks.*`) are CMS-driven too (edit under Navbar → "Navigation
   Menu Labels"); only the **routes** (`navLinks.js`, `{key, href}` pairs)
   stay hardcoded, since those are real page paths, not content.
8. `DisclaimerModal`'s "show once, dismissed via localStorage" logic lives in
   `src/components/Home/DisclaimerModal/DisclaimerGate.jsx` (a small client
   component) because `page.js` itself is now a plain Server Component and
   can't hold `useState`.

Because the root layout is dynamic, **every page on the site** (not just
Home) is server-rendered per request now — this was necessary since Navbar/
ConsultationBanner/ContactSection/etc. are shared across all 8 routes and all
need live DB content.

## Admin panel

- `/admin/login` — public login form → `POST /api/auth/login`.
- `/admin/(dashboard)/*` — route group, guarded by `layout.js` calling
  `verifySession()` + `redirect()`. Renders `AdminShell` (sidebar + header +
  content), sidebar collapses to a slide-in overlay under `lg` breakpoint.
- `/admin` — dashboard: live counts (practice/whyChoose/featuredCases/
  testimonials/articles/media/achievements) read directly from
  `HomeContent`, plus Quick Links.
- Sidebar has 6 groups (`adminSections.js` → `groups`): Header & Contact,
  Hero & Stats, About & Credentials, Practice/WhyChoose/Featured Cases,
  Testimonials & Updates, and **Other Pages** (Page Headings, Recognitions,
  Case Studies Page, Court Experience).
- `/admin/home/[section]` — one dynamic page renders **any** HomeContent
  section's edit form, driven entirely by `src/lib/adminSections.js`.
- `/admin/site-settings` — same pattern for the `SiteSettings` model.

### The config-driven form system — **read this before adding/editing any field**

Everything about what fields exist, their labels, and their types lives in
**one file**: `src/lib/adminSections.js` (exports `sections` — keyed by
section name — and `groups` — how sections are grouped in the sidebar). No
component ever hardcodes a section's fields; `SectionForm` +
`Field.jsx` + `ListEditor.jsx` render whatever this config says.

Field types (`Field.jsx` switch statement):

| `type` | Renders | Notes |
|---|---|---|
| `text` | `BilingualField` (single-line, EN + HI inputs) | Reads/writes `key_en`/`key_hi` |
| `textarea` | `BilingualField` (multiline) | Same, textarea |
| `plainText` | `PlainTextField` | Single value, **not** bilingual (e.g. testimonial name, dates, phone) |
| `number` | `PlainTextField` (numeric) | e.g. testimonial rating |
| `image` | `ImageUploadField` | Value is an ObjectId string; uploads immediately to `POST /api/admin/images`, stores the returned id |
| `icon` | `IconPickerField` | `<select>` restricted to `Object.keys(iconMap)` — never free text |
| `fixedList` | `FixedListField` | Fixed-length array of plain strings, no add/remove (used only for `stats.values`) |
| `group` | Nested `fieldset` | For a nested object field, e.g. `hero.cards` |
| `list` | `ListEditor` | Add/remove/reorder array of subdocuments; each item renders its own `itemFields` recursively via `Field` |

**To add a field to an existing section:** add one entry to that section's
`fields` array in `adminSections.js`. Nothing else needs to change — the
Mongoose schema field must already exist on `HomeContent`/`SiteSettings`
though (add it there first if it's brand new).

**To add a whole new section:** (1) add a sub-schema + field to
`HomeContentSchema` in `src/models/HomeContent.js`, (2) add an entry to
`sections` in `adminSections.js` with its `fields`, (3) add its key to one of
the `groups`, (4) add an icon for it in `sectionIcons` inside
`src/components/Admin/AdminSidebar.jsx`, (5) update the seed script if it
should ship with initial content, (6) wire the actual public component to
read from `useHomeContent()` for the new section instead of `t()`.

### API routes

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/login` | public | `{ identifier, password }` → sets session cookie |
| POST | `/api/auth/logout` | — | clears cookie |
| GET | `/api/images/[id]` | public | serves raw image bytes, `Cache-Control: immutable` |
| PUT | `/api/admin/home/[section]` | required | `section` validated against `adminSections.js` keys; whole-section replace via `$set`, no item-level endpoints |
| PUT | `/api/admin/site-settings` | required | replaces the `SiteSettings` doc |
| POST | `/api/admin/images` | required | multipart upload, `png/jpeg/webp` only, 8MB cap, returns `{ id }` |

**Design choice:** saving a section always sends the *entire* section object
back (not a diff/patch). Simple, and the only sane way to express array
reordering. Fine at single-admin scale.

## Scripts (`scripts/`)

- `seed-content.mjs` — **one-time**, run once after first `npm install`.
  Reads `translations.js` + the old static data files (`PracticeData.js`,
  `whyChooseData.js`, `featuredData.js`, `testimonialData.js`,
  `latestArticles.js`, `mediaNews.js`, `achievements.js`) + hardcoded stat
  values/phone/email/address that used to live inline in components, and
  uploads every file in `/public/images` as an `ImageAsset`. Refuses to run
  if a `HomeContent` document already exists (won't clobber live edits).
  Run: `node --env-file=.env.local scripts/seed-content.mjs`.
- `create-admin.mjs` — **one-time**, creates the single `AdminUser`. Reads
  `ADMIN_EMAIL`/`ADMIN_USERNAME`/`ADMIN_PASSWORD` from the environment.
  Refuses to run if an admin already exists. Run:
  `ADMIN_EMAIL=... ADMIN_USERNAME=... ADMIN_PASSWORD=... node --env-file=.env.local scripts/create-admin.mjs`

Neither script is meant to run automatically or repeatedly — they're
one-shot setup tools, not part of the app's request path.

## Known limitations / deliberate scope cuts

- Every page's text and images are CMS-driven. Nothing left in
  `translations.js` is actually read anymore, though the file (and the old
  static data files like `PracticeData.js`, `courtsData.js` etc.) are kept
  around, unused, as historical reference / seed-script source.
- Single admin only. No roles, no multi-user, no signup UI.
- No image resizing/optimization pipeline — uploads are stored as-is
  (8MB cap, `png`/`jpeg`/`webp` only).
- No audit log / edit history — saving overwrites the previous value with no
  undo.
- Sessions aren't DB-revocable (see Auth section above).

## Deployment

- Needs a Node.js server runtime (Vercel recommended — zero config, and
  MongoDB Atlas is already cloud-hosted so it works from serverless
  functions fine). A VPS running `next start` under PM2 also works.3
- Set `DB_URL` and `SESSION_SECRET` as environment variables on the host —
  never commit them.
- Static/shared hosting (cPanel, GitHub Pages, S3) will **not** work —
  there's no server there to check sessions, query Mongo, or handle
  uploads.
