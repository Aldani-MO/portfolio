import { SITE_URL } from "@/lib/site-url";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "../app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mohamed Aldani | Software Engineer",
    template: "%s | Mohamed Aldani",
  },
  description:
    "Software engineer in Salmiya, Kuwait. Web and mobile applications, transit systems and URL analysis tools.",
  keywords: [
    "Mohamed Aldani",
    "Software Engineer",
    "Flutter",
    "Firebase",
    "React",
    "Python",
    "Kuwait",
    "Amman",
    "PSUT",
  ],
  authors: [{ name: "Mohamed Aldani", url: "https://github.com/Aldani-MO" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_KW",
    siteName: "Mohamed Aldani",
    title: "Mohamed Aldani | Software Engineer",
    description:
      "Software engineer in Salmiya, Kuwait. Selected projects in web, mobile, transit and security.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Aldani | Software Engineer",
    description:
      "Software engineer in Salmiya, Kuwait. Selected projects in web, mobile, transit and security.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isAr = locale === "ar";

  return (
    <html lang={locale} dir={isAr ? "rtl" : "ltr"} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved;
                try { saved = localStorage.getItem('portfolio-theme'); } catch(e) {}
                var theme = saved === 'light' || saved === 'dark' ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed Aldani",
              url: SITE_URL,
              jobTitle: "Software Engineer",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Princess Sumaya University of Technology",
              },
              knowsLanguage: ["Arabic", "English"],
              sameAs: [
                "https://github.com/Aldani-MO",
                "https://linkedin.com/in/Mohamed-Aldani",
              ],
            }),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
