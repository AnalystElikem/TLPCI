# TLPCI Website — Content & Maintenance Guide

A plain-English guide to updating the site: what to change, where it lives, and
how to make the change go live. No deep coding knowledge required for most of it.

---

## 0. The golden rule: how ANY change goes live

The website runs on Vercel and rebuilds itself whenever new code is pushed to
GitHub. So every change follows the same three-step loop:

1. **Change the file** on your computer (drop in an image, or edit text).
2. **Push it to GitHub.** In PowerShell, from the project folder:
   ```
   cd C:\Users\ElikemAflakpui\Downloads\Church-website-main
   git add .
   git commit -m "Describe what you changed"
   git push
   ```
3. **Wait ~1–2 minutes.** Vercel detects the push and redeploys automatically.
   Watch it at vercel.com → your project → **Deployments**.

That's it. If you can do those three steps, you can update almost anything below.

> Tip: after editing, always run `npm run build` once locally first. If it
> succeeds, the push will succeed on Vercel too.

---

## 1. Quick reference — where everything lives

| What you want to change | File / location |
|---|---|
| Church name, motto, address, phone, email, **website domain** | `src/lib/constants.ts` |
| Homepage hero slides (3 rotating messages + images) | `src/components/home/HeroSection.tsx` |
| The Lord's Hour banner (homepage) | image: `public/images/home/lords-hour.jpg` |
| General Overseer's welcome message | `src/components/home/PastorsWelcome.tsx` |
| Verse-of-the-day list | `src/data/verses.ts` |
| Daily devotionals | `src/data/devotions.ts` |
| "Prayers for Souls" slider (missions) | `src/components/ministries/PrayersForSouls.tsx` |
| Basis of Faith + mission statement | `src/data/content.ts` (`basisOfFaith`) & `src/app/about/what-we-believe/page.tsx` |
| Ministers / pastors list | **`TLPCI Ministers Database.xlsx`** (see §4) |
| Church branches list | `src/data/branchNetwork.ts` (see §5) |
| TELPSAM campuses | `src/app/ministries/students/page.tsx` |
| The Lord's Academy locations | `src/app/about/education/page.tsx` |
| Service / meeting times | `src/app/media/livestream/page.tsx` & `src/app/get-involved/plan-your-visit/page.tsx` |
| Events, News, Sermons, Gallery, Leadership, hero slider, page banners | **ERPNext** (`tlpci.frappe.cloud`) — see §7. Built-in defaults live in `src/data/content.ts` |
| Form submissions (Contact, Prayer, etc.) | **ERPNext → Website Submission** — see §9 |
| Social-share preview image | `public/og-image.jpg` |
| Site icon (favicon) & logo | `public/tlpci-logo.png` |
| All photos | `public/images/…` (see §2 and `public/images/README.md`) |

---

## 2. Images — what to add and exactly where

> **Most changeable images now live in ERPNext (§7)** — hero slides, ministry
> heroes, **ministry leader photos**, gallery photos, event posters, news/sermon
> images, page banners, and all leadership portraits. Upload them there and they
> replace the built-in ones. The folders below are the **built-in fallbacks** the
> site shows until an ERPNext image is set (and for the few fixed images like the
> logo). The "pending photos" table below is now optional — prefer uploading in
> ERPNext.

All images live under `public/images/`, organised into folders. There's a map
in `public/images/README.md`, and a `_PUT-IMAGES-HERE.txt` note inside each
pending folder. To replace or add a photo, just drop the file into the right
folder with the right name, then do the golden loop (§0).

**Portraits** look best upright (roughly 3:4, head-and-shoulders).
**Gallery photos** can be any size — just number them `1.jpg`, `2.jpg`, `3.jpg`…

### Pending photos and where they go

