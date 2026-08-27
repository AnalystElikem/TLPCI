import HeroSection from "@/components/home/HeroSection";
import DontGiveUpBanner from "@/components/home/DontGiveUpBanner";
import PastorsWelcome from "@/components/home/PastorsWelcome";
import LordsHourBanner from "@/components/home/LordsHourBanner";
import SermonsSection from "@/components/home/SermonsSection";
import EventsBar from "@/components/home/EventsBar";
import DailyDevotion from "@/components/home/DailyDevotion";
import TestimoniesSection from "@/components/home/TestimoniesSection";
import BottomColumns from "@/components/home/BottomColumns";
import LocationSection from "@/components/home/LocationSection";
import {
  getEvents,
  getHomeAdvertisementBanners,
  getBlogPosts,
  getSermons,
  getHomeHeroSlides,
  getHomeSettings,
  getLeadership,
} from "@/lib/content-source";
import { HOME_PAGE_ROUTE } from "@/lib/page-routes";
import { getWebPageSection } from "@/lib/web-page-content";

// Regenerate periodically so the verse & devotion of the day advance
// automatically and ERPNext content stays fresh — no rebuild or manual posting.
export const revalidate = 300;

export default async function Home() {
  const [slides, sermons, events, adBanners, news, home, leadership, welcome, testimonies] =
    await Promise.all([
      getHomeHeroSlides(),
      getSermons(),
      getEvents(),
      getHomeAdvertisementBanners(),
      getBlogPosts(),
      getHomeSettings(),
      getLeadership(),
      getWebPageSection(HOME_PAGE_ROUTE, "welcome"),
      getWebPageSection(HOME_PAGE_ROUTE, "testimonies"),
    ]);

  return (
    <>
      <HeroSection slides={slides ?? undefined} />
      <DontGiveUpBanner />
      <PastorsWelcome cms={welcome} goImage={leadership.generalOverseer.image} />
      <LordsHourBanner
        advertisements={adBanners}
        image={home.advertisementBanner}
      />
      <SermonsSection sermons={sermons} />
      <EventsBar events={events} />
      <DailyDevotion />
      <TestimoniesSection cms={testimonies} background={home.testimoniesBackground} />
      <BottomColumns news={news} />
      <LocationSection />
    </>
  );
}
