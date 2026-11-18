// Single source for page copy. Every claim here is backed by a repository, the CV,
// a credential page, or the owner's brief. Do not add metrics or roles without proof.
export type L = { en: string; ar: string };
export type Locale = keyof L;

export const EMAIL = "Mohammedaldani03@gmail.com";
export const GITHUB = "https://github.com/Aldani-MO";
export const LINKEDIN = "https://www.linkedin.com/in/mohamed-aldani-5b18992a1";
export const CV = "/cv.pdf";

export const hero = {
  name: { en: "Mohamed\nAldani", ar: "محمد\nالضاني" },
  role: { en: "Junior full-stack developer", ar: "مطوّر Full-Stack حديث التخرّج" },
  lede: {
    en: "I’m a Computer Science graduate and software developer with hands-on experience in web and mobile development through my projects and internships. I’m skilled in using AI tools and agents efficiently, with a focus on token efficiency, faster development, and improving code quality.",
    ar: "خريج علوم حاسوب ومطوّر برمجيات، لدي خبرة عملية اكتسبتها من خلال مشاريعي وتدريبي في تطوير تطبيقات الويب والموبايل. أتميز باستخدام أدوات ووكلاء الذكاء الاصطناعي (AI Agents) بكفاءة، مع التركيز على ترشيد استهلاك التوكنز (Token Efficiency)، تسريع التطوير، وتحسين جودة الكود.",
  },
  facts: [
    { k: { en: "Degree", ar: "الشهادة" }, v: { en: "BSc Computer Science, PSUT, 2026", ar: "بكالوريوس علوم الحاسوب، PSUT، 2026" } },
    { k: { en: "Based in", ar: "مكان الإقامة" }, v: { en: "Kuwait, with valid residency", ar: "الكويت، بإقامة سارية" } },
    { k: { en: "Looking for", ar: "أبحث عن" }, v: { en: "Junior software, full-stack or IT roles", ar: "وظائف للمبتدئين في البرمجة أو Full-Stack أو تقنية المعلومات" } },
    { k: { en: "Languages", ar: "اللغات" }, v: { en: "Arabic (native), English (fluent)", ar: "العربية (الأم)، الإنجليزية (بطلاقة)" } },
  ],
  primary: { en: "View projects", ar: "عرض المشاريع" },
  cv: { en: "Download CV", ar: "تحميل السيرة الذاتية" },
  email: { en: "Email me", ar: "راسلني" },
  board: { en: "Selected work", ar: "أعمال مختارة" },
  status: { en: "Open to junior roles · Kuwait", ar: "متاح لوظائف المبتدئين · الكويت" },
};

export const board = [
  { id: "project-sdbs", n: "1", title: { en: "Smart Dynamic Bus System", ar: "نظام الحافلات الذكي" }, stack: "Flutter · Firebase · Python", status: { en: "Case study + simulation", ar: "دراسة حالة ومحاكاة" }, blurb: { en: "Stop, skip or leave early: live decisions from QR check-ins and an on-bus YOLOv8n count.", ar: "توقّف أو تخطَّ أو انطلق مبكراً: قرارات لحظية من تسجيل الركاب وعدّهم بـ YOLOv8n." } },
  { id: "project-phish", n: "2", title: { en: "Phish Checker", ar: "فاحص روابط التصيّد" }, stack: "Python · Docker", status: { en: "Try it in the browser", ar: "جرّبه في المتصفح" }, blurb: { en: "Scores a URL from 0 to 100 for phishing risk and explains every point.", ar: "يعطي الرابط درجة خطورة من 0 إلى 100 ويشرح سبب كل نقطة." } },
  { id: "project-pharmacy", n: "3", title: { en: "Pharmacy Management System", ar: "نظام إدارة الصيدلية" }, stack: "C++ · OOP", status: { en: "Academic project", ar: "مشروع جامعي" }, blurb: { en: "Medicines, stock, sales and customer records, built on classes and custom data structures.", ar: "الأدوية والمخزون والمبيعات وسجلات العملاء، مبني على الأصناف وهياكل بيانات مخصصة." } },
];

