import type { Metadata } from "next";
import Image from "next/image";
import { getPageBanner } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import { CmsPageIntro } from "@/components/cms/CmsPageSections";
import Link from "next/link";
import { CHURCH_NAME } from "@/lib/constants";

const PAGE_ROUTE = "about/our-story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of The Lord's Pentecostal Church International — from a 1961 prayer group in Peki to a growing Pentecostal fellowship across Ghana and beyond.",
};

const stats = [
  { value: "1961", label: "Founded in Peki" },
  { value: "60+", label: "Years of Ministry" },
  { value: "200+", label: "Local Branches" },
  { value: "8+", label: "Nations Reached" },
];

const timeline = [
  {
    year: "1958",
    title: "A Healing at Teikrom",
    text: "John Sam Amedzro, gravely ill, was taken to the Teikrom Prayer Camp in the Volta Region. There he was healed and encountered a living faith of prayer, healing, and the power of God.",
  },
  {
    year: "1959",
    title: "Prayer in a Sitting Room",
    text: "Returning to Peki-Blengo, Amedzro began holding prayer meetings in his own home. As the sick were healed and many believed, a devoted prayer group was born.",
  },
  {
    year: "1961",
    title: "The Church Is Born",
    text: "On 29 October 1961, the leaders baptised themselves and 35 believers — the founding of The Lord's Church, known affectionately as “Agbelengor,” meaning “there is life ahead.”",
  },
  {
    year: "1972",
    title: "A New Generation of Leaders",
    text: "After the founder's passing, Apostle Emmanuel Kwaku Wuaku led the church. Educated ministers joined, and the church grew in teaching, order, and Pentecostal identity.",
  },
  {
    year: "1985",
    title: "The Lord's Pentecostal Church",
    text: "The church adopted the name The Lord's Pentecostal Church and was registered with the Ghana Pentecostal Council, taking its place among Ghana's Pentecostal family.",
  },
  {
    year: "Today",
    title: "Reaching the Nations",
    text: "Now The Lord's Pentecostal Church International, the ministry has spread across Ghana and beyond — still preaching Christ, still guided by His Word.",
  },
];

const quickLinks = [
  { label: "Meet the Leadership", href: "/about/leadership" },
  { label: "What We Believe", href: "/about/what-we-believe" },
  { label: "Find a Church", href: "/churches/find" },
];

export const revalidate = 300;

export default async function OurStoryPage() {
  const [hero, banner] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Our Story", PAGE_ROUTE),
  ]);
  return (
    <>
      <CmsPageIntro
        cms={hero}
        fallbackEyebrow="Our Story"
        fallbackTitle={"One Gospel. One Saviour.\nJesus Christ."}
        fallbackSubtitle={`For over sixty years, one message has carried ${CHURCH_NAME} from a sitting room in Peki to the nations — Jesus Christ, the hope of the world. This is the story of what He has done, and is still doing, through an ordinary people who trusted Him.`}
      />

      {/* Origin narrative */}
      <section className="border-t border-border bg-muted-surface">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative min-h-[320px] overflow-hidden shadow-sm md:min-h-[420px]">
            <Image
              src={banner || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1000&q=80"}
              alt={CHURCH_NAME}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="space-y-5 text-justify leading-relaxed text-text-muted">
            <span className="section-accent" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Humble Beginnings
            </h2>
            <p>
              The Lord&apos;s Pentecostal Church International traces its roots to
              the Volta Region of Ghana. In 1958, a man named John Sam Amedzro,
              weakened by a long illness that no remedy could cure, was taken to
              a prayer camp at Teikrom. There he was healed — and there he
              encountered the power of God that would define the rest of his life.
            </p>
            <p>
              Returning home to Peki-Blengo, he began gathering people for prayer
              in his own sitting room. The sick were healed, lives were changed,
              and a hungry prayer group grew around him. On 29 October 1961, that
              group became a church, beginning with the baptism of thirty-five
              believers.
            </p>
            <p>
              The community nicknamed them <em>Agbelengor</em> — &ldquo;there is
              life ahead&rdquo; — a fitting name for a people whose message was
              hope in Christ. From the very first constitution, one motto anchored
              them, and it anchors us still:{" "}
              <strong className="text-foreground">
                &ldquo;Christ our Lord, the Bible our Guide.&rdquo;
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-16 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              Our Journey
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-4xl">
              Milestones of Faith
            </h2>
          </div>

          <ol className="relative mt-12 space-y-8 border-l-2 border-border pl-8 md:mt-16 md:space-y-10 md:pl-10">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-white md:-left-[49px]" />
                <p className="font-serif text-xl font-bold text-primary md:text-2xl">
                  {item.year}
                </p>
                <h3 className="mt-1 text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-justify leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Motto banner */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-[900px] px-4 py-14 text-center lg:px-8 lg:py-20">
          <span className="section-accent-white mx-auto" />
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            Our Guiding Motto Since 1961
          </p>
          <p className="mt-4 font-serif text-3xl font-bold text-white md:text-5xl">
            &ldquo;Christ our Lord, the Bible our Guide.&rdquo;
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-[1100px] px-4 py-14 lg:px-8 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are today */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-16 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
              Who We Are Today
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-4xl">
              A Pentecostal Family on Mission
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Local Branches",
                text: "Congregations across Ghana and beyond where members worship, grow, and serve under caring pastoral leadership.",
              },
              {
                title: "Ministries",
                text: "Children, Youth, Men, Women, Students, and Missions — equipping every member for a life of service.",
              },
              {
                title: "Mission",
                text: "To bring people to know Jesus Christ and join His family, to build them to Christlike maturity and equip them through the Holy Spirit for ministry in the church and the world to the glory of God.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-border p-6 text-center">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links row */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white px-4 py-8 text-center text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Find a church CTA */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[280px] md:min-h-[320px]">
          <Image
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1400&q=80"
            alt="Find a local church"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-2xl font-bold uppercase text-white md:text-4xl">
              Become Part of the Story
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/85">
              Join a congregation near you and find your place in the family of God.
            </p>
            <Link href="/churches/find" className="btn btn-primary mt-6">
              Find a Church
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
