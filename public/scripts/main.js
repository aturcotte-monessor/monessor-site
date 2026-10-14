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

// FATHOM : clics courriel, téléphone et LinkedIn (attribut data-fathom-event)
(function () {
  document.addEventListener("click", function (event) {
    const el = event.target.closest && event.target.closest("[data-fathom-event]");
    if (!el) return;
    try {
      if (window.fathom && typeof window.fathom.trackEvent === "function") {
        window.fathom.trackEvent(el.dataset.fathomEvent);
      }
    } catch (error) {
      console.warn("Fathom event failed:", error);
    }
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