export const sections = {
  work: { en: "Selected work", ar: "أعمال مختارة" },
  experience: { en: "Experience", ar: "الخبرة العملية" },
  skills: { en: "Skills", ar: "المهارات" },
  education: { en: "Education", ar: "التعليم" },
  certificates: { en: "Certificates", ar: "الشهادات" },  contact: { en: "Contact", ar: "تواصل" },
};

export const sdbs = {
  title: { en: "Smart Dynamic Bus System", ar: "نظام الحافلات الذكي الديناميكي" },
  summary: {
    en: "Fixed-route buses usually stop at every station, whether anyone is waiting or not. SDBS gives the driver a live recommendation for each stop: stop, skip or leave early, based on how many passengers checked in at the stop and how full the bus is.",
    ar: "تتوقف حافلات الخطوط الثابتة عادةً في كل محطة، سواء كان هناك ركاب ينتظرون أم لا. يعطي النظام السائق توصية لحظية لكل محطة: التوقف أو التخطي أو الانطلاق المبكر، بناءً على عدد الركاب المسجّلين في المحطة ومدى امتلاء الحافلة.",
  },
  meta: [
    { k: { en: "Context", ar: "السياق" }, v: { en: "PSUT graduation project, team of three, graded A+", ar: "مشروع تخرّج في PSUT، فريق من ثلاثة، بتقدير A+" } },
    { k: { en: "Apps", ar: "التطبيقات" }, v: { en: "One Flutter app with passenger, driver and admin roles", ar: "تطبيق Flutter واحد بثلاثة أدوار: راكب وسائق ومشرف" } },
    { k: { en: "Stack", ar: "التقنيات" }, v: { en: "Flutter, Dart, Firebase Auth, Cloud Firestore, Python, OpenCV, YOLOv8n, SQLite, Raspberry Pi", ar: "Flutter، Dart، Firebase Auth، Cloud Firestore، Python، OpenCV، YOLOv8n، SQLite، Raspberry Pi" } },
  ],
  repo: "https://github.com/Aldani-MO/smart-dynamic-bus-system",
  shots: [
    { src: "/work/sdbs/driver-decision.png", w: 978, h: 897, wide: true, cap: { en: "Driver view: the next stop has 10 check-ins against a threshold of 10, so the app recommends leaving early.", ar: "شاشة السائق: في المحطة التالية 10 ركاب مسجّلين والحد 10، فيوصي التطبيق بالانطلاق المبكر." } },
    { src: "/work/sdbs/passenger-home.png", w: 356, h: 791, cap: { en: "Passenger home with live occupancy", ar: "الصفحة الرئيسية للراكب مع الإشغال المباشر" } },
    { src: "/work/sdbs/qr-checkin.png", w: 359, h: 791, cap: { en: "QR check-in at a stop", ar: "تسجيل الوصول إلى المحطة برمز QR" } },
    { src: "/work/sdbs/fleet-dashboard.png", w: 335, h: 751, cap: { en: "Admin fleet view", ar: "لوحة الأسطول للمشرف" } },
    { src: "/work/sdbs/analytics.png", w: 342, h: 760, cap: { en: "Decision analytics", ar: "تحليلات القرارات" } },
  ],
  flowTitle: { en: "How the pieces connect", ar: "كيف تترابط أجزاء النظام" },
  flow: [
    { t: { en: "On the bus", ar: "داخل الحافلة" }, d: { en: "A Python module on a Raspberry Pi reads the camera with OpenCV and counts passengers with YOLOv8n. If the connection drops, readings wait in an SQLite queue and upload when it returns.", ar: "وحدة Python على Raspberry Pi تقرأ الكاميرا عبر OpenCV وتعدّ الركاب باستخدام YOLOv8n. إذا انقطع الاتصال تُحفظ القراءات في طابور SQLite وتُرفع عند عودته." } },
    { t: { en: "In Firestore", ar: "في Firestore" }, d: { en: "The count updates the bus's current occupancy. Stop check-ins, trips and every decision live in Firestore; decisions are appended to a stopDecisions log, and security rules limit what each role can write.", ar: "يحدّث العدد إشغال الحافلة الحالي. تُخزَّن عمليات التسجيل في المحطات والرحلات وكل القرارات في Firestore، وتُضاف القرارات إلى سجل stopDecisions، وتحدّد قواعد الأمان ما يستطيع كل دور كتابته." } },
    { t: { en: "In the app", ar: "في التطبيق" }, d: { en: "Passengers check in by QR, follow occupancy, top up a wallet and get alerts when a bus skips or leaves early. Drivers see the next-stop decision. Admins manage stops, routes, trips and users, and review decision analytics.", ar: "يسجّل الراكب وصوله برمز QR ويتابع الإشغال ويشحن محفظته ويتلقى تنبيهاً عند تخطّي الحافلة أو انطلاقها مبكراً. يرى السائق قرار المحطة التالية. ويدير المشرف المحطات والخطوط والرحلات والمستخدمين ويراجع تحليلات القرارات." } },
  ],
  rulesTitle: { en: "Decision rules, checked in order", ar: "قواعد القرار، تُفحص بالترتيب" },
  rules: [
    { if: { en: "Nobody has checked in", ar: "لا يوجد ركاب مسجّلون" }, then: "SKIP" },
    { if: { en: "The bus is full", ar: "الحافلة ممتلئة" }, then: "SKIP" },
    { if: { en: "More people waiting than free seats", ar: "المنتظرون أكثر من المقاعد المتاحة" }, then: "STOP" },
    { if: { en: "Waiting count reaches the stop's threshold", ar: "عدد المنتظرين يبلغ حد المحطة" }, then: "EARLY-DEPART" },
    { if: { en: "Anything else", ar: "أي حالة أخرى" }, then: "STOP" },
  ],
  demoTitle: { en: "Try the decision logic", ar: "جرّب منطق القرار" },
};

