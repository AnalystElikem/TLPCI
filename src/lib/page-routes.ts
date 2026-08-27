/** ERPNext Web Page route for the homepage (`/`). */
export const HOME_PAGE_ROUTE = "home";

/** ERPNext Web Page route for each ministry page label. */
export const MINISTRY_WEB_ROUTES: Record<string, string> = {
  Men: "ministries/men",
  Women: "ministries/women",
  Youth: "ministries/youth",
  Students: "ministries/students",
  Children: "ministries/children",
  Missions: "ministries/missions",
  Music: "ministries/music",
  "Deacons & Deaconesses": "ministries/deacons",
};

/** ERPNext Web Page route for interior pages keyed by Page Banner label. */
export const PAGE_BANNER_ROUTES: Record<string, string> = {
  "Our Story": "about/our-story",
  "What We Believe": "about/what-we-believe",
  Leadership: "about/leadership",
  Education: "about/education",
  "Healing Station": "about/healing-station",
  "Find a Church": "churches/find",
  "Our Ministers": "churches/pastors",
  Contact: "contact",
  "Plan Your Visit": "get-involved/plan-your-visit",
  Membership: "get-involved/membership",
  Volunteer: "get-involved/volunteer",
  "Prayer Request": "get-involved/prayer-request",
  Livestream: "media/livestream",
  Events: "news-events/events",
};

export function pageRouteForBanner(page: string): string | undefined {
  return PAGE_BANNER_ROUTES[page];
}

export function pageRouteForMinistry(ministry: string): string | undefined {
  return MINISTRY_WEB_ROUTES[ministry];
}
