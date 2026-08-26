import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { CHURCH_LOGO, CHURCH_NAME } from "@/lib/constants";
import NewsletterForm from "@/components/layout/NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-xl text-center">
          <Link href="/" className="mb-6 inline-block">
            <Image
              src={CHURCH_LOGO}
              alt={CHURCH_NAME}
              width={72}
              height={72}
              className="mx-auto h-[72px] w-[72px] object-contain"
            />
          </Link>

          <span className="section-accent mx-auto" />
          <h3 className="text-xl font-bold uppercase tracking-wide">
            Subscribe to Our News Channel
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
            Stay updated with sermons, events, and church news delivered to your inbox.
          </p>

          <NewsletterForm />

          <div className="mt-8 flex items-center justify-center gap-5">
            <Link href="#" className="text-white/70 hover:text-white" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white/70 hover:text-white" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white/70 hover:text-white" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white/70 hover:text-white" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/60">
            &copy; {currentYear} {CHURCH_NAME}.
          </p>
        </div>
      </div>
    </footer>
  );
}
