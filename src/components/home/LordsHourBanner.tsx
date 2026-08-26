import Image from "next/image";
import Link from "next/link";

export default function LordsHourBanner({ image }: { image?: string | null }) {
  const src = image || "/images/home/lords-hour.jpg";
  return (
    <section className="bg-muted-surface py-12 lg:py-16">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <Link
          href="/media/livestream"
          aria-label="The Lord's Hour — corporate prayer every Wednesday, 10 to 11 PM GMT. Watch the livestream."
          className="group block overflow-hidden shadow-md transition-shadow hover:shadow-xl"
        >
          <Image
            src={src}
            alt="Join us every Wednesday for The Lord's Hour — corporate prayer for all TLPCI members and associates, 10PM to 11PM GMT."
            width={1536}
            height={1024}
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </Link>
      </div>
    </section>
  );
}
