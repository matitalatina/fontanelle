"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, useLocale } from "@/i18n/I18nProvider";
import { localizedPath } from "@/i18n/navigation";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function getPathWithoutLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) {
    return "/";
  }

  const first = parts[0];
  if ((SUPPORTED_LOCALES as readonly string[]).includes(first)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useI18n();
  const path = getPathWithoutLocale(pathname);

  const items: Array<{ locale: Locale; label: string }> = [
    { locale: "it", label: t.languages.it },
    { locale: "en", label: t.languages.en },
  ];

  return (
    <li>
      <details>
        <summary>
          <FontAwesomeIcon icon={faGlobe} className="mr-2" />
          {t.common.language}
        </summary>
        <ul>
          {items.map((item) => (
            <li key={item.locale}>
              <Link
                href={localizedPath(item.locale, path)}
                className={locale === item.locale ? "menu-active" : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}
