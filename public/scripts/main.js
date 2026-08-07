// EMAIL PROTECTION SCRIPT
(function () {
  function wireEmail(anchorId) {
    const a = document.getElementById(anchorId);
    if (!a) return null;

    const span = a.querySelector("span");
    if (!span) return null;

    const user = span.dataset.user;
    const domain = span.dataset.domain;
    const tld = span.dataset.tld;

    const email = user + "@" + domain + "." + tld;

    a.textContent = email;
    a.href = "mailto:" + email;

    return email;
  }

  // 1) Email link in About section (id="email-link")
  const emailFromAbout = wireEmail("email-link");

  // 2) Email link in Contact section (id="email-link-2")
  const emailFromContact = wireEmail("email-link-2");

  // 3) "Send an email" / "Écrire un courriel" button (id="email-button")
  const btn = document.getElementById("email-button");
  const email = emailFromContact || emailFromAbout;
  if (btn && email) {
    btn.href = "mailto:" + email;
  }

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
      slot.replaceWith(link);
    });
  }

  wirePhone(".phone-secure");
})();

// YEAR INJECTION SCRIPT
(function () {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

// NAV TOGGLE SCRIPT
(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  function closeNav() {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openNav() {
    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', function (e) {
    const isOpen = nav.classList.contains('nav-open');
    if (isOpen) closeNav(); else openNav();
  });

  // close when clicking a link
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && nav.classList.contains('nav-open')) {
      closeNav();
    }
  });

  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
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
