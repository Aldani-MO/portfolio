import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "../app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mohamed Aldani — Full-Stack Developer",
    template: "%s | Mohamed Aldani",
  },
  description:
    "Full-stack developer based in Kuwait & Amman. Builder of transit systems, security tools, and real-world software. B.S. Computer Science, PSUT.",
  keywords: [
    "Mohamed Aldani",
    "Full Stack Developer",
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
    title: "Mohamed Aldani — Full-Stack Developer",
    description:
      "Full-stack developer based in Kuwait & Amman. Builder of transit systems, security tools, and real-world software.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Aldani — Full-Stack Developer",
    description:
      "Full-stack developer based in Kuwait & Amman. Builder of transit systems, security tools, and real-world software.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://mohamedaldani.dev"),
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
    <html lang={locale} dir={isAr ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed Aldani",
              url: "https://mohamedaldani.dev",
              jobTitle: "Full-Stack Developer",
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
