# TLPCI Website: Content & Maintenance Guide

A plain-English guide to updating the site: what to change, where it lives, and
how to make the change go live. No deep coding knowledge required for most of it.

**Live site:** https://tlpci-three.vercel.app (Vercel project `tlpci`)
**Code:** https://github.com/AnalystElikem/TLPCI (the one repo)
**Content admin (ERPNext):** https://new---tlpci.nvi.frappe.cloud

---

## 0. The two ways a change goes live

**A. Content in ERPNext** (homepage slides and welcome text, every page's headline
and banner photo, people, sermons, news, events, testimonies, gallery, prayer
requests and form inboxes). Log in, add or edit the record, tick
**Publish**, Save. The site picks it up within about **5 minutes**. No push, no
rebuild. See §7.

**B. Text, images or lists that live in the code.** These follow a three-step loop:

1. **Change the file** on your computer (drop in an image, or edit text).
2. **Push it to GitHub.** In Command Prompt, from the project folder:
   ```
   cd %USERPROFILE%\Documents\TLPCI
   git pull
   git add .
   git commit -m "Describe what you changed"
   git push
   ```
3. **Wait about 1 to 2 minutes.** Vercel detects the push and redeploys
   automatically. Watch it at vercel.com, your project, **Deployments**.

> First time on a new computer? Run `git clone https://github.com/AnalystElikem/TLPCI.git`
> in `Documents` first.
>
> Tip: after editing, run `npm run build` once locally. If it succeeds, the push
> will succeed on Vercel too.

---

## 1. Quick reference — where everything lives

