import type { Locale } from './i18nRoutes';

/** Fiche Person d'Alex Turcotte sur son site personnel : founder et author y renvoient par ce même @id. */
export const PERSON_ID = 'https://www.alexturcotte.ca/#alex-turcotte';

/** Site personnel d'Alex Turcotte, dans la langue de la page. */
export const personalSiteUrl = (locale: Locale) => `https://www.alexturcotte.ca/${locale}/`;

/**
 * Pages de réservation Google Agenda, une par langue : le paramètre `hl` affiche la page
 * dans la langue choisie sur le site. Utilisées par tous les boutons « Réserver un appel sans frais ».
 */
const MEETING_URLS: Record<Locale, string> = {
  fr: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ12guuUf6NTLTo3lnRV2OCaVmg5Qh2sHayis80_G58etvsjyrlo3Mj8tvWK2CZLwALWHgKF9hZU?hl=fr',
  en: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2OVRYNSi3GPZ8ifzyFf0zvEgcdnXLMpJg85pDLRTBTFH3h-oT0XXRTbyQeiZTBKkoulVzbfJI8?hl=en'
};

/** Lien de réservation dans la langue de la page. */
export const meetingUrl = (locale: Locale) => MEETING_URLS[locale];

/** Libellé du bouton de réservation dans la langue de la page. */
export const meetingLabel = (locale: Locale) => (locale === 'fr' ? 'Réserver un appel sans frais' : 'Book a free call');

/**
 * Clé de page stable pour les événements Fathom : chemin sans préfixe de langue ni barres obliques.
 * `/fr/` et `/en/` → `home` ; `/en/services/sme/` → `services/sme`.
 */
export function pageKey(pathname: string): string {
  const key = pathname.replace(/^\/(fr|en)(\/|$)/, '/').replace(/^\/+|\/+$/g, '');
  return key === '' ? 'home' : key;
}

/**
 * Nom d'événement Fathom distinct par action, emplacement, langue et page.
 * Ex. : `Click ScheduleMeeting Header [FR] services/pme`.
 */
export function fathomEvent(
  action: 'ScheduleMeeting' | 'Email' | 'Phone' | 'LinkedIn' | 'PersonalSite',
  placement: string,
  locale: Locale,
  pathname: string
): string {
  return `Click ${action} ${placement} [${locale.toUpperCase()}] ${pageKey(pathname)}`;
}
