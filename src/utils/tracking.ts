import type { Locale } from './i18nRoutes';

/** Fiche Person d'Alex Turcotte sur son site personnel : founder et author y renvoient par ce même @id. */
export const PERSON_ID = 'https://www.alexturcotte.ca/#alex-turcotte';

/** Site personnel d'Alex Turcotte, dans la langue de la page. */
export const personalSiteUrl = (locale: Locale) => `https://www.alexturcotte.ca/${locale}/`;

/** Lien de prise de rendez-vous (Google Agenda), utilisé par tous les boutons « Planifier une rencontre ». */
export const MEETING_URL = 'https://calendar.app.google/jrWp3LMihMCr5qew7';

/** Canal d'un événement Fathom : la page où le clic a lieu. */
export type FathomChannel = 'Home' | 'PME' | 'Regulated Finance' | 'Other';

/**
 * Liste fermée des noms d'événements Fathom. Ne jamais renommer un nom déjà en production :
 * Fathom traiterait le nouveau nom comme un autre événement et l'historique serait coupé.
 */
export type FathomEvent =
  | `Meeting Clicked | ${FathomChannel}`
  | 'Email Clicked'
  | 'Phone Clicked'
  | 'LinkedIn Clicked'
  | 'Personal Site Clicked'
  | 'Service Page Clicked | PME'
  | 'Service Page Clicked | Regulated Finance'
  | '404 Viewed';

/** Canal selon le chemin de la page : accueil, page de service PME, page de service Finance réglementée, ou autre. */
export function fathomChannel(pathname: string): FathomChannel {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (path === '/fr/' || path === '/en/') return 'Home';
  if (path === '/fr/services/pme/' || path === '/en/services/sme/') return 'PME';
  if (path === '/fr/services/finance-reglementee/' || path === '/en/services/regulated-finance/') return 'Regulated Finance';
  return 'Other';
}

/** Événement des boutons « Planifier une rencontre », selon la page du clic. */
export const meetingEvent = (pathname: string): FathomEvent => `Meeting Clicked | ${fathomChannel(pathname)}`;
