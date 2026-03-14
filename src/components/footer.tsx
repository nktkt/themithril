import type { Dictionary } from "@/i18n/get-dictionary";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-[var(--color-muted)]">
        <p>{dict.footer.built_with}</p>
        <p className="mt-1">
          <a
            href="https://github.com/nktkt/euro-option-pricer"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            {dict.footer.source}
          </a>
        </p>
      </div>
    </footer>
  );
}
