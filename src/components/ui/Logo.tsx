import Image from "next/image";
import Link from "next/link";
import {
  CHURCH_LOGO,
  CHURCH_MOTTO,
  CHURCH_NAME,
  CHURCH_SHORT,
} from "@/lib/constants";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { img: 36, text: "text-sm" },
  md: { img: 48, text: "text-[15px]" },
  lg: { img: 64, text: "text-base" },
};

export default function Logo({
  showText = true,
  size = "md",
  className = "",
}: LogoProps) {
  const s = sizes[size];

  return (
    <Link href="/" className={`flex min-w-0 items-center gap-3 ${className}`}>
      <Image
        src={CHURCH_LOGO}
        alt={CHURCH_NAME}
        width={s.img}
        height={s.img}
        className="shrink-0 object-contain"
        style={{ width: s.img, height: s.img }}
        priority
      />
      {showText && (
        <div className="min-w-0">
          <p
            className={`font-serif font-semibold leading-tight text-foreground ${s.text}`}
          >
            <span className="sm:hidden">{CHURCH_SHORT}</span>
            <span className="hidden sm:inline">{CHURCH_NAME}</span>
          </p>
          <p className="mt-0.5 hidden text-[11px] italic text-text-muted sm:block">
            {CHURCH_MOTTO}
          </p>
        </div>
      )}
    </Link>
  );
}
