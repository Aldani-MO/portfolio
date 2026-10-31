import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "محمد الضاني — مطوّر متكامل"
      : "Mohamed Aldani — Full-Stack Developer",
    description: isAr
      ? "مطوّر متكامل في الكويت وعمّان. بانٍ لأنظمة النقل وأدوات الأمن والبرمجيات الواقعية."
      : "Full-stack developer based in Kuwait & Amman. Builder of transit systems, security tools, and real-world software.",
    alternates: {
      canonical: `https://mohamedaldani.dev/${locale}`,
      languages: {
        en: "https://mohamedaldani.dev/en",
        ar: "https://mohamedaldani.dev/ar",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }
  return <>{children}</>;
}
