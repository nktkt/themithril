import Link from "next/link";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DocsSidebar } from "@/components/docs-sidebar";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="mx-auto flex max-w-6xl gap-0 px-6 py-8 lg:gap-10">
      <DocsSidebar locale={locale} dict={dict} />
      <article className="min-w-0 flex-1 pb-16">{children}</article>
    </div>
  );
}
