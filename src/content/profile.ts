export type LocalizedText = { en: string; ar: string };

// Only add details Mohamed has supplied for public display.
export const personalDetails: Record<"birth" | "nationality" | "residence" | "residency", LocalizedText | null> = {
  birth: { en: "Born and raised in Kuwait", ar: "وُلدت ونشأت في الكويت" },
  nationality: { en: "Syrian and Lebanese", ar: "سوري ولبناني" },
  residence: { en: "Salmiya, Kuwait", ar: "السالمية، الكويت" },
  residency: { en: "Family residence permit", ar: "إقامة التحاق بعائل" },
};

export interface Certificate {
  id: string;
  name: LocalizedText;
  issuer: LocalizedText;
  date?: string; // ISO YYYY-MM or YYYY-MM-DD, as shown on the certificate.
  credentialUrl?: string;
}

export const certificates: Certificate[] = [];
