import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CodeBlock } from "@/components/code-block";

export default async function RustDocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const d = dict.docs.rust;

  return (
    <div className="space-y-12">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">{d.title}</h1>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-orange-400/10 px-3 py-0.5 text-xs font-medium text-orange-400">
            Rust 1.70+
          </span>
          <span className="rounded-full bg-orange-400/10 px-3 py-0.5 text-xs font-medium text-orange-400">
            Autodiff
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
          <li>- Rust 1.70+ (stable)</li>
          <li>- Cargo</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold">{d.add_dep}</h3>
        <CodeBlock
          code={`[dependencies]
euro-pricer = { git = "https://github.com/nktkt/euro-option-pricer", rev = "main" }`}
          language="toml"
          filename="Cargo.toml"
          className="mt-3"
        />

        <CodeBlock
          code={`cd rust

# Run demo (compares all 3 methods)
cargo run --release --example price_option

# Run tests (41 tests)
cargo test

# Run benchmarks
cargo bench`}
          language="bash"
          filename="terminal"
          className="mt-4"
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
          code={`#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OptionKind { Call, Put }

#[derive(Debug, Clone, Copy)]
pub struct OptionParams {
    pub kind: OptionKind,
    pub spot: f64,            // S: underlying price
    pub strike: f64,          // K: strike price
    pub risk_free_rate: f64,  // r: risk-free rate
    pub dividend_yield: f64,  // q: dividend yield
    pub volatility: f64,      // σ: annualized volatility
    pub time_to_expiry: f64,  // T: years
}

impl OptionParams {
    /// Validates all inputs. Returns Err for invalid params.
    pub fn new(kind, spot, strike, r, q, vol, T)
        -> Result<Self, ValidationError>;
}

#[derive(Debug, Clone, Copy, Default)]
#[repr(C, align(64))]
pub struct GreeksResult {
    pub price: f64,     pub delta: f64,
    pub gamma: f64,     pub theta: f64,
    pub vega: f64,      pub rho: f64,
    pub dividend_rho: f64,
    pub vanna: f64,     pub vomma: f64,
    pub charm: f64,
}`}
          language="rust"
          filename="src/types.rs"
          className="mt-3"
        />

        {/* Pricing */}
        <h3 className="mt-8 text-lg font-semibold">{d.pricing}</h3>
        <CodeBlock
          code={`// Compute BS price
pub fn bs_price(p: &OptionParams) -> f64;

// Compute all 10 Greeks analytically (closed-form)
pub fn bs_greeks(p: &OptionParams) -> GreeksResult;

// Raw price for numerical differentiation (no validation)
pub fn bs_price_raw(
    kind: OptionKind, s: f64, k: f64,
    r: f64, q: f64, sigma: f64, t: f64,
) -> f64;

// Normal distribution (15-digit precision via libm::erfc)
pub fn norm_cdf(x: f64) -> f64;
pub fn norm_pdf(x: f64) -> f64;`}
          language="rust"
          filename="src/analytical.rs"
          className="mt-3"
        />

        {/* Numerical */}
        <h3 className="mt-8 text-lg font-semibold">{d.numerical}</h3>
        <CodeBlock
          code={`pub struct FDConfig {
    pub spot_bump_ratio: f64,   // default: 0.001
    pub vol_bump_ratio: f64,    // default: 0.001
    pub rate_bump_abs: f64,     // default: 0.0001 (1bp)
    pub div_bump_abs: f64,      // default: 0.0001
    pub time_bump_days: f64,    // default: 1.0 day
}

/// Compute all Greeks via central finite differences
pub fn numerical_greeks(
    p: &OptionParams, config: &FDConfig
) -> GreeksResult;`}
          language="rust"
          filename="src/numerical.rs"
          className="mt-3"
        />

        {/* Autodiff */}
        <h3 className="mt-8 text-lg font-semibold">{d.autodiff}</h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          {locale === "ja"
            ? "カスタム逆伝播自動微分テープを使用。1次Greeks（Delta, Vega, Rho）は機械精度（~1e-15）。Gammaはハイブリッド方式（AD Delta + 有限差分）。"
            : "Custom reverse-mode AD tape. First-order Greeks (Delta, Vega, Rho) are exact to machine precision (~1e-15). Gamma uses a hybrid approach (AD delta + finite difference)."}
        </p>
        <CodeBlock
          code={`/// Compute Greeks using reverse-mode automatic differentiation.
///
/// First-order Greeks: exact to machine precision (~1e-15).
/// Second-order Greeks: hybrid AD + FD (~1e-7).
pub fn autodiff_greeks(p: &OptionParams) -> GreeksResult;`}
          language="rust"
          filename="src/autodiff.rs"
          className="mt-3"
        />

        {/* Market Data */}
        <h3 className="mt-8 text-lg font-semibold">{d.market_data}</h3>
        <CodeBlock
          code={`/// Trait for market data sources
pub trait MarketDataSource {
    fn spot(&self, ticker: &str) -> f64;
    fn risk_free_rate(&self) -> f64;
    fn dividend_yield(&self, ticker: &str) -> f64;
    fn implied_volatility(&self, ticker: &str,
                           strike: f64, expiry: f64) -> f64;
}

// Implementations
pub struct StaticMarketData { ... }
pub struct MultiTickerMarketData { ... }

/// Immutable point-in-time snapshot
pub struct MarketSnapshot {
    pub spot: f64,
    pub risk_free_rate: f64,
    pub dividend_yield: f64,
    pub volatility: f64,
}

impl MarketSnapshot {
    pub fn from_source(source: &dyn MarketDataSource,
        ticker: &str, strike: f64, expiry: f64) -> Self;

    pub fn to_params(&self, kind: OptionKind,
        strike: f64, T: f64) -> Result<OptionParams, ValidationError>;
}`}
          language="rust"
          filename="src/market_data.rs"
          className="mt-3"
        />
      </section>

      {/* Examples */}
      <section>
        <h2 className="text-2xl font-bold" id="examples">
          {d.examples}
        </h2>

        <CodeBlock
          code={`use euro_pricer::analytical::{bs_price, bs_greeks};
use euro_pricer::numerical::{numerical_greeks, FDConfig};
use euro_pricer::autodiff::autodiff_greeks;
use euro_pricer::market_data::*;
use euro_pricer::types::*;

// === Basic pricing ===
let params = OptionParams::new(
    OptionKind::Call, 100.0, 105.0, 0.05, 0.02, 0.25, 1.0
).unwrap();

let price = bs_price(&params);        // 7.93
let greeks = bs_greeks(&params);      // all 10 Greeks

// === Three computation methods ===
let analytical = bs_greeks(&params);
let numerical = numerical_greeks(&params, &FDConfig::default());
let autodiff = autodiff_greeks(&params);

// Analytical vs Autodiff delta difference: ~1e-15
assert!((analytical.delta - autodiff.delta).abs() < 1e-10);

// === Market data switching ===
let static_src = StaticMarketData::new(100.0, 0.05, 0.02, 0.25);
let mut live_src = MultiTickerMarketData::new(0.05);
live_src.add_ticker("AAPL", TickerData {
    spot: 150.0,
    dividend_yield: 0.005,
    implied_vol: 0.25,
});

// Runtime polymorphism via trait objects
let source: &dyn MarketDataSource = &static_src;
let snap = MarketSnapshot::from_source(source, "ANY", 100.0, 1.0);

// Switch to live
let source: &dyn MarketDataSource = &live_src;
let snap = MarketSnapshot::from_source(source, "AAPL", 155.0, 0.25);
let params = snap.to_params(OptionKind::Call, 155.0, 0.25).unwrap();

// === Put-Call Parity (verified to 1e-14) ===
let call = bs_price(&OptionParams::new(
    OptionKind::Call, 100.0, 100.0, 0.05, 0.02, 0.25, 1.0).unwrap());
let put = bs_price(&OptionParams::new(
    OptionKind::Put, 100.0, 100.0, 0.05, 0.02, 0.25, 1.0).unwrap());
let parity = (call - put)
    - (100.0 * (-0.02_f64).exp() - 100.0 * (-0.05_f64).exp());
assert!(parity.abs() < 1e-14);`}
          language="rust"
          filename="examples/usage.rs"
          className="mt-4"
        />
      </section>
    </div>
  );
}
