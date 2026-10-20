// EMAIL PROTECTION SCRIPT
(function () {
  // Liens courriel : <a data-email-link><span data-user data-domain data-tld>…</span></a>
  document.querySelectorAll("a[data-email-link]").forEach(function (a) {
    const span = a.querySelector("span[data-user]");
    if (!span) return;
    const email = span.dataset.user + "@" + span.dataset.domain + "." + span.dataset.tld;
    a.textContent = email;
    a.href = "mailto:" + email;
  });

  function wirePhone(selector) {
    const slots = document.querySelectorAll(selector);
    if (!slots.length) return;

    const area = "514";
    const mid = "316";
    const last = "7743";
    const phoneDisplay = area + "-" + mid + "-" + last;
    const phoneHref = "+1" + area + mid + last;
    const isFrench = document.documentElement.lang.toLowerCase().startsWith("fr");
    const labelPrefix = isFrench ? "Appeler " : "Call ";

    slots.forEach(function (slot) {
      const link = document.createElement("a");
      link.href = "tel:" + phoneHref;
      link.textContent = phoneDisplay;
      link.setAttribute("aria-label", labelPrefix + phoneDisplay);
      if (slot.dataset.fathomEvent) link.dataset.fathomEvent = slot.dataset.fathomEvent;
      if (slot.className && slot.className !== "phone-secure") link.className = slot.className.replace("phone-secure", "").trim();
      slot.replaceWith(link);
    });
  }

  wirePhone(".phone-secure");
})();

// FATHOM : un seul mécanisme, l'attribut data-fathom-event (noms fermés : voir src/utils/tracking.ts).
// Le script Fathom est chargé en defer : les appels qui ne suivent pas un clic attendent l'événement load.
(function () {
  function track(name) {
    try {
      if (window.fathom && typeof window.fathom.trackEvent === "function") {
        window.fathom.trackEvent(name);
      }
    } catch (error) {
      console.warn("Fathom event failed:", error);
    }
  }

  // Clics : l'écouteur délégué ne bloque pas la navigation (target=_blank reste natif).
  document.addEventListener("click", function (event) {
    const el = event.target.closest && event.target.closest("[data-fathom-event]");
    if (el) track(el.dataset.fathomEvent);
  });

  window.addEventListener("load", function () {
    // Vues : ex. « 404 Viewed », une fois par chargement.
    document.querySelectorAll("[data-fathom-view]").forEach(function (el) {
      track(el.dataset.fathomView);
    });

    // ?fathom=off exclut ce navigateur des statistiques ; ?fathom=on le réinclut.
    const url = new URL(window.location.href);
    const mode = url.searchParams.get("fathom");
    if (mode !== "off" && mode !== "on") return;
    try {
      if (mode === "off") window.fathom.blockTrackingForMe();
      else window.fathom.enableTrackingForMe();
      console.info(mode === "off" ? "Fathom : suivi désactivé pour ce navigateur." : "Fathom : suivi réactivé pour ce navigateur.");
    } catch (error) {
      console.warn("Fathom tracking toggle failed:", error);
    }
    url.searchParams.delete("fathom");
    history.replaceState(history.state, "", url.pathname + url.search + url.hash);
  });
})();

// YEAR INJECTION SCRIPT
(function () {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

// ACCORDION SCRIPT
(function () {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      item.classList.toggle('open');
      this.setAttribute('aria-expanded', !isOpen);
    });
  });
})();
