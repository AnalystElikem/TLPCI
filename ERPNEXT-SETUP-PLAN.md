> **Historical document.** This was the original plan for a custom set of content doctypes (Web Event, Web News, Gallery Album and so on) on the old `tlpci.frappe.cloud` site. The live site now uses the Church app on `new---tlpci.nvi.frappe.cloud` (Function, Sermon, Blog Post, Testimonies, Person...). See `MAINTENANCE-GUIDE.md` for how things work today.

# ERPNext Backend — Setup & Content Model Plan

Goal: manage **Events, News, Sermons, and a photo Gallery** in ERPNext, and have
the website pull them in automatically. This document is the build blueprint. Do
the phases in order; when Phase 3 is done, hand the details to me and I do Phase 4.

> **Governing principle — images never go blank.** Every image managed in
> ERPNext is a **fallback, not a hard replacement**. If an image hasn't been
> uploaded to ERPNext yet, the website keeps showing whatever is there now (the
> current file or stock photo). This applies **everywhere** — hero slides,
> ministry heroes, gallery covers, event posters, news and sermon images, and the
> homepage banners. You can move images into ERPNext gradually, one at a time,
> and nothing breaks in the meantime.

---

## Phase 1 — Stand up ERPNext

**Recommended: Frappe Cloud (managed).** Easiest for a church with no sysadmin —
they handle hosting, updates, and backups.

1. Go to **frappecloud.com** → sign up.
2. Create a new **Site** and choose the **ERPNext** app (Frappe framework comes
   with it). Pick a small plan to start; you can scale later.
3. When the site is ready you'll get a URL like `https://tlpci.frappe.cloud`
   and an admin login. That URL is your ERPNext address.

*Alternative (cheaper, more work):* self-host with Docker (`frappe_docker`) on a
VPS such as DigitalOcean. Only choose this if someone can maintain a server.

> You do **not** need ERPNext's accounting/HR/inventory modules for this. We only
> use its ability to create custom record types (DocTypes) and its API.

---

## Phase 2 — Create the content types (DocTypes)

You do **not** need Developer Mode. Just open the **DocType** list and click
**+ Add DocType** to create each of the nine DocTypes below. For each field, the
**type** is in brackets. Keep the field names close to these — I'll map the
website to them. After creating each DocType, open its **Naming** tab and set
**Auto Name** to `field:title` so records are named by their title.

### DocType: **Web Event**
- `title` (Data) — event name
- `event_date` (Date)
- `end_date` (Date, optional — for multi-day events)
- `time` (Data) — e.g. "6:00 pm" or "All week"
- `location` (Data) — e.g. "Headquarters, Kwashieman"
- `category` (Data / Select) — e.g. Worship, Training, Convention
- `description` (Small Text)
- `poster` (Attach Image, optional) — square event poster
- `is_published` (Check) — only published events show on the site

### DocType: **Web News**
There is **no separate blog** — News covers both short announcements and longer
written pieces. Use `category` to tag items (News, Testimony, Teaching, etc.).
- `title` (Data)
- `date` (Date)
- `category` (Data / Select) — News, Testimony, Teaching, etc.
- `excerpt` (Small Text) — short summary for the cards
- `body` (Text Editor) — full article
- `image` (Attach Image)
- `is_published` (Check)

### DocType: **Sermon**
- `title` (Data)
- `speaker` (Data)
- `date` (Date)
- `category` (Data / Select) — Sunday Service, Bible Study, etc.
- `duration` (Data) — e.g. "48 min"
- `video_url` (Data) — YouTube/Facebook link
- `audio_url` (Data, optional)
- `thumbnail` (Attach Image, optional)
- `is_published` (Check)

### DocType: **Gallery Album**
A photo album for the **Gallery** page **and** the ministry/fellowship pages.
Create it as a **normal** DocType (do **not** tick "Is Child Table").
- `title` (Data)
- `slug` (Data, unique) — URL piece, e.g. "sunday-worship"
- `category` (Data / Select) — Worship, Teaching, Events, Sacraments…
- `date` (Data) — e.g. "Jul 2026"
- `description` (Small Text)
- `cover_image` (Attach Image) — the album's cover tile
- `ministry` (Select) — options: `General, Men, Women, Youth, Students, Children,
  Missions, Music, Deacons & Deaconesses`
- `is_published` (Check)

> **Photos — bulk upload, no photos field.** Don't add a photos field. After
> saving an album, drag all its photos into the **Attachments** panel at once.
> The website reads the album's image attachments as its photo grid. The
> `ministry` tag decides where the album appears: **General** shows on the main
> Gallery page; any ministry value shows on that fellowship's page.

### DocType: **Ministry Page**
One record per ministry, holding **only** that ministry's **hero image**.
Everything else on the page — leaders, chants, copy — stays in code.
Create it as a **normal** DocType.
- `ministry` (Select) — options: `Men, Women, Youth, Students, Children,
  Missions, Music, Deacons & Deaconesses`
- `hero_image` (Attach Image) — top banner image for the ministry page

> Naming Rule: **Set by user** (type a short name like "Men" when creating each
> record). A Select field can't use `field:`/unique naming, and the site reads
> the `ministry` field, not the record name. Each ministry page uses its ERPNext
> hero
> image if set, otherwise falls back to the image already in code — nothing
> breaks if a record is missing.