| What you want to change | File / location |
|---|---|
| Church name, motto, address, phone, email, **website domain** | `src/lib/constants.ts` |
| Homepage hero slides (3 rotating messages + images) | **ERPNext**, [Home page](https://new---tlpci.nvi.frappe.cloud/desk/web-page/home), blocks `carousel-1` to `carousel-3`. See §7 |
| The Lord's Hour banner (homepage) | image: `public/images/home/lords-hour.jpg` |
| General Overseer's welcome message (homepage) | **ERPNext**, [Home page](https://new---tlpci.nvi.frappe.cloud/desk/web-page/home), block `welcome`. See §7 |
| Headline, intro text and banner photo of any other page | **ERPNext**, [Web Pages](https://new---tlpci.nvi.frappe.cloud/desk/web-page), block `hero`. See §7 |
| Verse-of-the-day list | `src/data/verses.ts` |
| Daily devotionals | `src/data/devotions.ts` |
| "Prayers for Souls" slider (missions) | `src/components/ministries/PrayersForSouls.tsx` |
| Basis of Faith + mission statement | `src/data/content.ts` (`basisOfFaith`) & `src/app/about/what-we-believe/page.tsx` |
| Ministers / pastors list | **ERPNext, People (Person records)**, see §4 |
| Church branches list | `src/data/branchNetwork.ts` (see §5) |
| TELPSAM campuses | `src/app/ministries/students/page.tsx` |
| The Lord's Academy locations | `src/app/about/education/page.tsx` |
| Service / meeting times | `src/app/media/livestream/page.tsx` & `src/app/get-involved/plan-your-visit/page.tsx` |
| Events, News, Sermons, Testimonies, Gallery, Leadership people | **ERPNext** (`new---tlpci.nvi.frappe.cloud`), see §7 |
| Order of the Executive Council on the Leadership page | `src/lib/content-source.ts` (`COUNCIL_ROLE_ORDER`), see §7 |
| Form submissions (Contact, Prayer, Visit, Testimony, Newsletter) | **ERPNext**, see §9 |
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
- **Homepage hero slide text and the General Overseer's welcome message** →
  now in ERPNext, not in code. See §7 "Page text and banners".
- **Service/meeting times** → `src/app/media/livestream/page.tsx` and
  `src/app/get-involved/plan-your-visit/page.tsx`.
- **The Lord's Academy locations** → `src/app/about/education/page.tsx`
  (`academyLocations` — add towns to the list, e.g. `["Kwashieman", "Ashaiman", "New Town"]`).
- **Basis of Faith / mission statement** → `src/data/content.ts` (`basisOfFaith`)
  and `src/app/about/what-we-believe/page.tsx`.

> When in doubt, don't guess with code — send me the change and I'll make it.
> Text-in-quotes edits are safe; anything else, ask.

---

## 4. Updating the Ministers / Pastors list (ERPNext)

The "Our Ministers" page, minister profiles and the Executive Council on the
Leadership page are all built from **Person** records in ERPNext. The Excel file
is no longer what the site reads.

**To add or edit one minister:**

1. In ERPNext open **People > Person** and find (or add) the person.
2. Set **Location** to their branch (a Church Location record).
3. Under **Positions**, add a row: **Position** is their rank (Apostle, Prophet,
   Senior Pastor, Reverend, Pastor, Elder, Deacon...), plus a **Start Date**.
   Put their office (for example "Director of Missions") in **Notes**.
4. Tick **Is Executive** if they sit on the Executive Council.
5. Save. The site updates within about 5 minutes.

**Bulk load from Excel (rare).** `TLPCI Ministers Database.xlsx` (Data tab:
Category, Name, Branch, Ordained, Office) can still be pushed into ERPNext with
`npm run import:ministers` (add `DRY_RUN=1` first to preview). That script
updates existing records, so it must be run with **Administrator** keys in a
local `.env.local`, not with the restricted website keys. Do not put Administrator
keys in Vercel. `npm run sync:ministers` is the old method and is no longer used.

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

> The branch list on Find a Church and the Plan Your Visit dropdown comes from
> this file, not from ERPNext. (ERPNext Church Location records are only used to
> show each minister's branch.)

---

## 6. Updating TELPSAM campuses

Open `src/app/ministries/students/page.tsx` and find the `campuses` list. Each
entry has a `name` (e.g. "TELPSAM KTU") and a `detail` (the institutions it
covers). Add, edit, or remove entries, save, and do the golden loop.

---

## 7. ERPNext: the content admin

Most changeable content is managed in ERPNext at
`https://new---tlpci.nvi.frappe.cloud`, so a team member can update it without
touching code. Log in, open the list, add or edit a record, tick **Publish**,
and Save. The site picks it up within about **5 minutes**.

### What ERPNext controls

| Where in ERPNext | Drives on the site | Shows only when |
|---|---|---|
| **Function** (Ministries) | Events page and homepage "Upcoming Events" | **Publish** is ticked; leave "Is AD" unticked |
| **Sermon** | Sermons page and homepage | **Publish** is ticked |
| **Blog Post** | Latest News page and homepage | **Published** is ticked |
| **Testimonies** | Testimonies page. Visitor submissions arrive unpublished | **Approved** and **Publish** both ticked |
| **Church Gallery Category** | Gallery page (photos are the record's attachments) | the record exists |
| **Person** | Our Ministers, minister pages, Executive Council | see §4 |
| **Prayer Request, Feedback, Visitation Log, Subscribers** | Nothing. These are inboxes for form submissions | n/a |

### Page text and banners (Web Pages)

The headline, intro text and banner photo of the homepage and every interior page
come from an ERPNext **Web Page**. List of all pages: [https://new---tlpci.nvi.frappe.cloud/desk/web-page](https://new---tlpci.nvi.frappe.cloud/desk/web-page).
Open a page, scroll to **Page Blocks**, open the block row, change its fields,
and Save. The site updates in about 5 minutes.

**The golden rule for blocks:** a block field you leave **blank** falls back to
the built-in text or photo in the code, so blank is safe. A field you fill always
wins over the code. If a change does not show up on the site, check the block
first, because a leftover image there beats anything in the code.

**Homepage** ([open it](https://new---tlpci.nvi.frappe.cloud/desk/web-page/home)) has five blocks:

| Block (Section ID) | What it controls | Fields |
|---|---|---|
| `carousel-1`, `carousel-2`, `carousel-3` | The three rotating slides at the top | Title, Subtitle (the line under it), Image, CTA label (button text), CTA URL (where the button goes) |
| `welcome` | The General Overseer's welcome on the homepage | Eyebrow (small heading), Title, Body (paragraphs separated by a blank line). The photo is the General Overseer's Person record, not this block |
| `testimonies` | Heading of the testimonies strip | Title |

Slide photos: use a wide image exactly 3 times wider than tall, ideally 3840 x 1280
(UHD) and under 2 MB. The slider's height follows that shape on big screens, so a
3:1 image is shown in full (a taller image gets its top and bottom trimmed). **When you upload in ERPNext, untick "Optimize" in the upload
dialog.** With it on, ERPNext shrinks the picture (a 2400 pixel image came back
1024 pixels wide and soft). Text sits on the
lower left, so keep faces and key details away from that corner. A portrait photo
needs a wide background built around it first; ask me and I will make it. If
**Image** is blank, the slide shows the built-in photo for that slot (slot 1 is
the Women's Convention 2026 photo in the repo, slot 2 is the 2026 theme design (a flame with rings spreading outward, no text), slot 3 is a stock photo).
Slide 3 currently holds a placeholder image, so it needs a real photo.

**Phones show a different picture for slide 1.** Under 768 pixels wide, slide 1 shows
a close-up of the First Lady instead of the collage. That phone picture lives in the
repo (`public/images/home/hero-first-lady-mobile.jpg`), not in ERPNext, so changing
slide 1's Image in ERPNext changes laptops and tablets only. To change the phone
picture, ask me and I will swap the file (a square image, about 900 x 900, works best).

**Interior pages** each have one `hero` block with **Eyebrow**, **Title**,
**Subtitle** and **Image** (the banner photo). Blank Image means the built-in
banner. One page also has an `origin` block (Our Story).

| Page on the site | Open the Web Page in ERPNext |
|---|---|
| Our Story | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/our-story](https://new---tlpci.nvi.frappe.cloud/desk/web-page/our-story) (blocks `hero`, `origin`) |
| What We Believe | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/what-we-believe](https://new---tlpci.nvi.frappe.cloud/desk/web-page/what-we-believe) |
| Leadership | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/leadership](https://new---tlpci.nvi.frappe.cloud/desk/web-page/leadership) |
| Education | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/education](https://new---tlpci.nvi.frappe.cloud/desk/web-page/education) |
| Healing Station | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/healing-station](https://new---tlpci.nvi.frappe.cloud/desk/web-page/healing-station) |
| Find a Church | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/find-a-church](https://new---tlpci.nvi.frappe.cloud/desk/web-page/find-a-church) |
| Our Ministers | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/our-ministers](https://new---tlpci.nvi.frappe.cloud/desk/web-page/our-ministers) |
| Contact | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/contact](https://new---tlpci.nvi.frappe.cloud/desk/web-page/contact) |
| Membership | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/membership](https://new---tlpci.nvi.frappe.cloud/desk/web-page/membership) |
| Plan Your Visit | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/plan-your-visit](https://new---tlpci.nvi.frappe.cloud/desk/web-page/plan-your-visit) |
| Prayer Request | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/prayer-request](https://new---tlpci.nvi.frappe.cloud/desk/web-page/prayer-request) |
| Volunteer | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/volunteer](https://new---tlpci.nvi.frappe.cloud/desk/web-page/volunteer) |
| Sermons | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/sermons](https://new---tlpci.nvi.frappe.cloud/desk/web-page/sermons) |
| Livestream | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/livestream](https://new---tlpci.nvi.frappe.cloud/desk/web-page/livestream) |
| Gallery | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/gallery](https://new---tlpci.nvi.frappe.cloud/desk/web-page/gallery) |
| Testimonies | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/testimonies](https://new---tlpci.nvi.frappe.cloud/desk/web-page/testimonies) |
| Devotions | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/devotions](https://new---tlpci.nvi.frappe.cloud/desk/web-page/devotions) |
| Latest News | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/latest-news](https://new---tlpci.nvi.frappe.cloud/desk/web-page/latest-news) |
| Events | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/events](https://new---tlpci.nvi.frappe.cloud/desk/web-page/events) |
| Men's Ministry | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/mens-ministry](https://new---tlpci.nvi.frappe.cloud/desk/web-page/mens-ministry) |
| Women's Ministry | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/womens-ministry](https://new---tlpci.nvi.frappe.cloud/desk/web-page/womens-ministry) |
| Youth Ministry | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/youth-ministry](https://new---tlpci.nvi.frappe.cloud/desk/web-page/youth-ministry) |
| Students Ministry | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/students-ministry](https://new---tlpci.nvi.frappe.cloud/desk/web-page/students-ministry) |
| Children's Ministry | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/childrens-ministry](https://new---tlpci.nvi.frappe.cloud/desk/web-page/childrens-ministry) |
| Missions | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/missions](https://new---tlpci.nvi.frappe.cloud/desk/web-page/missions) |
| Music Ministry | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/music-ministry](https://new---tlpci.nvi.frappe.cloud/desk/web-page/music-ministry) |
| Deacons & Deaconesses | [https://new---tlpci.nvi.frappe.cloud/desk/web-page/deacons-deaconesses](https://new---tlpci.nvi.frappe.cloud/desk/web-page/deacons-deaconesses) |

Do not rename, delete or unpublish these pages, and do not change a block's
**Section ID** (`hero`, `carousel-1`, `welcome`, and so on). The site finds each
block by that ID, so a changed ID makes the block stop showing. To add a fourth
homepage slide, add a block with template **TLPCI Hero Slide** and Section ID
`carousel-4` (a fourth slide must have an Image, since there is no built-in photo
for it).

Known leftover: the What We Believe banner currently points at a placeholder
image (a mug pattern). Replace or clear it.

### Quick links: where to add or edit things

| To do this | Open |
|---|---|
| Add an event | [Function list](https://new---tlpci.nvi.frappe.cloud/desk/function) (tick Publish; leave "Is AD" off) |
| Add a Lord's Hour or ad banner | [Function list](https://new---tlpci.nvi.frappe.cloud/desk/function) (tick "Is AD") |
| Add a sermon | [Sermon list](https://new---tlpci.nvi.frappe.cloud/desk/sermon) |
| Add a news story | [Blog Post list](https://new---tlpci.nvi.frappe.cloud/desk/blog-post) |
| Approve a testimony | [Testimonies list](https://new---tlpci.nvi.frappe.cloud/desk/testimonies) (tick Approved and Publish) |
| Add gallery photos | [Church Gallery Category list](https://new---tlpci.nvi.frappe.cloud/desk/church-gallery-category) |
| Add or edit a minister or leader | [Person list](https://new---tlpci.nvi.frappe.cloud/desk/person) (see §4 and "Leadership page") |
| Ministry banner photo, leaders and gallery | [Ministry list](https://new---tlpci.nvi.frappe.cloud/desk/ministry) |
| Branch locations used on minister pages | [Church Location list](https://new---tlpci.nvi.frappe.cloud/desk/church-location) |
| Read form submissions | [Feedback](https://new---tlpci.nvi.frappe.cloud/desk/feedback), [Prayer Request](https://new---tlpci.nvi.frappe.cloud/desk/prayer-request), [Visitation Log](https://new---tlpci.nvi.frappe.cloud/desk/visitation-log), [Subscribers](https://new---tlpci.nvi.frappe.cloud/desk/subscribers), [Event sign-ups](https://new---tlpci.nvi.frappe.cloud/desk/function-sign-up) |
| Check or regenerate the website's API keys | [website-reader](https://new---tlpci.nvi.frappe.cloud/desk/user/website-reader@tlpci.org), [website-writer](https://new---tlpci.nvi.frappe.cloud/desk/user/website-writer@tlpci.org) |

### Empty sections

When ERPNext has no published sermons, events or news, the site shows a plain
"coming soon" message. It does **not** show invented sample content.

### Leadership page

- **General Overseer and Executive Council** come from Person records with
  **Is Executive** ticked. A person's **Position** (their title, for example
  Apostle) forms their name prefix, and **Notes** on the position holds their
  office (for example "General Secretary"). "Council Member" is a seat, not a
  title, so it is not printed before a name.
- **Order** is set in code, not in ERPNext: General Secretary, Director of
  Missions, Operations, Finance, Christian Education, Development Projects, the
  two Pastors' Reps (Apostle before Reverend), then Council Members. To change
  it, edit `COUNCIL_ROLE_ORDER` and `COUNCIL_MEMBER_NAME_ORDER` in
  `src/lib/content-source.ts`.
- **Past General Overseers** and the General Overseer's biography are built-in
  text. (The "Executive Committee" doctype that could override them does not
  exist on this ERPNext site.)

### Built-in for now

These doctypes do not exist on this ERPNext site: Hero Slide, Page Banner, Home
Settings and Executive Committee. They are not needed, because slides and banners
are edited in Web Pages (above). The Lord's Hour and testimonies background
images, past General Overseers and the General Overseer's biography still use
built-in content.

### The two ERPNext users (keep these straight)

- **website-reader@tlpci.org** (role *Website Reader*): read-only, used by the
  site to *display* content. Its key and secret live in Vercel as `ERPNEXT_URL`,
  `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`.
- **website-writer@tlpci.org** (role *Website Writer*): create-only, used by the
  forms to *save* submissions. Its keys live in Vercel as
  `ERPNEXT_WRITE_API_KEY`, `ERPNEXT_WRITE_API_SECRET`.

If a new section stays empty or a form stops saving after you add a doctype,
the reader or writer probably lacks permission on it: in ERPNext add a
permission rule for that role on the doctype (Read for the reader, Create for the
writer).

**Never put these keys in the code or share them in chat.** They go only in
Vercel, Settings, Environment Variables (and a local `.env.local` for testing,
see `.env.local.example`). If a key is ever exposed, regenerate it on that user
(User > Settings > API Access > Generate Keys) and update the env var.

### Image sizes

Event poster square 1080x1080; News and Sermon images landscape 16:9 (about
1600 to 1920 wide); Gallery cover about 1200x900; Leadership portraits about
800x1000. Keep files under 1 to 2 MB so pages stay fast.

### Still in code (not ERPNext), by design

Branches (§5), TELPSAM campuses (§6), devotionals and verses (§8), the order
of the Executive Council, and service times.

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

## 9. Forms and where they land

Each form saves a record in ERPNext using the **Website Writer** key. Open the
list in ERPNext to read what people sent.

| Form on the site | Lands in ERPNext as |
|---|---|
| Contact | **Feedback** |
| Prayer Request | **Prayer Request** (can be marked confidential) |
| Plan Your Visit | **Visitation Log** (linked to the Person if the phone number matches) |
| Share a Testimony | **Testimonies**, unpublished until you approve it |
| Event sign-up | **Function Sign-Up** (plus a Person record) |
| Newsletter | **Subscribers** and **Email Group Member** |

A honeypot and a rate limit block spam; email and phone are validated. ERPNext on
this site has no outgoing email set up, so it does not email anyone when a form
arrives. Check the lists, or add an ERPNext Notification once an email account is
configured.

If the write keys are missing, forms still show the thank-you screen but store
nothing, so test a form after any change to keys.

**Test records.** Delete any test submission afterwards (Actions > Delete in the
list). Use an obviously fake email such as `test@example.com`.

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

- [x] ERPNext env vars set in Vercel with the restricted Website Reader and Writer keys (not Administrator)
- [x] Test sermons, news, testimonies, events and gallery removed from ERPNext
- [x] Each form tested once and the test records deleted
- [ ] Add real sermons, events, news, testimonies and gallery photos in ERPNext
- [ ] Test the event sign-up form once a real event exists
- [ ] Set `SITE_URL` in `src/lib/constants.ts` to your real domain
- [ ] Add your domain in Vercel, Settings, Domains
- [ ] Footer social icons: your real Facebook/YouTube/etc. links
- [ ] Provide remaining Lord's Academy locations and Deacons leader names
- [ ] Archive the old `Church-website` repo and its Vercel project once everything runs from TLPCI
