/**
 * Create TLPCI Web Template + Web Pages (Page Builder) in ERPNext.
 *
 * Each site page gets a Web Page with editable blocks for hero banner,
 * titles, body text, and images. The Next.js site reads web_template_values
 * via getWebPageContent() in src/lib/web-page-content.ts.
 *
 * Usage:
 *   node --env-file=.env.local scripts/setup-web-pages.mjs
 *   DRY_RUN=1 node --env-file=.env.local scripts/setup-web-pages.mjs
 */

const BASE = (process.env.ERPNEXT_URL || "").replace(/\/+$/, "");
const READ_KEY = process.env.ERPNEXT_API_KEY || "";
const READ_SECRET = process.env.ERPNEXT_API_SECRET || "";
const WRITE_KEY = process.env.ERPNEXT_WRITE_API_KEY || "";
const WRITE_SECRET = process.env.ERPNEXT_WRITE_API_SECRET || "";
const DRY_RUN = process.env.DRY_RUN === "1";

const readAuth = `token ${READ_KEY}:${READ_SECRET}`;
const writeAuth = `token ${WRITE_KEY}:${WRITE_SECRET}`;

const TEMPLATE_NAME = "TLPCI Page Section";
const HERO_SLIDE_TEMPLATE = "TLPCI Hero Slide";

const stats = {
  templateCreated: 0,
  templateExists: 0,
  heroTemplateCreated: 0,
  heroTemplateExists: 0,
  pagesCreated: 0,
  pagesUpdated: 0,
  pagesSkipped: 0,
  errors: 0,
};

const WELCOME_BODY = [
  "Grace and peace to you in the name of our Lord and Saviour, Jesus Christ.",
  "It is my privilege to welcome you to the official website of The Lord's Pentecostal Church International (TLPCI). Whether you are exploring the Christian faith, looking for a church home, or simply visiting, we are delighted that you are here.",
  "At TLPCI, our message is centered on Jesus Christ. He is the hope of the world, the Saviour of mankind, and the One who transforms lives through His love and the power of the Holy Spirit. Our mission is to lead people into a personal relationship with Him, nurture them in His Word, and equip them to live lives that honour God and bless others.",
  "For over six decades, God has faithfully used this ministry to proclaim the Gospel, raise disciples, and serve communities both in Ghana and around the world. We remain committed to sharing the unchanging truth of God's Word while extending His love to all people.",
  "I warmly invite you to worship with us at any of our branches and experience the joy of Christian fellowship in a welcoming community of believers. It would be our privilege to receive you and walk with you in your journey of faith.",
  "May the Lord bless you richly, strengthen your heart, and lead you into a deeper knowledge of His grace and purpose for your life.",
].join("\n\n");

/** Default homepage carousel blocks — one Page Builder block per slide. */
const HOME_CAROUSEL_BLOCKS = [
  {
    template: HERO_SLIDE_TEMPLATE,
    section_id: "carousel-1",
    values: {
      title: "Welcome to TLPCI",
      subtitle:
        "You are not here by chance — come and be part of a family where faith grows and lives are transformed.",
      cta_label: "Find Out More",
      cta_url: "/about/our-story",
    },
  },
  {
    template: HERO_SLIDE_TEMPLATE,
    section_id: "carousel-2",
    values: {
      title: "2026 Theme",
      subtitle: "Empowered to Transform (Acts 1:8)",
      cta_label: "Find Out More",
      cta_url: "/about/our-story",
    },
  },
  {
    template: HERO_SLIDE_TEMPLATE,
    section_id: "carousel-3",
    values: {
      title: "God Is In This Place",
      subtitle:
        "There is a place for you here. Come, worship with us, and encounter the life-changing power of God.",
      cta_label: "Find Out More",
      cta_url: "/about/our-story",
    },
  },
];

