import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ComparisonSection } from "@/components/comparison-section";
import { QuickstartSection } from "@/components/quickstart-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroSection locale={locale} dict={dict} />
      <FeaturesSection dict={dict} />
      <ComparisonSection dict={dict} />
      <QuickstartSection dict={dict} />

      {/* CTA */}
      <section className="border-t border-[var(--color-border)] py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold">{dict.cta.title}</h2>
          <p className="mt-3 text-[var(--color-muted)]">{dict.cta.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/docs/cpp`}
              className="inline-flex h-11 items-center rounded-lg bg-[var(--color-accent)] px-6 font-medium text-white transition-opacity hover:opacity-90"
            >
              {dict.cta.cpp_docs}
            </Link>
            <Link
              href={`/${locale}/docs/rust`}
              className="inline-flex h-11 items-center rounded-lg border border-[var(--color-border)] px-6 font-medium text-white transition-colors hover:border-white/30"
            >
              {dict.cta.rust_docs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
