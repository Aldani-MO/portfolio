import type { L } from "@/content/portfolio";

export interface Repo { name: string; url: string; language: string | null; pushedAt: string; description: L | null }

// Curated bilingual descriptions; unknown repos fall back to their GitHub description.
const NOTES: Record<string, L> = {
  "smart-dynamic-bus-system": { en: "Flutter and Firebase transit app with a Python YOLOv8n edge module.", ar: "تطبيق نقل بـ Flutter وFirebase مع وحدة Python تعمل بنموذج YOLOv8n." },
  "phish-Checker": { en: "Python CLI that scores phishing risk in URLs and explains each finding.", ar: "أداة Python تقيّم خطورة التصيّد في الروابط وتشرح كل نتيجة." },
  portfolio: { en: "This site: Next.js, TypeScript, English and Arabic, tested with Playwright.", ar: "هذا الموقع: Next.js وTypeScript بالعربية والإنجليزية، ومختبر بـ Playwright." },
  webmana_bot: { en: "CodeIgniter 4 prototype for a shared WhatsApp, Messenger and Instagram inbox.", ar: "نموذج أولي بـ CodeIgniter 4 لصندوق رسائل مشترك لواتساب وماسنجر وإنستغرام." },
  "git-workshop": { en: "Practice repository from a GDG Git workshop.", ar: "مستودع تدريبي من ورشة Git لدى GDG." },
};

/** Public, non-fork repositories, most recently pushed first. Returns [] on any failure so the section hides. */
export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch("https://api.github.com/users/Aldani-MO/repos?sort=pushed&per_page=20", {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return [];
    const data: { name: string; html_url: string; language: string | null; pushed_at: string; description: string | null; fork: boolean; private: boolean }[] = await res.json();
    return data
      .filter(r => !r.fork && !r.private)
      .slice(0, 6)
      .map(r => ({
        name: r.name, url: r.html_url, language: r.language, pushedAt: r.pushed_at,
        description: NOTES[r.name] ?? (r.description ? { en: r.description, ar: r.description } : null),
      }));
  } catch {
    return [];
  }
}