/** Site route -> default hero/intro content seeded into Page Builder blocks. */
const PAGE_DEFINITIONS = [
  {
    route: "home",
    title: "Home",
    mergeBlocks: true,
    blocks: [
      ...HOME_CAROUSEL_BLOCKS,
      {
        section_id: "welcome",
        values: {
          eyebrow: "Welcome to TLPCI",
          title: "The General Overseer's Welcome",
          body: WELCOME_BODY,
        },
      },
      {
        section_id: "testimonies",
        values: {
          title: "Amazing Testimonies",
        },
      },
    ],
  },
  {
    route: "about/our-story",
    title: "Our Story",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Our Story",
          title: "One Gospel. One Saviour.\nJesus Christ.",
          subtitle:
            "For over sixty years, one message has carried The Lord's Pentecostal Church International from a sitting room in Peki to the nations — Jesus Christ, the hope of the world.",
        },
      },
      {
        section_id: "origin",
        values: {
          eyebrow: "Humble Beginnings",
          title: "From a sitting room in Peki",
          body: "What began as prayer meetings in a home became a movement of faith that would reach across Ghana and beyond.",
        },
      },
    ],
  },
  {
    route: "about/what-we-believe",
    title: "What We Believe",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "What We Believe",
          title: "Our faith, our foundation",
          subtitle:
            "We stand on the unchanging Word of God and the finished work of Jesus Christ.",
        },
      },
    ],
  },
  {
    route: "about/leadership",
    title: "Leadership",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Leadership",
          title: "Servants called to lead",
          subtitle:
            "Meet the leaders who shepherd The Lord's Pentecostal Church International.",
        },
      },
    ],
  },
  {
    route: "about/education",
    title: "Education",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Education",
          title: "Raising leaders for the Church and the world",
          subtitle:
            "Training minds and hearts through Christ-centred education.",
        },
      },
    ],
  },
  {
    route: "about/healing-station",
    title: "Healing Station",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Healing Station",
          title: "A place of prayer, healing, and restoration",
          subtitle: "Encounter God in a dedicated atmosphere of faith.",
        },
      },
    ],
  },
  {
    route: "churches/find",
    title: "Find a Church",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Find a Church",
          title: "Find a TLPCI branch near you",
          subtitle:
            "Search our growing network of churches across Ghana and beyond.",
        },
      },
    ],
  },
  {
    route: "churches/pastors",
    title: "Our Ministers",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Our Ministers",
          title: "Called, ordained, and serving",
          subtitle:
            "Meet the ministers who shepherd our congregations across the network.",
        },
      },
    ],
  },
  {
    route: "contact",
    title: "Contact",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Contact",
          title: "We would love to hear from you",
          subtitle:
            "Reach out to the headquarters or a local branch — we are here to help.",
        },
      },
    ],
  },
  {
    route: "get-involved/plan-your-visit",
    title: "Plan Your Visit",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Plan Your Visit",
          title: "Come worship with us",
          subtitle:
            "Tell us when you plan to visit and we will help you feel at home.",
        },
      },
    ],
  },
  {
    route: "get-involved/membership",
    title: "Membership",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Membership",
          title: "Belong to the family of faith",
          subtitle:
            "Take your next step in belonging to The Lord's Pentecostal Church International.",
        },
      },
    ],
  },
  {
    route: "get-involved/volunteer",
    title: "Volunteer",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Volunteer",
          title: "Serve with your gifts",
          subtitle:
            "Use your time and talents to build the Church and bless others.",
        },
      },
    ],
  },
  {
    route: "get-involved/prayer-request",
    title: "Prayer Request",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Prayer Request",
          title: "We are praying with you",
          subtitle:
            "Share your prayer need and our prayer team will stand with you in faith.",
        },
      },
    ],
  },
  {
    route: "media/sermons",
    title: "Sermons",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Sermons",
          title: "Messages that feed your faith",
          subtitle: "Watch or listen to recent preaching from TLPCI.",
        },
      },
    ],
  },
  {
    route: "media/devotions",
    title: "Devotions",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Devotions",
          title: "Daily bread for your walk with God",
          subtitle: "Short reflections to strengthen your faith each day.",
        },
      },
    ],
  },
  {
    route: "media/testimonies",
    title: "Testimonies",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Testimonies",
          title: "Stories of what God is doing",
          subtitle: "Read how lives are being changed through faith in Christ.",
        },
      },
    ],
  },
  {
    route: "media/gallery",
    title: "Gallery",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Gallery",
          title: "Life together in the Church",
          subtitle: "Photos from worship, fellowship, and outreach.",
        },
      },
    ],
  },
  {
    route: "media/livestream",
    title: "Livestream",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Livestream",
          title: "Join us online",
          subtitle: "Watch live services and recent broadcasts.",
        },
      },
    ],
  },
  {
    route: "news-events/blog",
    title: "Latest News",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Latest News",
          title: "News from across the Church",
          subtitle: "Updates, announcements, and stories from TLPCI.",
        },
      },
    ],
  },
  {
    route: "news-events/events",
    title: "Events",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Events",
          title: "Gatherings across the Church",
          subtitle: "Conventions, fellowships, and special services.",
        },
      },
    ],
  },
  {
    route: "ministries/men",
    title: "Men's Ministry",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Men's Ministry",
          title: "Men of faith, men of purpose",
          subtitle: "Building godly men who lead their homes and communities.",
        },
      },
    ],
  },
  {
    route: "ministries/women",
    title: "Women's Ministry",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Women's Ministry",
          title: "Women rooted in Christ",
          subtitle: "Fellowship, discipleship, and service for every season of life.",
        },
      },
    ],
  },
  {
    route: "ministries/youth",
    title: "Youth Ministry",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Youth Ministry",
          title: "Youth on fire",
          subtitle:
            "Raising young people who stand firm in faith and impact their world for Christ.",
        },
      },
    ],
  },
  {
    route: "ministries/students",
    title: "Students Ministry",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Students Ministry",
          title: "Faith on campus",
          subtitle: "Equipping students to live and share Christ on campus.",
        },
      },
    ],
  },
  {
    route: "ministries/children",
    title: "Children's Ministry",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Children's Ministry",
          title: "Raising children in the Word",
          subtitle: "Fun, faith-filled teaching for every age group.",
        },
      },
    ],
  },
  {
    route: "ministries/missions",
    title: "Missions",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Missions",
          title: "Taking the Gospel to the nations",
          subtitle: "Supporting outreach at home and abroad.",
        },
      },
    ],
  },
  {
    route: "ministries/music",
    title: "Music Ministry",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Music Ministry",
          title: "Worship that glorifies God",
          subtitle: "Leading the Church in spirit-filled praise.",
        },
      },
    ],
  },
  {
    route: "ministries/deacons",
    title: "Deacons & Deaconesses",
    blocks: [
      {
        section_id: "hero",
        values: {
          eyebrow: "Deacons & Deaconesses",
          title: "Servants of the Church",
          subtitle: "Caring for the flock through practical ministry.",
        },
      },
    ],
  },
];

