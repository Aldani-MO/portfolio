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
  const title = isAr ? "محمد الضاني | مهندس برمجيات" : "Mohamed Aldani | Software Engineer";
  const description = isAr
    ? "مهندس برمجيات مقيم في السالمية، الكويت. مشاريع في تطبيقات الويب والموبايل وأنظمة النقل وأدوات فحص الروابط."
    : "Software engineer in Salmiya, Kuwait. Selected projects in web, mobile, transit and URL analysis.";

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title, description, url: `${SITE_URL}/${locale}`,
      locale: isAr ? "ar_KW" : "en_US", alternateLocale: isAr ? "en_US" : "ar_KW",
      type: "website", siteName: "Mohamed Aldani",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: { title, description, card: "summary_large_image", images: [`${SITE_URL}/opengraph-image`] },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
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