| Photo | Put it here | File name |
|---|---|---|
| Ghanaian child (Children hero) | `public/images/ministries/children/` | `hero.jpg` |
| Children – National Pastor (Rev. Kennedy Atsu) | `…/children/leaders/` | `national-pastor.jpg` |
| Children – Coordinator (Ps. John N. Timpo) | `…/children/leaders/` | `coordinator.jpg` |
| Youth – National Pastor (Apostle Courage Adzimah) | `…/youth/leaders/` | `national-pastor.jpg` |
| Youth – Coordinator (Mr. Caleb Awuku) | `…/youth/leaders/` | `coordinator.jpg` |
| Men – National Pastor (Apostle Benson Menka) | `…/men/leaders/` | `national-pastor.jpg` |
| Men – Coordinator (Deacon Patrick Acquah) | `…/men/leaders/` | `coordinator.jpg` |
| Women – First Lady (Mrs. Juliet Essandoh Otoo) | `…/women/leaders/` | `first-lady.jpg` |
| Women – National Pastor (Apostle Samuel Kelly) | `…/women/leaders/` | `national-pastor.jpg` |
| Women – Coordinator (Mrs. Odelia Delasi Sowu) | `…/women/leaders/` | `coordinator.jpg` |
| Music – Director (Rev. Joseph Akunor) | `…/music/leaders/` | `director.jpg` |
| TELPSAM – National Pastor (Rev. Dr. Mrs. Edem Sokpor) | `…/students/leaders/` | `national-pastor.jpg` |
| TELPSAM – Coordinator (Pastor Elikem M. Aflakpui) | `…/students/leaders/` | `coordinator.jpg` |
| Deacons – Senior Deacon / Senior Deaconess / Pastor | `…/deacons/leaders/` | `senior-deacon.jpg`, `senior-deaconess.jpg`, `pastor.jpg` |
| Ministry galleries (any ministry) | `…/<ministry>/gallery/` | `1.jpg`, `2.jpg`, … |

**Important:** dropping a leader photo or gallery image into a folder is step
one. The photo only *appears* once its filename is linked in the page code. So
after you add photos, **tell me which folders you filled and I'll link them**
(a two-minute change). Until then the site shows a tidy placeholder rather than
a broken image.

### Photos already in use (replace only if you want to change them)

| Photo | Location |
|---|---|
| General Overseer portrait | `public/images/leadership/general-overseer.jpg` |
| Past overseers | `public/images/leadership/past-overseers/amedzro.jpg`, `wuaku.jpg`, `timpo.jpg`, `buafor.jpg` |
| TELPSAM logo | `public/images/brand/telpsam-logo.png` |
| Jesus The Light Crusade poster | `public/images/ministries/missions/jitl-web.jpg` |
| The Lord's Hour banner | `public/images/home/lords-hour.jpg` |

