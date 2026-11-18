import { SITE_URL } from "@/lib/site-url";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import "../app/globals.css";

export const metadata: Metadata = {
  title: { default: "Mohamed Aldani | Full-Stack Developer", template: "%s | Mohamed Aldani" },
  description: "Junior full-stack developer based in Kuwait. Selected software projects, interactive demos, technical skills and professional experience.",
  authors: [{ name: "Mohamed Aldani", url: "https://github.com/Aldani-MO" }],
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1315" },
  ],
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
              jobTitle: "Full-Stack Developer",
              email: "mailto:Mohammedaldani03@gmail.com",
              address: { "@type": "PostalAddress", addressCountry: "KW" },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Princess Sumaya University of Technology",
              },
              knowsLanguage: ["Arabic", "English"],
              sameAs: [
                "https://github.com/Aldani-MO",
                "https://www.linkedin.com/in/Mohamed-Aldani",
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
