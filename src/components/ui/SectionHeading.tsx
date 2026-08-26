import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  className?: string;
  accentWhite?: boolean;
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  className = "",
  accentWhite = false,
  children,
}: SectionHeadingProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <span className={accentWhite ? "section-accent-white" : "section-accent"} />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground sm:text-h3 md:text-h2">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
