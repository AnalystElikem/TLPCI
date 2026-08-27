import type { Metadata } from "next";
import { getPageBanner } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Building2,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { CHURCH_ADDRESS, CHURCH_NAME } from "@/lib/constants";
import ContactForm from "@/components/get-involved/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Lord's Pentecostal Church International — office and branch addresses, phone, email, and a message form.",
};

const details = [
  {
    icon: Building2,
    title: "HQ Office",
    lines: [
      "Hong Kong, Kwashieman, Accra",
      "Plus Code: HPXM+5W8",
      "Digital Address: GA-528-1131",
    ],
  },
  {
    icon: MapPin,
    title: "HQ Branch",
    lines: [CHURCH_ADDRESS],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@tlpci.org"],
    href: "mailto:info@tlpci.org",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+233 24 720 7074"],
    href: "tel:+233247207074",
  },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const PAGE_ROUTE = "contact";

export const revalidate = 300;

export default async function ContactPage() {
  const [hero, banner] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Contact", PAGE_ROUTE),
  ]);
  return (
    <>
      <CmsPageBanner
        cms={hero}
        alt="Contact us"
        fallbackImage={
          banner ||
          "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1600&q=80"
        }
        fallbackEyebrow="Get in touch"
        fallbackTitle="Contact"
        heightClass="h-[220px] md:h-[300px]"
      />

      {/* Detail cards */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border border-border p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">
                    {item.title}
                  </h2>
                  <div className="mt-2 space-y-1 text-sm text-text-muted">
                    {item.lines.map((line) =>
                      item.href ? (
                        <a
                          key={line}
                          href={item.href}
                          className="block hover:text-primary"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line}>{line}</p>
                      )
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="border-t border-border bg-muted-surface py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="text-2xl font-bold uppercase leading-tight text-foreground md:text-3xl">
              Send us a message
            </h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              Have a question, prayer need, or want to plan a visit? Fill in the
              form and a member of our team will get back to you.
            </p>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-foreground p-6 text-white md:p-8">
              <h3 className="whitespace-nowrap font-serif text-xs font-bold tracking-tight sm:text-sm md:text-base">
                {CHURCH_NAME}
              </h3>
              <p className="mt-4 flex items-start gap-3 text-sm text-white/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Headquarters Office, Hong Kong, Kwashieman, Accra
              </p>
              <p className="mt-3 flex items-center gap-3 text-sm text-white/75">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                info@tlpci.org
              </p>
              <p className="mt-3 flex items-center gap-3 text-sm text-white/75">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +233 24 720 7074
              </p>

              <div className="mt-6 border-t border-white/15 pt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                  Follow us
                </p>
                <div className="mt-3 flex gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition-colors hover:bg-primary hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
                Looking for a branch?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Find the congregation nearest you with service times and
                directions.
              </p>
              <Link href="/churches/find" className="btn btn-outline mt-4">
                Find a Church
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white">
        <iframe
          title="Church location map"
          src="https://www.google.com/maps?q=HPXP%2BM58%20Church%20Street%20Kwashieman%20Accra&output=embed"
          className="h-[360px] w-full border-0 grayscale-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
