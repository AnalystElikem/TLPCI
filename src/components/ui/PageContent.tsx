import { ReactNode } from "react";

export default function PageContent({ children }: { children: ReactNode }) {
  return (
    <section className="bg-muted-surface py-14 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">{children}</div>
    </section>
  );
}
