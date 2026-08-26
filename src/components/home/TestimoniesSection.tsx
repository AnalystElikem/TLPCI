import Link from "next/link";

export default function TestimoniesSection({
  background,
}: {
  background?: string | null;
}) {
  return (
    <section className="relative min-h-[300px] md:min-h-[360px]">
      <div
        className="testimony-hero absolute inset-0 bg-cover bg-center"
        style={
          background
            ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url(${background})` }
            : undefined
        }
      />
      <div className="relative mx-auto flex max-w-[1400px] flex-col justify-center px-4 py-16 lg:px-8 lg:py-20">
        <span className="section-accent-white" />
        <h2 className="text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
          Amazing Testimonies
        </h2>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/media/testimonies" className="btn btn-primary">
            Read Testimonies
          </Link>
          <Link href="/media/testimonies/share" className="btn btn-white">
            Share Your Testimony
          </Link>
        </div>
      </div>
    </section>
  );
}
