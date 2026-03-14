import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CodeBlock } from "@/components/code-block";

export default async function CppDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const d = dict.docs.cpp;

  return (
    <div className="space-y-12">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">{d.title}</h1>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-0.5 text-xs font-medium text-[var(--color-accent)]">
            C++20
          </span>
          <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-0.5 text-xs font-medium text-[var(--color-accent)]">
            CMake 3.20+
          </span>
        </div>
      </div>

      {/* Getting Started */}
      <section>
        <h2 className="text-2xl font-bold" id="getting-started">
          {d.getting_started}
        </h2>

        <h3 className="mt-6 text-lg font-semibold">{d.prerequisites}</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
          <li>- CMake 3.20+</li>
          <li>- C++20 compiler (GCC 12+, Clang 15+, MSVC 2022+)</li>
          <li>
            - GoogleTest & Google Benchmark (auto-fetched via CMake
            FetchContent)
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold">{d.build}</h3>
        <CodeBlock
          code={`cd cpp
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build . -j$(nproc)

# Run demo
./pricer

# Run tests (35 tests)
ctest

# Run benchmarks
./pricer_bench`}
          language="bash"
          filename="terminal"
          className="mt-3"
        />
      </section>

      {/* API Reference */}
      <section>
        <h2 className="text-2xl font-bold" id="api-reference">
          {d.api_reference}
        </h2>

        {/* Types */}
        <h3 className="mt-6 text-lg font-semibold">{d.types}</h3>
        <CodeBlock
          code={`namespace pricer {

enum class OptionType : int { Call = 1, Put = -1 };

struct OptionParams {
    OptionType type;
    double spot;            // S: underlying price
    double strike;          // K: strike price
    double risk_free_rate;  // r: risk-free rate
    double dividend_yield;  // q: dividend yield
    double volatility;      // σ: annualized volatility
    double time_to_expiry;  // T: years

    // Factory with input validation
    static OptionParams validated(OptionType type, double spot,
        double strike, double r, double q, double vol, double T);
};

struct alignas(64) GreeksResult {
    double price, delta, gamma, theta, vega, rho;
    double dividend_rho, vanna, vomma, charm;
};

}`}
          language="cpp"
          filename="include/pricer/types.hpp"
          className="mt-3"
        />

        {/* Pricing */}
        <h3 className="mt-8 text-lg font-semibold">{d.pricing}</h3>
        <CodeBlock
          code={`// Compute BS price (validated inputs)
double bs_price(const OptionParams& p);

// Compute all 10 Greeks analytically (closed-form)
GreeksResult bs_greeks(const OptionParams& p);

// Raw price function for numerical differentiation
// No validation overhead, inline-optimized
double bs_price_raw(OptionType type, double S, double K,
                    double r, double q, double sigma, double T);`}
          language="cpp"
          filename="include/pricer/black_scholes.hpp"
          className="mt-3"
        />

        {/* Numerical */}
        <h3 className="mt-8 text-lg font-semibold">{d.numerical}</h3>
        <CodeBlock
          code={`struct FDConfig {
    double spot_bump_ratio = 0.001;   // dS = S * ratio
    double vol_bump_ratio  = 0.001;   // dσ = σ * ratio
    double rate_bump_abs   = 0.0001;  // dr = 1bp
    double div_bump_abs    = 0.0001;  // dq = 1bp
    double time_bump_days  = 1.0;     // dT = 1 day
};

// Compute all Greeks via central finite differences
GreeksResult numerical_greeks(const OptionParams& p,
                               const FDConfig& config = FDConfig{});`}
          language="cpp"
          filename="include/pricer/numerical.hpp"
          className="mt-3"
        />

        {/* Market Data */}
        <h3 className="mt-8 text-lg font-semibold">{d.market_data}</h3>
        <CodeBlock
          code={`// Abstract data source interface
class MarketDataSource {
public:
    virtual double spot(const std::string& ticker) const = 0;
    virtual double risk_free_rate() const = 0;
    virtual double dividend_yield(const std::string& ticker) const = 0;
    virtual double implied_volatility(const std::string& ticker,
                                       double strike, double T) const = 0;
};

// Concrete implementations
class StaticMarketData final : public MarketDataSource { ... };
class MultiTickerMarketData final : public MarketDataSource { ... };

// Immutable point-in-time snapshot
struct MarketSnapshot {
    double spot, risk_free_rate, dividend_yield, volatility;

    static MarketSnapshot from_source(const MarketDataSource& src,
        const std::string& ticker, double strike, double T);

    OptionParams to_params(OptionType type, double strike, double T) const;
};`}
          language="cpp"
          filename="include/pricer/market_data.hpp"
          className="mt-3"
        />
      </section>

      {/* Examples */}
      <section>
        <h2 className="text-2xl font-bold" id="examples">
          {d.examples}
        </h2>

        <CodeBlock
          code={`#include "pricer/black_scholes.hpp"
#include "pricer/numerical.hpp"
#include "pricer/market_data.hpp"

using namespace pricer;

// === Basic pricing ===
auto params = OptionParams::validated(
    OptionType::Call, 100.0, 105.0, 0.05, 0.02, 0.25, 1.0);
double price = bs_price(params);       // 7.93
auto greeks = bs_greeks(params);       // all 10 Greeks

// === Numerical validation ===
auto num = numerical_greeks(params);
// num.delta ≈ greeks.delta (within 1e-4)

// === Market data switching ===
StaticMarketData static_data(100.0, 0.05, 0.02, 0.25);
MultiTickerMarketData live_data(0.05);
live_data.add_ticker("AAPL", {150.0, 0.005, 0.25});

// Switch between sources at runtime
const MarketDataSource* source = &static_data;
auto snap = MarketSnapshot::from_source(*source, "ANY", 100.0, 1.0);
auto p = snap.to_params(OptionType::Call, 100.0, 1.0);

// Switch to live
source = &live_data;
auto aapl = MarketSnapshot::from_source(*source, "AAPL", 155.0, 0.25);

// === Batch pricing (27M prices/sec) ===
for (int i = 0; i < 1'000'000; ++i) {
    OptionParams bp{OptionType::Call, 100.0, 100.0 + 0.5 * i,
                    0.05, 0.02, 0.20, 0.5};
    double p = bs_price(bp);
}`}
          language="cpp"
          filename="examples.cpp"
          className="mt-4"
        />
      </section>
    </div>
  );
}