export const decisionLabel: Record<string, L> = {
  STOP: { en: "Stop", ar: "توقّف" },
  SKIP: { en: "Skip", ar: "تخطَّ المحطة" },
  "EARLY-DEPART": { en: "Leave early", ar: "انطلق مبكراً" },
};

export const phish = {
  title: { en: "Phish Checker", ar: "فاحص روابط التصيّد" },
  summary: {
    en: "A Python command-line tool that scores a URL from 0 to 100 for phishing risk and explains every point: missing HTTPS, raw IP hosts, URL shorteners, suspicious TLDs, look-alike characters and brand names on the wrong domain. It runs the same way on Windows, WSL or in Docker.",
    ar: "أداة سطر أوامر بلغة Python تعطي الرابط درجة خطورة من 0 إلى 100 وتشرح سبب كل نقطة: غياب HTTPS، أو استخدام عنوان IP مباشر، أو اختصار الروابط، أو نطاقات علوية مشبوهة، أو أحرف متشابهة، أو اسم علامة تجارية على نطاق غير تابع لها. وتعمل بالطريقة نفسها على Windows أو WSL أو داخل Docker.",
  },
  stack: "Python · Docker · Linux (WSL)",
  repo: "https://github.com/Aldani-MO/phish-Checker",
  shot: { src: "/work/phish/cli-output.png", w: 933, h: 215, cap: { en: "The original CLI scoring a look-alike PayPal URL", ar: "الأداة الأصلية تفحص رابطاً ينتحل اسم PayPal" } },
  demoTitle: { en: "Try it here", ar: "جرّبه هنا" },
};