> To swap one of these, save the new file **with the same name** in the same
> folder, then do the golden loop. (If the picture doesn't change after
> deploying, it's browser cache — hard-refresh with Ctrl+Shift+R.)

### Decorative stock photos

Several ministry/hero backgrounds still use temporary stock photos from
Unsplash (they load from the internet). Replace them with real church photos by
sending them to me, or I can point the code to files you add under
`public/images/`.

---

## 3. Text you can safely edit yourself

These are plain text values sitting between quote marks. To change one: open the
file, find the text, change **only what's inside the quotes**, save, then do the
golden loop. Don't touch the punctuation or code around it.

- **Church name, motto, address, phone, email, and website domain** →
  `src/lib/constants.ts`. (After you have your real domain, set `SITE_URL` here.)
- **Homepage hero slide text** → `src/components/home/HeroSection.tsx` (the
  `slides` list — each has a `title` and `text`).
- **General Overseer's welcome message** →
  `src/components/home/PastorsWelcome.tsx` (the `message` paragraphs).
- **Service/meeting times** → `src/app/media/livestream/page.tsx` and
  `src/app/get-involved/plan-your-visit/page.tsx`.
- **The Lord's Academy locations** → `src/app/about/education/page.tsx`
  (`academyLocations` — add towns to the list, e.g. `["Kwashieman", "Ashaiman", "New Town"]`).
- **Basis of Faith / mission statement** → `src/data/content.ts` (`basisOfFaith`)
  and `src/app/about/what-we-believe/page.tsx`.

> When in doubt, don't guess with code — send me the change and I'll make it.
> Text-in-quotes edits are safe; anything else, ask.

---

## 4. Updating the Ministers / Pastors list  ✅ self-serve

This one is designed for you — no code needed.

1. Open **`TLPCI Ministers Database.xlsx`** in the project folder.
2. Go to the **"Data"** tab (not the pretty "Ministers" tab).
3. Add, edit, or reorder rows. Columns: **Category, Name, Branch, Ordained,
   Office**. Categories: `Apostle, Prophet, Senior Pastor, Reverend, Pastor, Elder`.
4. Save the file.
5. In PowerShell, run:
   ```
   npm run sync:ministers
   ```
   This reads the Excel and rebuilds the site's minister data automatically.
6. Do the golden loop (§0) to publish.

The "Our Ministers" page (under **Churches**) updates to match. Rows also drive
the ordering, so put people in the order you want them shown.

---

## 5. Updating the Churches / Branches list

The branch list lives in `src/data/branchNetwork.ts`, grouped by **Region →
Area → branches**. It's readable text — to add a branch, find the right area and
add its name to that area's list. Example:

```ts
{ "area": "Kwashieman", "branches": ["Kwashieman", "Techiman", "New Branch Here"] }
```

Save, then do the golden loop. The "Find a Church" search updates automatically,
and the branch count on the About page reflects the new total.

> If you'd rather manage branches from a spreadsheet like the ministers list, I
> can set up the same Excel-sync workflow for branches — just ask.

---

## 6. Updating TELPSAM campuses

Open `src/app/ministries/students/page.tsx` and find the `campuses` list. Each
entry has a `name` (e.g. "TELPSAM KTU") and a `detail` (the institutions it
covers). Add, edit, or remove entries, save, and do the golden loop.

---

## 7. ERPNext — the content admin (Events, News, Sermons, Gallery & more)

Most of the site's changeable content is now managed in **ERPNext** at
`https://tlpci.frappe.cloud`, so a team member can update it without touching
code. Log in, open the relevant list, add or edit a record, tick **Is
Published**, and Save. The website picks it up within about **5 minutes** — no
push or rebuild needed.

### What ERPNext controls (the DocTypes)

| DocType | Drives on the site |
|---|---|
| **Web Event** | Events. Leave **Ministry** blank → shows on the homepage + Events page. Set **Ministry** → shows on that ministry's page instead. No poster uploaded → shows the logo placeholder. |
| **Web News** | News page + homepage "Latest News" + full article pages |
| **Sermon** | Sermons page + homepage sermons |
| **Gallery Album** | Gallery page + each ministry's photo grid (photos = the album's **Attachments**; tag with **Ministry**) |
| **Ministry Page** | Each ministry's hero image |
| **Ministry Leader** | The leaders shown on each ministry page (name, role, photo) |
| **Hero Slide** | Homepage hero slider (ordered by Display Order) |
| **Home Settings** | Testimonies background + the advertisement/Lord's Hour banner |
| **Page Banner** | The top banner photo on interior pages |
| **Executive Committee** | Leadership page (General Overseer, Council, Past Overseers) |
| **Website Submission** | Form submissions inbox (see §9) |

### The golden rule of ERPNext content: nothing ever goes blank

Every one of these is a **fallback, not a hard replacement**. If a record is
missing or an image field is empty, the site keeps showing the built-in
default (the current photo or the sample text). So you can move content into
ERPNext gradually and nothing breaks in the meantime. Only records with **Is
Published** ticked appear on the site.

### The two ERPNext users (keep these straight)

- **Website Reader** — read-only, used by the site to *display* content. Its API
  key/secret live in Vercel as `ERPNEXT_URL`, `ERPNEXT_API_KEY`,
  `ERPNEXT_API_SECRET`.
