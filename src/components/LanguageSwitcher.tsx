"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  const items = routing.locales.map((l) => ({
    locale: l,
    label: t(`languages.${l}`),
  }));

  return (
    <li>
      <details>
        <summary>
          <FontAwesomeIcon icon={faGlobe} className="mr-2" />
          {t('common.language')}
        </summary>
        <ul>
          {items.map((item) => (
            <li key={item.locale}>
              <Link
                href={pathname}
                locale={item.locale}
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