export const pharmacy = {
  title: { en: "Pharmacy Management System", ar: "نظام إدارة الصيدلية" },
  summary: {
    en: "A C++ console application for a pharmacy's medicines, stock, sales and customer records, written around classes and custom data structures for a university course.",
    ar: "تطبيق C++ لإدارة الأدوية والمخزون والمبيعات وسجلات العملاء في صيدلية، مبني على الأصناف (Classes) وهياكل بيانات مخصصة ضمن مقرر جامعي.",
  },
  stack: "C++ · OOP · Data structures",
  points: [
    { en: "Medicine and inventory records", ar: "سجلات الأدوية والمخزون" },
    { en: "Sales and billing", ar: "المبيعات والفواتير" },
    { en: "Customer ledger", ar: "سجل العملاء" },
  ],
  note: { en: "Academic project. The source is not public.", ar: "مشروع جامعي، والكود غير منشور للعامة." },
};

export const experience = [
  {
    period: { en: "May – Aug 2026", ar: "مايو – أغسطس 2026" },
    role: { en: "Full Stack Developer Intern", ar: "متدرب تطوير Full-Stack" },
    org: { en: "DigiTecHouse · Amman, Jordan", ar: "DigiTecHouse · عمّان، الأردن" },
    stack: "PHP · CodeIgniter 4 · Bootstrap 5 · JavaScript",
    points: [
      { en: "Built and maintained features in PHP with CodeIgniter 4, across controllers, models and views.", ar: "بنيت ميزات وصنتها بـ PHP وإطار CodeIgniter 4، على مستوى المتحكمات والنماذج والواجهات." },
      { en: "Built responsive pages with Bootstrap 5 and JavaScript that work on phones and desktops.", ar: "بنيت صفحات متجاوبة بـ Bootstrap 5 وJavaScript تعمل على الهواتف وأجهزة الحاسوب." },
      { en: "Integrated ContentBox.js so page content can be edited by drag and drop.", ar: "دمجت ContentBox.js لتحرير محتوى الصفحات بالسحب والإفلات." },
      { en: "Worked in a shared codebase with Git branches and peer review.", ar: "عملت ضمن فريق على مستودع مشترك باستخدام فروع Git ومراجعة الكود." },
    ],
  },
  {
    period: { en: "Jun – Oct 2023", ar: "يونيو – أكتوبر 2023" },
    role: { en: "IT Assistant Intern", ar: "متدرب مساعد تقنية معلومات" },
    org: { en: "Royal Pharmacy Group · Kuwait", ar: "Royal Pharmacy Group · الكويت" },
    stack: "Windows · Networking · Excel",
    points: [
      { en: "Set up and configured Windows computers and point-of-sale terminals for staff.", ar: "جهّزت أجهزة Windows ونقاط البيع وضبطت إعداداتها للموظفين." },
      { en: "Helped with server administration and firewall configuration.", ar: "ساعدت في إدارة الخوادم وضبط الجدار الناري." },
      { en: "Kept inventory data accurate in Excel.", ar: "حافظت على دقة بيانات المخزون في Excel." },
    ],
  },
];

export const skills = [
  { label: { en: "Web", ar: "الويب" }, items: "PHP, CodeIgniter 4, JavaScript, TypeScript, React, Next.js, HTML, CSS, Bootstrap 5, Tailwind CSS", used: { en: "DigiTecHouse, this site", ar: "DigiTecHouse، هذا الموقع" } },
  { label: { en: "Mobile and cloud", ar: "الموبايل والسحابة" }, items: "Flutter, Dart, Firebase Auth, Cloud Firestore", used: { en: "Smart Dynamic Bus System", ar: "نظام الحافلات الذكي" } },
  { label: { en: "Python and vision", ar: "Python والرؤية الحاسوبية" }, items: "Python, OpenCV, YOLOv8n, SQLite", used: { en: "SDBS edge module, Phish Checker", ar: "وحدة الحافلة في SDBS، فاحص الروابط" } },
  { label: { en: "Foundations", ar: "الأساسيات" }, items: "C++, OOP, data structures and algorithms, SQL, C, C#", used: { en: "PSUT coursework, pharmacy system", ar: "مقررات PSUT، نظام الصيدلية" } },
  { label: { en: "Tools", ar: "الأدوات" }, items: "Git, GitHub, Docker, Linux (Ubuntu, WSL), Vercel, Vitest, Playwright", used: { en: "Daily work, this site's tests", ar: "العمل اليومي، اختبارات هذا الموقع" } },
  { label: { en: "IT support", ar: "الدعم التقني" }, items: "Windows setup, POS terminals, server and firewall support, Excel", used: { en: "Royal Pharmacy Group", ar: "Royal Pharmacy Group" } },
];

