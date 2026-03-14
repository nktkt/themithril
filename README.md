# Euro Option Pricer - Documentation Site

Documentation and landing page for the [Euro Option Pricer](https://github.com/nktkt/euro-option-pricer) engine.

Built with **Next.js 15**, **Tailwind CSS v4**, **Motion**, **Bun**, and deployable to **Cloudflare Workers**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | Tailwind CSS v4, Lucide icons |
| Animation | Motion (framer-motion successor) |
| Font | Noto Sans JP (via `next/font/google`) |
| Runtime | Bun |
| Deployment | Cloudflare Workers (`@cloudflare/next-on-pages`) |
| i18n | Custom dictionary-based (EN / JA) |

## Routes

| Path | Description |
|---|---|
| `/` | Redirects to `/{locale}` based on Accept-Language |
| `/{locale}` | Landing page (hero, features, comparison table, quickstart) |
| `/{locale}/docs` | Documentation overview with engine selection |
| `/{locale}/docs/cpp` | C++ engine docs (API reference, types, examples) |
| `/{locale}/docs/rust` | Rust engine docs (API reference, autodiff, examples) |

Supported locales: `en`, `ja`. Switch via the globe button in the header.

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server (Turbopack)
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Deploy to Cloudflare

```bash
# Build and preview locally
bun run pages:preview

# Deploy to Cloudflare Pages
bun run pages:deploy
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) to be authenticated (`wrangler login`).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (Noto Sans JP font)
│   ├── globals.css                # Tailwind + theme variables
│   └── [locale]/
│       ├── layout.tsx             # Locale layout (header + footer)
│       ├── page.tsx               # Landing page
│       └── docs/
│           ├── layout.tsx         # Docs layout (sidebar)
│           ├── page.tsx           # Docs overview
│           ├── cpp/page.tsx       # C++ engine documentation
│           └── rust/page.tsx      # Rust engine documentation
├── components/
│   ├── header.tsx                 # Navigation + locale switcher
│   ├── footer.tsx                 # Footer
│   ├── hero-section.tsx           # Animated hero with code preview
│   ├── features-section.tsx       # Feature grid (6 cards)
│   ├── comparison-section.tsx     # C++ vs Rust comparison table
│   ├── quickstart-section.tsx     # Tabbed code examples
│   ├── code-block.tsx             # Code block with copy button
│   └── docs-sidebar.tsx           # Docs sidebar navigation
├── i18n/
│   ├── config.ts                  # Locale definitions
│   ├── get-dictionary.ts          # Dictionary loader
│   └── dictionaries/
│       ├── en.json                # English translations
│       └── ja.json                # Japanese translations
├── lib/
│   └── utils.ts                   # cn() utility
└── middleware.ts                   # Locale detection + redirect
```

## License

MIT
