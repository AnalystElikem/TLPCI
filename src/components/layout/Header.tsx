"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/data/content";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between gap-8 px-4 lg:px-8">
        <Logo showText size="md" className="shrink-0" />

        <nav className="hidden items-center lg:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isParentOnly = link.href === "#" && link.children;

              return (
                <li key={link.label} className="nav-item relative">
                  {isParentOnly ? (
                    <span className="block cursor-default px-3 py-3 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:text-primary">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-3 py-3 text-sm font-medium uppercase tracking-wide text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.children && (
                    <div className="nav-dropdown absolute left-0 top-full z-50 min-w-[220px] bg-white py-2 shadow-lg">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-text-muted hover:bg-muted-surface hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-border bg-white lg:hidden">
          <ul className="px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-border last:border-0">
                {link.href !== "#" ? (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm font-medium uppercase text-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <p className="py-3 text-sm font-medium uppercase text-foreground">
                    {link.label}
                  </p>
                )}
                {link.children && (
                  <ul className="pb-3 pl-3">
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-text-muted"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
