"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CodeBlock } from "./code-block";
import type { Dictionary } from "@/i18n/get-dictionary";

const cppCode = `#include "pricer/black_scholes.hpp"
#include "pricer/market_data.hpp"

using namespace pricer;

int main() {
    // Create option parameters
    auto params = OptionParams::validated(
        OptionType::Call,
        100.0,  // spot
        105.0,  // strike
        0.05,   // risk-free rate
        0.02,   // dividend yield
        0.25,   // volatility
        1.0     // time to expiry (years)
    );

    // Compute all Greeks in one call
    auto g = bs_greeks(params);

    // g.price, g.delta, g.gamma, g.theta,
    // g.vega, g.rho, g.vanna, g.vomma, g.charm
}`;

const rustCode = `use euro_pricer::analytical::bs_greeks;
use euro_pricer::types::*;

fn main() {
    // Create validated option parameters
    let params = OptionParams::new(
        OptionKind::Call,
        100.0,  // spot
        105.0,  // strike
        0.05,   // risk-free rate
        0.02,   // dividend yield
        0.25,   // volatility
        1.0,    // time to expiry (years)
    ).unwrap();

    // Compute all Greeks in one call
    let g = bs_greeks(&params);

    // g.price, g.delta, g.gamma, g.theta,
    // g.vega, g.rho, g.vanna, g.vomma, g.charm
}`;

export function QuickstartSection({ dict }: { dict: Dictionary }) {
  const [tab, setTab] = useState<"cpp" | "rust">("rust");

  return (
    <section className="border-t border-[var(--color-border)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{dict.quickstart.title}</h2>
          <p className="mt-3 text-[var(--color-muted)]">
            {dict.quickstart.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 mx-auto max-w-2xl"
        >
          {/* Tabs */}
          <div className="flex gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-1 w-fit">
            <button
              onClick={() => setTab("cpp")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === "cpp"
                  ? "bg-white/10 text-white"
                  : "text-[var(--color-muted)] hover:text-white"
              }`}
            >
              C++
            </button>
            <button
              onClick={() => setTab("rust")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === "rust"
                  ? "bg-white/10 text-white"
                  : "text-[var(--color-muted)] hover:text-white"
              }`}
            >
              Rust
            </button>
          </div>

          <div className="mt-4">
            {tab === "cpp" ? (
              <CodeBlock
                code={cppCode}
                language="cpp"
                filename="main.cpp"
              />
            ) : (
              <CodeBlock
                code={rustCode}
                language="rust"
                filename="main.rs"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
