import type { Metadata } from "next";
import { getPageBanner } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";
import { Users, Monitor, Music, Baby, HandHeart, Megaphone } from "lucide-react";
import VolunteerForm from "@/components/get-involved/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer and serve at The Lord's Pentecostal Church International — find a team that fits your gifts.",
};

const teams = [
  {
    icon: Users,
    title: "Welcome & Ushering",
    text: "Greet guests, help people find seats, and make everyone feel at home.",
  },
  {
    icon: Monitor,
    title: "Media & Technical",
    text: "Sound, projection, livestream, and photography for services and events.",
  },
  {
    icon: Music,
    title: "Music & Choir",
    text: "Lead the congregation in worship through singing and instruments.",
  },
  {
    icon: Baby,
    title: "Children & Youth",
    text: "Teach and care for the next generation during services and programmes.",
  },
  {
    icon: HandHeart,
    title: "Care & Hospitality",
    text: "Visit members, support families, and prepare refreshments and welcome packs.",
  },
  {
    icon: Megaphone,
    title: "Outreach & Missions",
    text: "Share the gospel through street outreach and community projects.",
  },
];

const PAGE_ROUTE = "get-involved/volunteer";

export const revalidate = 300;

export default async function VolunteerPage() {
  const [hero, banner] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Volunteer", PAGE_ROUTE),
  ]);
  return (
    <>
      <CmsPageBanner
        cms={hero}
        alt="Volunteers serving together"
        fallbackImage={
          banner ||
          "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1600&q=80"
        }
        fallbackEyebrow="Make a difference"
        fallbackTitle="Volunteer"
        fallbackSubtitle="Use your gifts to serve God, His church, and the community."
        heightClass="h-[280px] md:h-[360px]"
        overlayClass="bg-gradient-to-t from-black/75 via-black/50 to-black/40"
        showSubtitle
      />
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-5 text-center lg:px-8">
          <a href="#volunteer-form" className="btn btn-primary">
            Join a Team
          </a>
        </div>
      </section>

      {/* Teams */}
      <section className="bg-white py-10 lg:py-12">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-accent mx-auto" />
            <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
              Find your team
            </h2>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => {
              const Icon = team.icon;
              return (
                <article key={team.title} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{team.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-text-muted">
                      {team.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="volunteer-form" className="scroll-mt-24 bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="text-2xl font-bold uppercase leading-tight text-foreground md:text-4xl">
              Tell us where you would like to serve
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              A ministry leader will contact you to talk about the team,
              training, availability, and the best place to begin.
            </p>
            <blockquote className="mt-8 border-l-2 border-primary pl-4 font-serif text-lg italic leading-relaxed text-text-muted">
              &ldquo;Each of you should use whatever gift you have received to
              serve others.&rdquo;
              <footer className="mt-2 font-sans text-xs font-bold uppercase tracking-wide text-primary">
                1 Peter 4:10
              </footer>
            </blockquote>
          </div>

          <VolunteerForm areas={teams.map((team) => team.title)} />
        </div>
      </section>
    </>
  );
}