### DocType: **Hero Slide**
One record per slide in the **homepage hero slider**. The homepage shows
published slides in **Display Order**; if none exist, it falls back to the
built-in slides. Every slide's button stays fixed as "Find Out More" linking to
the About page.
- `title` (Data) — e.g. "Welcome to TLPCI"
- `text` (Small Text) — the line under the title
- `image` (Attach Image) — landscape 16:9, 1920×1080px
- `display_order` (Int) — 1, 2, 3… controls slide order
- `is_published` (Check)

### DocType: **Home Settings**
A **single** settings record — tick **"Is Single"** when creating it — that holds
one-off homepage images. The testimonies heading and buttons stay fixed in code;
only the background photo is managed here.
- `testimonies_background` (Attach Image) — landscape 1920×1080px, a darker photo
  works best
- `advertisement_banner` (Attach Image, optional) — replaces The Lord's Hour
  banner on the homepage when set

### DocType: **Page Banner**
One record per interior page, holding that page's top banner photo. Lets you
replace the stock header images with real church photos, page by page.
- `page` (Select) — options: `About, Our Story, What We Believe, Education,
  Healing Station, Find a Church, Our Ministers, Contact, Give, Membership,
  Plan Your Visit, Prayer Request, Volunteer, Livestream, Events, News`
- `banner_image` (Attach Image) — landscape 16:9, 1920×1080px

> Naming Rule: **Set by user** (type a short name like "About Page" when creating
> each record). A Select field can't use `field:`/unique naming, and the site
> reads the `page` field, not the record name.

### DocType: **Executive Committee**
The General Overseer, Executive Council members, and Past Overseers. The
`category` field groups them onto the Leadership page; order within each group
follows `display_order`.
- `full_name` (Data) — the fieldname can't be `name` (reserved by Frappe)
- `role` (Data) — position, e.g. General Secretary
- `category` (Select) — `General Overseer, Executive Council, Past Overseer`
- `image` (Attach Image) — portrait 3:4, ~800×1000px
- `tenure` (Data, optional) — years served, e.g. "1961 – 1972" (past overseers)
- `note` (Small Text, optional) — short descriptor, e.g. "Founder & First
  General Overseer"
- `bio` (Text Editor, optional) — full biography (mainly the GO)
- `display_order` (Int) — order within the group
- `is_published` (Check)

> Set Auto Name to `field:full_name` (the fieldname cannot be `name` — that's
> Frappe's reserved record ID).

> Tip: the `is_published` checkbox lets your team draft content and only reveal
> it when ready. The website will show only records where `is_published` is
> ticked.

---

## Phase 3 — Give the website read access

1. In ERPNext, create (or pick) a user for the website — ideally **read-only**
   with access limited to the four DocTypes above.
2. Open that user → **API Access** → **Generate Keys**. You'll get an
   **API Key** and **API Secret**. Copy both.
3. Confirm the API works: in a browser (while logged in) visit
   `https://YOUR-ERPNEXT-URL/api/resource/Web Event` — you should get JSON.

**Security:** the API key/secret are like a password. **Don't paste them in chat
or put them in the code.** You'll enter them yourself as environment variables
(next phase). Share with me only the **ERPNext URL** and the **DocType/field
names** — not the secret.

---

## Phase 4 — Wire the website to ERPNext (I do this)

Once Phases 1–3 are done, send me:
- Your **ERPNext URL**
- Confirmation of the **DocType names and field names** you actually used
  (in case they differ from above)

Then I'll build:
- A small server-side fetch layer (`src/lib/erpnext.ts`) that reads from the API.
- The **Events, News, Sermons, and Gallery** sections/pages pulling live from
  ERPNext, cached and **refreshed every few minutes** (no rebuilds needed).
- The **Gallery** page and each ministry page's photo grid, reading each album's
  image attachments and routing albums by the `ministry` tag.
- **Ministry page hero images** pulled from the Ministry Page records, with
  fallback to the in-code images.
- The **homepage hero slider** driven by Hero Slide records, and the
  **testimonies background** plus other one-off homepage images from Home
  Settings — all with fallback to the in-code defaults.
- **Interior page banners** driven by Page Banner records, and the **Leadership
  page** (General Overseer, Executive Council, Past Overseers) driven by
  Executive Committee records — both with fallback to the in-code images and
  content.
- **Graceful fallbacks** — if ERPNext is empty or briefly unreachable, the
  section shows a tidy "nothing here yet" message instead of breaking.
- The ERPNext image domain added to `next.config.ts` so uploaded images load.

**You** will then add three values in **Vercel → Settings → Environment
Variables** (I'll give exact names):
- `ERPNEXT_URL`
- `ERPNEXT_API_KEY`
- `ERPNEXT_API_SECRET`

(and the same in a local `.env.local` file for testing). The secret lives only
in these env vars — never in the repo.

---

## What stays as-is (for now)

- **Ministers/Pastors** → the `TLPCI Ministers Database.xlsx` + `npm run
  sync:ministers` workflow. Works well; migrate to ERPNext later only if you
  want a single admin.
- **Branches** → `src/data/branchNetwork.ts`. Same reasoning.
- **Devotionals & verses** → stay in code. They're automatic and must never
  depend on anyone posting daily.

We can revisit moving ministers/branches into ERPNext once Events/News/Sermons/
Gallery are live and you're comfortable with the workflow.

---

## Your immediate next step

Set up the Frappe Cloud site (Phase 1). Once you can log into ERPNext, tell me
and I'll walk you through building the DocTypes screen-by-screen if you'd like —
or you build them from the specs above and ping me when the API keys are ready.
