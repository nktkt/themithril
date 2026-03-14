"use client";

import { motion } from "motion/react";
import {
  Calculator,
  Layers,
  Zap,
  Database,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

const icons = [Calculator, Layers, Zap, Database, ShieldCheck, CheckCircle];

export function FeaturesSection({ dict }: { dict: Dictionary }) {
  const items = [
    { title: dict.features.greeks_title, desc: dict.features.greeks_desc },
    { title: dict.features.methods_title, desc: dict.features.methods_desc },
    { title: dict.features.perf_title, desc: dict.features.perf_desc },
    { title: dict.features.market_title, desc: dict.features.market_desc },
    {
      title: dict.features.validated_title,
      desc: dict.features.validated_desc,
    },
    { title: dict.features.safe_title, desc: dict.features.safe_desc },
  ];

  return (
    <section className="border-t border-[var(--color-border)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{dict.features.title}</h2>
          <p className="mt-3 text-[var(--color-muted)]">
            {dict.features.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-white/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