export const skillsNote = {
  en: "I use AI coding assistants such as Claude Code and Codex for drafting and review, and I read and test what they produce.",
  ar: "أستخدم مساعدات البرمجة بالذكاء الاصطناعي مثل Claude Code وCodex في الصياغة والمراجعة، وأقرأ ما تنتجه وأختبره بنفسي.",
};

export const usedIn = { en: "Used in", ar: "استخدمتها في" };

export const education = {
  degree: { en: "BSc Computer Science", ar: "بكالوريوس علوم الحاسوب" },
  school: { en: "Princess Sumaya University for Technology", ar: "جامعة الأميرة سمية للتكنولوجيا" },
  where: { en: "Amman, Jordan · Oct 2022 – Aug 2026", ar: "عمّان، الأردن · أكتوبر 2022 – أغسطس 2026" },
  note: { en: "Degree recognised by Kuwait's Ministry of Higher Education.", ar: "الشهادة معترف بها من وزارة التعليم العالي في الكويت." },
  courseLabel: { en: "Relevant courses", ar: "مقررات ذات صلة" },
  courses: {
    en: "Data structures and algorithms, database systems, web programming, computer networks, operating systems, computer organization, OOP in C++",
    ar: "هياكل البيانات والخوارزميات، قواعد البيانات، برمجة الويب، شبكات الحاسوب، أنظمة التشغيل، تنظيم الحاسوب، البرمجة الكائنية بـ C++",
  },
  actLabel: { en: "Activities", ar: "الأنشطة" },
  activities: [
    { t: { en: "IEEE Xtreme 18.0", ar: "IEEE Xtreme 18.0" }, when: { en: "Nov 2024", ar: "نوفمبر 2024" }, d: { en: "Took part in the 24-hour online programming competition.", ar: "شاركت في مسابقة البرمجة الإلكترونية التي تستمر 24 ساعة." } },
    { t: { en: "Software Engineering Club, PSUT", ar: "نادي هندسة البرمجيات، PSUT" }, when: { en: "Nov 2024 – Feb 2025", ar: "نوفمبر 2024 – فبراير 2025" }, d: { en: "Committee member. Produced and edited video and visual media for events and workshops.", ar: "عضو في اللجنة. أنتجت وحرّرت المحتوى المرئي للفعاليات وورش العمل." } },
  ],
};

export interface Credential {
  id: string;
  title: string; // Exact title as printed by the issuer.
  issuer: L;
  kind: "certification" | "course" | "badge";
  issued: string; // ISO date from the certificate or credential page.
  validUntil?: string;
  context: L;
  url: string; // Issuer's verification page.
  image?: string; // Rendered from the issuer PDF, or the official badge artwork.
  preview?: boolean; // Image is the full certificate and can be opened as a preview.
}

