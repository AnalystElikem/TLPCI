import ContentImage from "@/components/ui/ContentImage";

export default function MinistryGallery({
  images = [],
  heading = "Moments & Memories",
  subtitle,
}: {
  images?: string[];
  heading?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-muted-surface py-14 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <div className="text-center">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {heading}
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-lg text-sm text-text-muted">
              {subtitle}
            </p>
          ) : null}
        </div>

        {images.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={`relative overflow-hidden bg-surface ${
                  i % 5 === 0 ? "aspect-square" : "aspect-[4/3]"
                }`}
              >
                <ContentImage
                  src={src}
                  alt={`${heading} photo ${i + 1}`}
                  fill
                  imageClassName="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mx-auto mt-10 aspect-[16/7] max-w-3xl overflow-hidden bg-surface">
            <ContentImage src={null} alt="" fill />
          </div>
        )}
      </div>
    </section>
  );
}
