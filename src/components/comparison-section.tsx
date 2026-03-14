"use client";

import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";

export function ComparisonSection({ dict }: { dict: Dictionary }) {
  const c = dict.comparison;

  const rows: { key: string; label: string; cpp: string; rust: string }[] = [
    { key: "pricing", label: c.rows.pricing, cpp: c.values.cpp_pricing, rust: c.values.rust_pricing },
    { key: "analytical", label: c.rows.analytical, cpp: c.values.cpp_analytical, rust: c.values.rust_analytical },
    { key: "numerical", label: c.rows.numerical, cpp: c.values.cpp_numerical, rust: c.values.rust_numerical },
    { key: "autodiff", label: c.rows.autodiff, cpp: c.values.cpp_autodiff, rust: c.values.rust_autodiff },
    { key: "market_data", label: c.rows.market_data, cpp: c.values.cpp_market, rust: c.values.rust_market },
    { key: "validation", label: c.rows.validation, cpp: c.values.cpp_validation, rust: c.values.rust_validation },
    { key: "perf_price", label: c.rows.perf_price, cpp: c.values.cpp_perf_price, rust: c.values.rust_perf_price },
    { key: "perf_greeks", label: c.rows.perf_greeks, cpp: c.values.cpp_perf_greeks, rust: c.values.rust_perf_greeks },
    { key: "norm_cdf", label: c.rows.norm_cdf, cpp: c.values.cpp_norm_cdf, rust: c.values.rust_norm_cdf },
  ];

  return (
    <section className="border-t border-[var(--color-border)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{c.title}</h2>
          <p className="mt-3 text-[var(--color-muted)]">{c.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="pb-4 pr-4 text-left text-sm font-medium text-[var(--color-muted)]">
                  {c.feature}
                </th>
                <th className="pb-4 px-4 text-left text-sm font-medium text-[var(--color-accent)]">
                  {c.cpp}
                </th>
                <th className="pb-4 pl-4 text-left text-sm font-medium text-orange-400">
                  {c.rust}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-[var(--color-border)]/50"
                >
                  <td className="py-3.5 pr-4 text-sm">{row.label}</td>
                  <td className="py-3.5 px-4 text-sm text-[var(--color-muted)]">
                    {row.cpp === "-" ? (
                      <Minus className="h-4 w-4 text-zinc-600" />
                    ) : (
                      <span className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-accent)]" />
                        {row.cpp}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 pl-4 text-sm text-[var(--color-muted)]">
                    {row.rust === "-" ? (
                      <Minus className="h-4 w-4 text-zinc-600" />
                    ) : (
                      <span className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-orange-400" />
                        {row.rust}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
