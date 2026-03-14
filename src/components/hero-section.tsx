"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

export function HeroSection({
  locale,
  dict,
}: {
  locale: string;
  dict: Dictionary;
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[var(--color-accent)]/8 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-[300px] w-[400px] rounded-full bg-[var(--color-accent-2)]/6 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
            {dict.hero.badge}
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {dict.hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${locale}/docs`}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 font-medium text-black transition-opacity hover:opacity-90"
            >
              {dict.hero.cta_docs}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/nktkt/euro-option-pricer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 font-medium text-white transition-colors hover:border-white/30"
            >
              <Github className="h-4 w-4" />
              {dict.hero.cta_github}
            </a>
          </div>
        </motion.div>

        {/* Animated code preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#0d0d0f] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-[var(--color-muted)]">
                price_option.rs
              </span>
            </div>
            <pre className="overflow-x-auto p-6">
              <code className="text-sm leading-relaxed text-zinc-300">{`let params = OptionParams::new(
    OptionKind::Call,
    100.0,   // spot
    105.0,   // strike
    0.05,    // risk-free rate
    0.02,    // dividend yield
    0.25,    // volatility
    1.0,     // time to expiry
).unwrap();

let greeks = bs_greeks(&params);

// price:  7.93   delta: 0.52
// gamma:  0.019  vega: 37.52
// theta: -6.41   rho:  43.89`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
