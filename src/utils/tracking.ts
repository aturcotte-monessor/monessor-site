import type { Locale } from './i18nRoutes';

/** Lien de prise de rendez-vous (Google Agenda), utilisé par tous les boutons « Planifier une rencontre ». */
export const MEETING_URL = 'https://calendar.app.google/jrWp3LMihMCr5qew7';

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
  action: 'ScheduleMeeting' | 'Email' | 'Phone' | 'LinkedIn',
  placement: string,
  locale: Locale,
  pathname: string
): string {
  return `Click ${action} ${placement} [${locale.toUpperCase()}] ${pageKey(pathname)}`;
}
