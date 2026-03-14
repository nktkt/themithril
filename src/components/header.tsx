"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/get-dictionary";

export function Header({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const otherLocale = locale === "en" ? "ja" : "en";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/docs`, label: dict.nav.docs },
    {
      href: "https://github.com/nktkt/euro-option-pricer",
      label: dict.nav.github,
      external: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold tracking-tight"
        >
          Euro Option Pricer
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={cn(
                "text-sm text-[var(--color-muted)] transition-colors hover:text-white",
                pathname === item.href && "text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={switchedPath}
            className="flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:border-white/30 hover:text-white"
          >
            <Globe className="h-3.5 w-3.5" />
            {otherLocale === "ja" ? "日本語" : "English"}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--color-muted)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-[var(--color-border)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-sm text-[var(--color-muted)] hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={switchedPath}
              className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <Globe className="h-3.5 w-3.5" />
              {otherLocale === "ja" ? "日本語" : "English"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
