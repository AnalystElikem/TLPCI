import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { CHURCH_ADDRESS } from "@/lib/constants";

const sundayServices = [
  { name: "English Assembly", time: "8:30 am" },
  { name: "Local Language Assembly", time: "8:30 am" },
];

export default function LocationSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-12 lg:px-8 lg:py-16">
          <span className="section-accent" />

          {/* Sunday services */}
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Join Us This Sunday
          </p>
          <p className="mt-2 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl">
            <Clock className="h-6 w-6 shrink-0 text-primary" />
            Sundays at 8:30 am
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {sundayServices.map((service) => (
              <div key={service.name} className="border border-border p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                  Concurrent Service
                </p>
                <p className="mt-1 font-bold text-foreground">{service.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-text-muted">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {service.time}
                </p>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="mt-8 border-t border-border pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Headquarters Branch
            </p>
            <p className="mt-2 flex items-start gap-2 text-lg font-bold uppercase leading-snug text-foreground">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              {CHURCH_ADDRESS}
            </p>

            <div className="mt-6 flex flex-nowrap gap-2 sm:flex-wrap sm:gap-3">
              <Link
                href="/get-involved/plan-your-visit"
                className="btn btn-primary shrink-0 whitespace-nowrap !px-3 !text-[10px] !tracking-normal sm:!px-7 sm:!text-xs sm:!tracking-[0.06em]"
              >
                Plan Your Visit
              </Link>
              <Link
                href="/churches/find"
                className="btn btn-outline shrink-0 whitespace-nowrap !px-3 !text-[10px] !tracking-normal sm:!px-7 sm:!text-xs sm:!tracking-[0.06em]"
              >
                Directions
              </Link>
              <Link
                href="/churches/find"
                className="btn btn-outline shrink-0 whitespace-nowrap !px-3 !text-[10px] !tracking-normal sm:!px-7 sm:!text-xs sm:!tracking-[0.06em]"
              >
                All Locations
              </Link>
            </div>
          </div>
        </div>

        <div className="min-h-[300px] bg-surface lg:min-h-full">
          <iframe
            title="Headquarters branch map"
            src="https://www.google.com/maps?q=HPXP%2BM58%20Church%20Street%20Kwashieman%20Accra&output=embed"
            className="h-full min-h-[300px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
