/// <reference types="astro/client" />

declare global {
  interface Window {
    fathom?: {
      trackEvent: (eventName: string) => void;
      blockTrackingForMe: () => void;
      enableTrackingForMe: () => void;
    };
  }
}

export {};
