import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import type { WebPageSectionValues } from "@/lib/web-page-content";
import { webBodyText, webText } from "@/lib/web-page-content";

const GO_NAME = "Apostle Eric Essandoh Anim Otoo";
const GO_ROLE = "General Overseer";

const DEFAULT_MESSAGE = [
  "Grace and peace to you in the name of our Lord and Saviour, Jesus Christ.",
  "It is my privilege to welcome you to the official website of The Lord's Pentecostal Church International (TLPCI). Whether you are exploring the Christian faith, looking for a church home, or simply visiting, we are delighted that you are here.",
  "At TLPCI, our message is centered on Jesus Christ. He is the hope of the world, the Saviour of mankind, and the One who transforms lives through His love and the power of the Holy Spirit. Our mission is to lead people into a personal relationship with Him, nurture them in His Word, and equip them to live lives that honour God and bless others.",
  "For over six decades, God has faithfully used this ministry to proclaim the Gospel, raise disciples, and serve communities both in Ghana and around the world. We remain committed to sharing the unchanging truth of God's Word while extending His love to all people.",
  "I warmly invite you to worship with us at any of our branches and experience the joy of Christian fellowship in a welcoming community of believers. It would be our privilege to receive you and walk with you in your journey of faith.",
  "May the Lord bless you richly, strengthen your heart, and lead you into a deeper knowledge of His grace and purpose for your life.",
];

export default function PastorsWelcome({
  cms,
  goImage,
}: {
  cms?: WebPageSectionValues;
  goImage?: string | null;
}) {
  const image = goImage || "/images/leadership/general-overseer.jpg";
  const heading = webText(cms ?? {}, "title", "The General Overseer's Welcome");
  const eyebrow = webText(cms ?? {}, "eyebrow", "Welcome to TLPCI");
  const body = webBodyText(cms ?? {}, DEFAULT_MESSAGE.join("\n\n"));
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading title={heading} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          <div className="relative aspect-[3/4] overflow-hidden bg-surface shadow-sm lg:aspect-auto lg:h-full">
            <Image
              src={image}
              alt={GO_NAME}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>

            <div className="mt-4 space-y-4 text-justify leading-relaxed text-text-muted">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 border-l-2 border-primary pl-4">
              <p className="font-serif font-bold text-foreground">{GO_NAME}</p>
              <p className="text-sm italic text-text-muted">{GO_ROLE}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
