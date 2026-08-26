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
  getBlogPosts,
  getSermons,
  getHeroSlides,
  getHomeSettings,
  getLeadership,
} from "@/lib/content-source";

// Regenerate periodically so the verse & devotion of the day advance
// automatically and ERPNext content stays fresh — no rebuild or manual posting.
export const revalidate = 300;

export default async function Home() {
  const [slides, sermons, events, news, home, leadership] = await Promise.all([
    getHeroSlides(),
    getSermons(),
    getEvents(),
    getBlogPosts(),
    getHomeSettings(),
    getLeadership(),
  ]);

  return (
    <>
      <HeroSection slides={slides ?? undefined} />
      <DontGiveUpBanner />
      <PastorsWelcome goImage={leadership.generalOverseer.image} />
      <LordsHourBanner image={home.advertisementBanner} />
      <SermonsSection sermons={sermons} />
      <EventsBar events={events} />
      <DailyDevotion />
      <TestimoniesSection background={home.testimoniesBackground} />
      <BottomColumns news={news} />
      <LocationSection />
    </>
  );
}
