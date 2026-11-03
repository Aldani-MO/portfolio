import { setRequestLocale } from "next-intl/server";
import { PortfolioPage } from "@/components/PortfolioPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PortfolioPage locale={locale} contactEnabled={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)} />;
}