- **Website Writer** — create-only, used by the contact/prayer/etc. forms to
  *save* submissions. Its keys live in Vercel as `ERPNEXT_WRITE_API_KEY`,
  `ERPNEXT_WRITE_API_SECRET`.

**Never put these keys in the code or share them in chat.** They go only in
Vercel → Settings → Environment Variables (and a local `.env.local` for
testing — see `.env.local.example`). If a key is ever exposed, regenerate it on
that ERPNext user and update the env var.

### Image sizes (shown as hints on each ERPNext field)

Event poster square 1080×1080; News/Sermon/Hero/Page banners landscape 16:9
(~1600–1920 wide); Gallery cover ~1200×900; Leadership portraits ~800×1000.
Keep files under ~1–2 MB so pages stay fast.

### Still in code (not ERPNext), by design

Ministers list (Excel — §4), branches (§5), TELPSAM campuses (§6), and
devotionals/verses (§8). These are either self-serve already or must never
depend on someone posting.

---

## 8. Devotionals & verses — automatic, nothing to manage  ✅

The **verse of the day** and **daily devotional** are chosen automatically by
the date, cycling through the lists in `src/data/verses.ts` and
`src/data/devotions.ts`. **Nobody ever has to post them.** If the site is up,
today's verse and devotion are always there — they can't be forgotten or go
blank. You only ever *add* to these lists to increase variety; it's never
required. (Currently: 365 verses, 186 devotionals.)

To add more, send them to me (or add entries in the same format) and do the
golden loop.

---

## 9. Forms & the submissions inbox

The Contact, Prayer Request, Plan-a-Visit, Volunteer, and Newsletter forms all
save into ERPNext as **Website Submission** records — one inbox for everything.
Open the **Website Submission** list in ERPNext to read them; filter by **Form
Type** (Contact / Prayer Request / Volunteer / Plan a Visit / Newsletter).
Prayer requests carry a **Confidential** flag.

How it works: a form posts to a small endpoint on the site (`/api/submit`),
which creates the record using the **Website Writer** key (§7). A honeypot and
rate limit block spam; email and phone are validated. To get an email alert on
each submission, set up a **Notification** in ERPNext on the Website Submission
DocType.

If the write keys aren't set, forms still show the thank-you screen but don't
store anything — so nothing breaks before the keys are added.

**Giving is hidden for now.** The Give page and its menu/footer links are
removed, and `/get-involved/give` redirects away. To enable online giving later,
we'll wire a Ghana provider (Mobile Money via Paystack/Hubtel) with server-side
verification and restore the page.

---

## 10. Things best left to a developer (me)

- Adding brand-new pages or sections, or new ERPNext DocTypes/fields.
- Adding a new field to an existing DocType (the site must be told to read it).
- Restoring the Give page and wiring a payment provider.
- Anything involving changing code structure rather than text-in-quotes.

For these, just describe what you want and I'll handle it. When you add or rename
a **field** in an ERPNext DocType, tell me the exact fieldname so the site maps
to it (a mismatched name makes that section fall back to the built-in default).

---

## Launch checklist (one-time)

- [ ] `npm install` locally, then `npm run build` to confirm it compiles
- [ ] Set the ERPNext env vars in Vercel: `ERPNEXT_URL`, `ERPNEXT_API_KEY`,
      `ERPNEXT_API_SECRET`, `ERPNEXT_WRITE_API_KEY`, `ERPNEXT_WRITE_API_SECRET`
- [ ] Confirm the **File** DocType is readable by Website Reader (for gallery photos)
- [ ] Create one published Web Event to confirm live content flows
- [ ] (Optional) Add an ERPNext Notification to email the team on new submissions
- [ ] Set `SITE_URL` in `src/lib/constants.ts` to your real domain
- [ ] Add your domain in Vercel → Settings → Domains
- [ ] Add real photos (upload in ERPNext, or send to me for in-code slots)
- [ ] Footer social icons → your real Facebook/YouTube/etc. links
- [ ] Provide remaining Lord's Academy locations & Deacons leader names
