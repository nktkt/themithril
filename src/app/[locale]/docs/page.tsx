import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Cog, FileCode2, ArrowRight } from "lucide-react";

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const d = dict.docs.overview;

  return (
    <div>
      <h1 className="text-3xl font-bold">{d.title}</h1>
      <p className="mt-4 text-lg text-[var(--color-muted)] leading-relaxed">
        {d.intro}
      </p>

      <p className="mt-8 text-sm font-medium text-[var(--color-muted)]">
        {d.choose}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Link
          href={`/${locale}/docs/cpp`}
          className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-accent)]/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
              <Cog className="h-5 w-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-xl font-semibold">{dict.docs.sidebar.cpp}</h2>
          </div>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            CMake, C++20, std::erfc. QuantLib-compatible API.
          </p>
          <span className="mt-4 flex items-center gap-1 text-sm text-[var(--color-accent)] group-hover:gap-2 transition-all">
            {dict.docs.cpp.getting_started}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href={`/${locale}/docs/rust`}
          className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-orange-400/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400/10">
              <FileCode2 className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-xl font-semibold">{dict.docs.sidebar.rust}</h2>
          </div>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Cargo, libm::erfc, reverse-mode autodiff.
          </p>
          <span className="mt-4 flex items-center gap-1 text-sm text-orange-400 group-hover:gap-2 transition-all">
            {dict.docs.rust.getting_started}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
