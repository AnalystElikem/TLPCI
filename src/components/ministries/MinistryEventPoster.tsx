import Image from "next/image";
import Link from "next/link";
import { CHURCH_LOGO } from "@/lib/constants";

// Single upcoming-event poster. Square frame with object-contain so the whole
// poster always shows, identical on mobile and desktop. Pass `image` when a
// poster is ready; until then a branded placeholder is shown.
export default function MinistryEventPoster({
  image = "",
  href = "/news-events/events",
  heading = "Upcoming Event",
}: {
  image?: string;
  href?: string;
  heading?: string;
}) {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <div className="text-center">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {heading}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-[440px]">
          <Link
            href={href}
            className="card-shadow group block overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              {image ? (
                <Image
                  src={image}
                  alt={heading}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="440px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white to-muted-surface">
                  <Image
                    src={CHURCH_LOGO}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain opacity-90"
                  />
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
