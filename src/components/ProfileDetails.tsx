import { certificates, personalDetails } from "@/content/profile";

export function PersonalDetails({ locale }: { locale: "en" | "ar" }) {
  const isAr = locale === "ar";
  const labels = {
    birth: isAr ? "الميلاد والنشأة" : "Born and raised",
    nationality: isAr ? "الجنسية" : "Nationality",
    residence: isAr ? "الإقامة" : "Residence",
    residency: isAr ? "نوع الإقامة" : "Residence permit",
  };
  return (
    <section className="personal-details" id="personal" aria-labelledby="personal-heading">
      <h3 id="personal-heading">{isAr ? "معلومات شخصية" : "Personal details"}</h3>
      <dl className="profile-list">
        {(Object.keys(labels) as (keyof typeof labels)[]).map(key => (
          <div key={key}>
            <dt>{labels[key]}</dt>
            <dd>{personalDetails[key]?.[locale] ?? (isAr ? "لم تُضف بعد" : "Not added yet")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Certificates({ locale }: { locale: "en" | "ar" }) {
  const isAr = locale === "ar";
  return (
    <section className="station" id="certificates" aria-labelledby="certificates-heading">
      <div className="station-header">
        <span className="station-id">{isAr ? "المحطة 05" : "STOP 05"}</span>
        <h2 className="station-name" id="certificates-heading">{isAr ? "الشهادات" : "Certificates"}</h2>
      </div>
      {certificates.length ? (
        <ul className="certificate-list">
          {certificates.map(certificate => (
            <li key={certificate.id}>
              <div><h3>{certificate.name[locale]}</h3><p>{certificate.issuer[locale]}</p></div>
              {certificate.date && <time dateTime={certificate.date} dir="ltr">{certificate.date}</time>}
              {certificate.credentialUrl && /^https:\/\//i.test(certificate.credentialUrl) && (
                <a className="text-link" href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">{isAr ? "عرض الشهادة" : "View credential"} ↗</a>
              )}
            </li>
          ))}
        </ul>
      ) : <p className="section-note">{isAr ? "تفاصيل الشهادات ستُضاف هنا." : "Certificate details will be added here."}</p>}
    </section>
  );
}