function str(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}

async function api(method, path, { write = false, body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: write ? writeAuth : readAuth,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

async function ensureWebTemplate() {
  const existing = await api(
    "GET",
    `/api/resource/Web Template/${encodeURIComponent(TEMPLATE_NAME)}`
  );
  if (existing.ok && existing.json.data) {
    stats.templateExists += 1;
    console.log(`= Web Template already exists: ${TEMPLATE_NAME}`);
    return;
  }

  const payload = {
    name: TEMPLATE_NAME,
    type: "Section",
    standard: 0,
    module: "Website",
    template: [
      "<section class=\"tlpci-page-section\">",
      "{% if eyebrow %}<p class=\"eyebrow\">{{ eyebrow }}</p>{% endif %}",
      "{% if title %}<h1>{{ title }}</h1>{% endif %}",
      "{% if subtitle %}<p class=\"subtitle\">{{ subtitle }}</p>{% endif %}",
      "{% if body %}<div class=\"body\">{{ body }}</div>{% endif %}",
      "{% if image %}<img src=\"{{ image }}\" alt=\"\">{% endif %}",
      "</section>",
    ].join("\n"),
    fields: [
      { label: "Eyebrow", fieldname: "eyebrow", fieldtype: "Data", idx: 1 },
      { label: "Title", fieldname: "title", fieldtype: "Data", idx: 2 },
      { label: "Subtitle", fieldname: "subtitle", fieldtype: "Small Text", idx: 3 },
      { label: "Body", fieldname: "body", fieldtype: "Text", idx: 4 },
      { label: "Image", fieldname: "image", fieldtype: "Attach Image", idx: 5 },
      { label: "CTA Label", fieldname: "cta_label", fieldtype: "Data", idx: 6 },
      { label: "CTA URL", fieldname: "cta_url", fieldtype: "Data", idx: 7 },
    ],
  };

  if (DRY_RUN) {
    console.log("[dry-run] create Web Template", payload.name);
    return;
  }

  const { ok, status, json } = await api("POST", "/api/resource/Web Template", {
    write: true,
    body: payload,
  });
  if (!ok || !json.data) {
    throw new Error(
      `Web Template create failed (${status}): ${
        json.exception || json._server_messages || "unknown"
      }`
    );
  }
  stats.templateCreated += 1;
  console.log(`+ Web Template: ${TEMPLATE_NAME}`);
}

async function ensureHeroSlideTemplate() {
  const existing = await api(
    "GET",
    `/api/resource/Web Template/${encodeURIComponent(HERO_SLIDE_TEMPLATE)}`
  );
  if (existing.ok && existing.json.data) {
    stats.heroTemplateExists += 1;
    console.log(`= Web Template already exists: ${HERO_SLIDE_TEMPLATE}`);
    return;
  }

  const payload = {
    name: HERO_SLIDE_TEMPLATE,
    type: "Section",
    standard: 0,
    module: "Website",
    template: [
      "<section class=\"tlpci-hero-slide\">",
      "{% if image %}<img src=\"{{ image }}\" alt=\"\">{% endif %}",
      "{% if title %}<h2>{{ title }}</h2>{% endif %}",
      "{% if subtitle %}<p>{{ subtitle }}</p>{% endif %}",
      "</section>",
    ].join("\n"),
    fields: [
      { label: "Title", fieldname: "title", fieldtype: "Data", idx: 1 },
      {
        label: "Slide Text",
        fieldname: "subtitle",
        fieldtype: "Small Text",
        idx: 2,
      },
      { label: "Image", fieldname: "image", fieldtype: "Attach Image", idx: 3 },
      { label: "Button Label", fieldname: "cta_label", fieldtype: "Data", idx: 4 },
      { label: "Button URL", fieldname: "cta_url", fieldtype: "Data", idx: 5 },
    ],
  };

  if (DRY_RUN) {
    console.log("[dry-run] create Web Template", payload.name);
    return;
  }

  const { ok, status, json } = await api("POST", "/api/resource/Web Template", {
    write: true,
    body: payload,
  });
  if (!ok || !json.data) {
    throw new Error(
      `Web Template create failed (${status}): ${
        json.exception || json._server_messages || "unknown"
      }`
    );
  }
  stats.heroTemplateCreated += 1;
  console.log(`+ Web Template: ${HERO_SLIDE_TEMPLATE}`);
}

function parseBlockValues(raw) {
  if (!raw?.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function isCarouselBlock(block) {
  const template = str(block.web_template);
  const sectionId = str(block.section_id);
  if (template === HERO_SLIDE_TEMPLATE) return true;
  return (
    sectionId === "hero" ||
    /^hero[-_]\d+$/i.test(sectionId) ||
    /^carousel[-_]\d+$/i.test(sectionId)
  );
}

function definitionBlockToRow(block, index) {
  return {
    web_template: block.template ?? TEMPLATE_NAME,
    section_id: block.section_id,
    web_template_values: JSON.stringify(block.values ?? {}),
    idx: index + 1,
    add_container: block.template === HERO_SLIDE_TEMPLATE ? 0 : 1,
    add_top_padding: block.template === HERO_SLIDE_TEMPLATE ? 0 : 1,
    add_bottom_padding: block.template === HERO_SLIDE_TEMPLATE ? 0 : 1,
  };
}

function buildPageBlocks(blocks) {
  return blocks.map((block, index) => definitionBlockToRow(block, index));
}

async function fetchWebPageBlocks(pageName) {
  const { ok, json } = await api(
    "GET",
    `/api/resource/Web Page/${encodeURIComponent(pageName)}`
  );
  if (!ok || !json.data) return [];
  return json.data.page_blocks ?? [];
}

/** Keep existing carousel + content blocks; add any missing carousel slides. */
function mergeHomePageBlocks(existingBlocks, definitionBlocks) {
  const carouselExisting = existingBlocks.filter(isCarouselBlock);
  const otherExisting = existingBlocks.filter((block) => !isCarouselBlock(block));
  const carouselDef = definitionBlocks.filter(
    (block) => block.template === HERO_SLIDE_TEMPLATE || isCarouselBlock({ section_id: block.section_id })
  );
  const otherDef = definitionBlocks.filter((block) => !carouselDef.includes(block));

  let carousel = carouselExisting.length
    ? [...carouselExisting]
    : carouselDef.map((block, index) => definitionBlockToRow(block, index));

  for (const def of carouselDef) {
    const exists = carousel.some((block) => str(block.section_id) === def.section_id);
    if (!exists) {
      carousel.push(definitionBlockToRow(def, carousel.length));
    }
  }

  const others = otherDef.map((def) => {
    const existing = otherExisting.find(
      (block) => str(block.section_id) === def.section_id
    );
    return existing ?? definitionBlockToRow(def, 0);
  });

  return [...carousel, ...others].map((block, index) => ({
    ...block,
    idx: index + 1,
  }));
}

async function findWebPage(route) {
  const params = new URLSearchParams();
  params.set("fields", JSON.stringify(["name", "route", "content_type"]));
  params.set("filters", JSON.stringify([["route", "=", route]]));
  params.set("limit_page_length", "1");
  const byRoute = await api("GET", `/api/resource/Web Page?${params}`);
  if (byRoute.json.data?.[0]) return byRoute.json.data[0];

  const slug = route.split("/").pop();
  if (!slug || slug === route) return null;

  const byName = await api(
    "GET",
    `/api/resource/Web Page/${encodeURIComponent(slug)}`
  );
  if (byName.ok && byName.json.data) return byName.json.data;
  return null;
}

async function upsertWebPage(definition) {
  const route = definition.route;
  const existing = await findWebPage(route);
  let pageBlocks = buildPageBlocks(definition.blocks);

  if (existing && definition.mergeBlocks) {
    const existingBlocks = await fetchWebPageBlocks(existing.name);
    pageBlocks = mergeHomePageBlocks(existingBlocks, definition.blocks);
  }

  const payload = {
    title: definition.title,
    route,
    published: 1,
    content_type: "Page Builder",
    dynamic_template: 0,
    show_title: 0,
    page_blocks: pageBlocks,
  };

  if (!existing) {
    if (DRY_RUN) {
      console.log(`[dry-run] create Web Page ${route}`);
      stats.pagesCreated += 1;
      return;
    }
    const { ok, status, json } = await api("POST", "/api/resource/Web Page", {
      write: true,
      body: payload,
    });
    if (!ok || !json.data) {
      throw new Error(
        `Web Page create failed (${status}): ${
          json.exception || json._server_messages || "unknown"
        }`
      );
    }
    stats.pagesCreated += 1;
    console.log(`+ Web Page: ${route} (${json.data.name})`);
    return;
  }

  if (DRY_RUN) {
    console.log(`[dry-run] update Web Page ${route}`);
    stats.pagesUpdated += 1;
    return;
  }

  const { ok, status, json } = await api(
    "PUT",
    `/api/resource/Web Page/${encodeURIComponent(existing.name)}`,
    { write: true, body: payload }
  );
  if (!ok || !json.data) {
    throw new Error(
      `Web Page update failed (${status}): ${
        json.exception || json._server_messages || "unknown"
      }`
    );
  }
  stats.pagesUpdated += 1;
  console.log(`~ Web Page: ${route} (${existing.name})`);
}

async function main() {
  if (!BASE || !READ_KEY || !READ_SECRET || !WRITE_KEY || !WRITE_SECRET) {
    console.error(
      "Missing ERPNEXT_URL / API keys in .env.local (read + write credentials required)."
    );
    process.exit(1);
  }

  console.log(
    `[setup-web-pages] Setting up ${PAGE_DEFINITIONS.length} pages${DRY_RUN ? " (DRY RUN)" : ""}…`
  );

  await ensureWebTemplate();
  await ensureHeroSlideTemplate();

  for (const definition of PAGE_DEFINITIONS) {
    try {
      await upsertWebPage(definition);
    } catch (error) {
      stats.errors += 1;
      console.error(
        `! Failed for ${definition.route}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log("\n[setup-web-pages] Done.");
  console.log(JSON.stringify(stats, null, 2));
  if (stats.errors) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