export const credentials: Credential[] = [
  {
    id: "gce-l2", title: "Google Certified Educator Level 2", issuer: { en: "Google for Education", ar: "Google for Education" }, kind: "certification",
    issued: "2026-11-15", validUntil: "2029-11-15", image: "/credentials/gce-l2-cert.webp", preview: true,
    context: { en: "Advanced use of Google for Education tools.", ar: "استخدام متقدم لأدوات Google for Education." },
    url: "https://edu.google.accredible.com/38a8588b-126a-4d93-b151-46890b47a56a",
  },
  {
    id: "gce-l1", title: "Google Certified Educator Level 1", issuer: { en: "Google for Education", ar: "Google for Education" }, kind: "certification",
    issued: "2026-11-04", validUntil: "2029-11-04", image: "/credentials/gce-l1-cert.webp", preview: true,
    context: { en: "Core skills for using Google for Education tools.", ar: "المهارات الأساسية لاستخدام أدوات Google for Education." },
    url: "https://edu.google.accredible.com/0c1defee-735f-4004-ad16-a7f52e8cef0f",
  },
  {
    id: "gemini", title: "Gemini Certified Educator", issuer: { en: "Google for Education", ar: "Google for Education" }, kind: "certification",
    issued: "2026-11-03", validUntil: "2029-11-03", image: "/credentials/gemini-cert.webp", preview: true,
    context: { en: "Core skills for using Google AI in education.", ar: "المهارات الأساسية لاستخدام ذكاء Google الاصطناعي في التعليم." },
    url: "https://edu.google.accredible.com/1546b40b-7c6d-48d8-a94e-50dbd6549908",
  },
  {
    id: "ibm-net", title: "Introduction to Networking and Storage", issuer: { en: "IBM, through Coursera", ar: "IBM عبر Coursera" }, kind: "course",
    issued: "2026-04-03", image: "/credentials/ibm-networking-cert.webp", preview: true,
    context: { en: "Online course authorized by IBM: networking and storage fundamentals.", ar: "مقرر إلكتروني معتمد من IBM: أساسيات الشبكات والتخزين." },
    url: "https://coursera.org/verify/3E8EATG8Y8W8",
  },
  {
    id: "gemini-notebook", title: "Introduction to Gemini Notebook", issuer: { en: "Google for Education", ar: "Google for Education" }, kind: "badge",
    issued: "2026-11-03", image: "/credentials/gemini-notebook.png",
    context: { en: "Foundational badge in the Google AI Educator Series.", ar: "شارة تأسيسية ضمن سلسلة Google AI Educator." },
    url: "https://edu.google.accredible.com/2e65e0fe-77c9-4d16-bee7-9f0d46b440ea",
  },
];

export const credentialText = {
  lede: { en: "Each entry links to the issuer's own verification page.", ar: "كل شهادة مرتبطة بصفحة التحقق الرسمية لدى الجهة المانحة." },
  kinds: { certification: { en: "Certification", ar: "شهادة معتمدة" }, course: { en: "Course certificate", ar: "شهادة إتمام مقرر" }, badge: { en: "Badge", ar: "شارة" } },
  issued: { en: "Issued", ar: "صدرت" },
  valid: { en: "Valid to", ar: "سارية حتى" },
  verify: { en: "Verify", ar: "تحقّق" },
  view: { en: "View certificate", ar: "عرض الشهادة" },
};

export const contact = {
  lede: {
    en: "Email is the quickest way to reach me. I'm in Kuwait and open to junior software, full-stack and IT roles.",
    ar: "البريد الإلكتروني أسرع طريقة للتواصل معي. أقيم في الكويت ومنفتح على الوظائف المبتدئة في البرمجة وFull-Stack وتقنية المعلومات.",
  },
  links: [
    { k: "GitHub", v: "github.com/Aldani-MO", href: GITHUB },
    { k: "LinkedIn", v: "linkedin.com/in/mohamed-aldani-5b18992a1", href: LINKEDIN },
    { k: "CV", v: { en: "PDF, 1 page", ar: "ملف PDF، صفحة واحدة" }, href: CV },
  ],
};

export function fmtDate(iso: string, locale: Locale) {
  // Gregorian months with Latin digits, matching the issuer documents.
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-u-nu-latn-ca-gregory" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}
