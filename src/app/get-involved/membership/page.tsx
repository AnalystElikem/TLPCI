import type { Metadata } from "next";
import Image from "next/image";
import { getPageBanner } from "@/lib/content-source";
import ContactForm from "@/components/get-involved/ContactForm";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Become a member of The Lord's Pentecostal Church International — find your place to belong, grow, and serve.",
};

const steps = [
  { title: "Attend regularly", text: "Worship with us and begin building relationships in the church family." },
  { title: "Join the membership class", text: "Learn our beliefs, values, history, and what membership means." },
  { title: "Meet a leader", text: "Share your faith journey and ask any questions you may have." },
  { title: "Belong & serve", text: "Be welcomed into membership and find your place to grow and serve." },
];

const benefits = [
  "Pastoral care and spiritual covering",
  "Discipleship and Bible teaching",
  "Opportunities to serve and lead",
  "Fellowship and mutual support",
];

export const revalidate = 300;

export default async function MembershipPage() {
  const banner = await getPageBanner("Membership");
  return (
    <>
      {/* Split hero */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 lg:px-14 lg:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              More than attendance
            </p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
              A place to belong
            </h1>
            <p className="mt-6 max-w-lg leading-relaxed text-text-muted">
              Membership is a commitment to follow Christ in fellowship with
              other believers — worshipping, growing, serving, and giving
              together.
            </p>
            <a href="#pathway" className="btn btn-primary mt-8 w-fit">
              How to Become a Member
            </a>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[500px]">
            <Image
              src={banner || "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80"}
              alt="Church family"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Pathway — numbered timeline */}
      <section id="pathway" className="scroll-mt-24 bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="text-2xl font-bold uppercase leading-tight text-foreground md:text-4xl">
              Your membership pathway
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              Four simple steps from your first visit to being part of the
              family.
            </p>
          </div>

          <ol className="relative border-l border-border pl-8">
            {steps.map((step, index) => (
              <li key={step.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits + quote */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="text-2xl font-bold uppercase text-foreground md:text-3xl">
              What membership includes
            </h2>
            <ul className="mt-6 space-y-4 text-text-muted">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <blockquote className="border-l-2 border-primary bg-muted-surface p-8">
            <p className="font-serif text-xl italic leading-relaxed text-foreground md:text-2xl">
              &ldquo;So in Christ we, though many, form one body, and each
              member belongs to all the others.&rdquo;
            </p>
            <footer className="mt-4 text-xs font-bold uppercase tracking-wide text-primary">
              Romans 12:5
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="scroll-mt-24 border-t border-border bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[720px] px-4 lg:px-8">
          <div className="text-center">
            <span className="section-accent mx-auto" />
            <h2 className="text-2xl font-bold uppercase text-foreground md:text-3xl">
              Ready to take the next step?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
              Register for the next membership class — we&apos;ll follow up to
              welcome you and answer any questions.
            </p>
          </div>
          <div className="mt-8">
            <ContactForm defaultFeedbackType="Membership" />
          </div>
        </div>
      </section>
    </>
  );
}
