"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileCode2, Cog } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

export function DocsSidebar({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const d = dict.docs.sidebar;

  const sections = [
    {
      label: d.overview,
      href: `/${locale}/docs`,
    },
    {
      label: d.cpp,
      icon: Cog,
      href: `/${locale}/docs/cpp`,
    },
    {
      label: d.rust,
      icon: FileCode2,
      href: `/${locale}/docs/rust`,
    },
  ];

  return (
    <nav className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-24 space-y-1">
        {sections.map((section) => {
          const active = pathname === section.href;
          return (
            <Link
              key={section.href}
              href={section.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-white/10 font-medium text-white"
                  : "text-[var(--color-muted)] hover:bg-white/5 hover:text-white"
              )}
            >
              {section.icon && <section.icon className="h-4 w-4" />}
              {section.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
