import { SITE_URL } from "@/lib/site-url";
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
  const title = isAr ? "محمد الضاني | مطوّر Full-Stack" : "Mohamed Aldani | Full-Stack Developer";
  const description = isAr
    ? "مطوّر Full-Stack حديث التخرّج مقيم في الكويت. مشاريع مختارة مع تجارب تفاعلية، والمهارات التقنية، والخبرة العملية، والشهادات."
    : "Junior full-stack developer based in Kuwait. Selected software projects with interactive demos, technical skills, experience and certificates.";

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title, description, url: `${SITE_URL}/${locale}`,
      locale: isAr ? "ar_KW" : "en_US", alternateLocale: isAr ? "en_US" : "ar_KW",
      type: "website", siteName: "Mohamed Aldani",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: isAr ? "محمد الضاني، مطوّر Full-Stack" : "Mohamed Aldani, junior full-stack developer" }],
    },
    twitter: { title, description, card: "summary_large_image", images: [`${SITE_URL}/opengraph-image`] },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
        "x-default": `${SITE_URL}/en`,
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
