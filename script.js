/* Buildless portfolio: no runtime dependencies or external services. */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* Private browsing remains usable. */
      }
    },
  };
  let language = storage.get("portfolio-language") === "en" ? "en" : "fr";
  let theme = storage.get("portfolio-theme") === "dark" ? "dark" : "light";
  let projectFilter = "all";
  let allProjects = false;
  let destination = "all";
  let photoLimit = 8;
  let photoIndex = 0;
  let selectedProject = null;
  let toastTimer;
  let returnFocus = null;
  const t = (fr, en) => (language === "fr" ? fr : en);
  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const projectDialog = $("#project-dialog");
  const lightbox = $("#lightbox");
  const menu = $("#mobile-nav");
  const menuToggle = $(".menu-toggle");
  const category = (key) =>
    ({
      ai: t("Intelligence artificielle", "Artificial intelligence"),
      data: "Data engineering",
      software: t("Développement logiciel", "Software development"),
    })[key];

  function translate(root = document) {
    $$("[data-fr][data-en]", root).forEach((node) => {
      node.textContent = node.dataset[language];
    });
  }

  function applyTheme() {
    document.body.dataset.theme = theme;
    $(".theme-toggle").setAttribute("aria-pressed", String(theme === "dark"));
    $(".theme-toggle").setAttribute(
      "aria-label",
      theme === "dark"
        ? t("Activer le mode clair", "Enable light mode")
        : t("Activer le mode sombre", "Enable dark mode"),
    );
    $('meta[name="theme-color"]').content =
      theme === "dark" ? "#161617" : "#fafaf9";
  }

  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open
        ? t("Fermer le menu", "Close menu")
        : t("Ouvrir le menu", "Open menu"),
    );
    if (restoreFocus) menuToggle.focus();
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    translate();
    document.title = t(
      "Mehdi Robardet — IA & Développement",
      "Mehdi Robardet — AI & Software",
    );
    $('meta[name="description"]').content = t(
      "Mehdi Robardet — étudiant à l’EPITA, intelligence artificielle et développement logiciel. Projets, parcours et photographies de voyage.",
      "Mehdi Robardet — EPITA student, artificial intelligence and software engineering. Projects, experience, and travel photography.",
    );
    $(".language-toggle").textContent = language === "fr" ? "EN" : "FR";
    $(".language-toggle").setAttribute(
      "aria-label",
      t("Switch to English", "Passer en français"),
    );
    $("#project-search").placeholder = t(
      "Rechercher un projet",
      "Search projects",
    );
    $("#project-search").setAttribute(
      "aria-label",
      t("Rechercher un projet", "Search projects"),
    );
    $(".navigation").setAttribute(
      "aria-label",
      t("Navigation principale", "Main navigation"),
    );
    $(".navigation .wordmark").setAttribute(
      "aria-label",
      t("Mehdi Robardet — Accueil", "Mehdi Robardet — Home"),
    );
    $(".scroll-hint").setAttribute(
      "aria-label",
      t("Découvrir les projets", "Explore projects"),
    );
    $(".segmented-control").setAttribute(
      "aria-label",
      t("Filtrer les projets", "Filter projects"),
    );
    $(".photo-filters").setAttribute(
      "aria-label",
      t("Filtrer par destination", "Filter by destination"),
    );
    $(".journey-tabs").setAttribute("aria-label", t("Parcours", "Background"));
    $(".copy-email").setAttribute(
      "aria-label",
      t("Copier l’adresse email", "Copy email address"),
    );
    $(".lightbox-prev").setAttribute(
      "aria-label",
      t("Photo précédente", "Previous photo"),
    );
    $(".lightbox-next").setAttribute(
      "aria-label",
      t("Photo suivante", "Next photo"),
    );
    lightbox.setAttribute("aria-label", t("Visionneuse photo", "Photo viewer"));
    $$(".dialog-close").forEach((button) =>
      button.setAttribute("aria-label", t("Fermer", "Close")),
    );
    $$(".hero-specialties span")[0].textContent = t(
      "Intelligence artificielle",
      "Artificial intelligence",
    );
    $(".skill-card h3").textContent = t(
      "Intelligence artificielle",
      "Artificial intelligence",
    );
    setMenu(!menu.hidden);
    applyTheme();
    updateProjects();
    renderPhotos();
    if (projectDialog.open && selectedProject !== null)
      renderProjectDetail(selectedProject);
    if (lightbox.open) renderLightbox();
  }

  $(".language-toggle").addEventListener("click", () => {
    language = language === "fr" ? "en" : "fr";
    storage.set("portfolio-language", language);
    applyLanguage();
  });
  $(".theme-toggle").addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    storage.set("portfolio-theme", theme);
    applyTheme();
  });
  menuToggle.addEventListener("click", () => setMenu(menu.hidden));
  $$("a", menu).forEach((link) =>
    link.addEventListener("click", () => setMenu(false)),
  );
  document.addEventListener("click", (event) => {
    if (!menu.hidden && !$(".site-header").contains(event.target))
      setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) setMenu(false, true);
  });
  window
    .matchMedia("(min-width: 701px)")
    .addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });

  function updateProjects() {
    const query = normalize($("#project-search").value.trim());
    const matching = portfolioData.projects.filter((project) => {
      const text = project[language];
      return (
        (projectFilter === "all" || project.category === projectFilter) &&
        normalize(
          [text.title, text.meta, ...text.points, project.tech].join(" "),
        ).includes(query)
      );
    });
    const filtered = query !== "" || projectFilter !== "all";
    const ids = new Set(matching.map((project) => project.id));
    let visibleCount = 0;
    $$(".project-card").forEach((card) => {
      const matches = ids.has(Number(card.dataset.project));
      const visible = matches && (allProjects || filtered || visibleCount < 4);
      card.hidden = !visible;
      if (visible) visibleCount++;
      const project = portfolioData.projects[Number(card.dataset.project)];
      $("button", card).setAttribute(
        "aria-label",
        t("Découvrir le projet : ", "Explore project: ") +
          project[language].title,
      );
    });
    $(".empty-projects").hidden = matching.length > 0;
    $("#more-projects").hidden = filtered;
    $("#more-projects").setAttribute("aria-expanded", String(allProjects));
    $("#more-projects > span:first-child").textContent = allProjects
      ? t("Réduire la sélection", "Show fewer projects")
      : t("Voir tous les projets", "View all projects");
    $("#more-projects > span:last-child").textContent = allProjects ? "↑" : "↓";
  }
  $$("[data-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      projectFilter = button.dataset.filter;
      $$("[data-filter]").forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      updateProjects();
    }),
  );
  $("#project-search").addEventListener("input", updateProjects);
  $("#more-projects").addEventListener("click", () => {
    allProjects = !allProjects;
    updateProjects();
    if (!allProjects)
      $("#projets").scrollIntoView({
        behavior: motionBehavior(),
        block: "start",
      });
  });

  function openDialog(dialog) {
    returnFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add("modal-open");
    $(".dialog-close", dialog).focus({ preventScroll: true });
  }
  [projectDialog, lightbox].forEach((dialog) => {
    $(".dialog-close", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    });
    // Only the backdrop closes the project dialog; dragging from its content does not.
    let pressedOutside = false;
    const outside = (event) => {
      const bounds = dialog.getBoundingClientRect();
      return (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      );
    };
    dialog.addEventListener("pointerdown", (event) => {
      pressedOutside = outside(event);
    });
    dialog.addEventListener("click", (event) => {
      if (dialog === projectDialog && pressedOutside && outside(event))
        dialog.close();
    });
  });

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function renderProjectDetail(id) {
    const project = portfolioData.projects[id];
    const content = project[language];
    const detail = $("#project-detail");
    const title = node("h2", "", content.title);
    title.id = "dialog-title";
    const points = node("ul", "detail-points");
    content.points.forEach((point) => points.append(node("li", "", point)));
    detail.replaceChildren(
      node("p", "detail-category", category(project.category)),
      title,
      node("p", "detail-meta", content.meta),
      node("span", "detail-date", content.date),
      points,
    );
    if (project.url) {
      const link = node(
        "a",
        "button button-primary",
        t("Voir le projet sur GitHub ↗", "View project on GitHub ↗"),
      );
      link.href = project.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      detail.append(link);
    }
  }
  $$("[data-project-open]").forEach((button) =>
    button.addEventListener("click", () => {
      selectedProject = Number(button.dataset.projectOpen);
      renderProjectDetail(selectedProject);
      openDialog(projectDialog);
      projectDialog.scrollTop = 0;
    }),
  );

  const tabs = $$('.journey-tabs [role="tab"]');
  function selectTab(tab, focus = false) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      $("#" + item.getAttribute("aria-controls")).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) %
              tabs.length;
      selectTab(tabs[next], true);
    });
  });
  function followSectionHash() {
    if (location.hash === "#education" || location.hash === "#experience") {
      selectTab($("#tab-" + location.hash.slice(1)));
      $(location.hash).scrollIntoView({
        behavior: motionBehavior(),
        block: "start",
      });
    }
  }
  window.addEventListener("hashchange", followSectionHash);

  function filteredPhotos() {
    return portfolioData.photos.filter(
      (photo) => destination === "all" || photo.destination === destination,
    );
  }
  function renderPhotos() {
    const photos = filteredPhotos();
    const fragment = document.createDocumentFragment();
    photos.slice(0, photoLimit).forEach((photo, index) => {
      const button = node("button", "photo-card");
      button.type = "button";
      button.dataset.photoIndex = index;
      button.setAttribute(
        "aria-label",
        t("Agrandir : ", "Enlarge: ") +
          photo.alt[language] +
          " · " +
          photo.label[language] +
          ` (${index + 1}/${photos.length})`,
      );
      const img = node("img");
      img.src = photo.thumb;
      img.alt = photo.alt[language];
      img.width = photo.width;
      img.height = photo.height;
      img.loading = "lazy";
      img.decoding = "async";
      const label = node("span", "photo-label");
      label.append(
        node("span", "", photo.label[language]),
        node("span", "", "↗"),
      );
      label.setAttribute("aria-hidden", "true");
      button.append(img, label);
      button.addEventListener("click", () => {
        photoIndex = index;
        renderLightbox();
        openDialog(lightbox);
      });
      fragment.append(button);
    });
    $("#photo-grid").replaceChildren(fragment);
    $(".photo-count").textContent =
      `${Math.min(photoLimit, photos.length)} / ${photos.length} photos`;
    $("#more-photos").hidden = photoLimit >= photos.length;
  }
  $$("[data-destination]").forEach((button) =>
    button.addEventListener("click", () => {
      destination = button.dataset.destination;
      photoLimit = 8;
      $$("[data-destination]").forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      renderPhotos();
    }),
  );
  $("#more-photos").addEventListener("click", () => {
    const oldLimit = photoLimit;
    photoLimit += 8;
    renderPhotos();
    const added = $$(".photo-card").slice(oldLimit);
    added.forEach((card) => card.classList.add("is-new"));
    // Keep keyboard users at the start of the newly revealed photographs.
    added[0]?.focus({ preventScroll: true });
  });
  function renderLightbox() {
    const photos = filteredPhotos();
    const photo = photos[photoIndex];
    const img = $("#lightbox-image");
    img.src = photo.large;
    img.alt = photo.alt[language];
    $("#lightbox-counter").textContent =
      `${photo.label[language]} · ${photoIndex + 1} / ${photos.length}`;
    $("#lightbox-caption").textContent = photo.alt[language];
  }
  function nextPhoto(delta) {
    const length = filteredPhotos().length;
    photoIndex = (photoIndex + delta + length) % length;
    renderLightbox();
  }
  $(".lightbox-prev").addEventListener("click", () => nextPhoto(-1));
  $(".lightbox-next").addEventListener("click", () => nextPhoto(1));
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      nextPhoto(event.key === "ArrowRight" ? 1 : -1);
    }
  });
  let touchStart = null;
  lightbox.addEventListener(
    "touchstart",
    (event) => {
      touchStart =
        event.touches.length === 1
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
          : null;
    },
    { passive: true },
  );
  lightbox.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
        nextPhoto(dx < 0 ? 1 : -1);
      touchStart = null;
    },
    { passive: true },
  );
  lightbox.addEventListener(
    "touchcancel",
    () => {
      touchStart = null;
    },
    { passive: true },
  );

  function toast(message) {
    const element = $(".toast");
    clearTimeout(toastTimer);
    element.textContent = message;
    element.classList.add("visible");
    toastTimer = setTimeout(() => element.classList.remove("visible"), 3500);
  }
  $(".copy-email").addEventListener("click", async () => {
    const email = "mehdi.robardet@epita.fr";
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      toast(t("Adresse email copiée !", "Email address copied!"));
    } catch {
      // The email remains selectable, even on HTTP or with clipboard access denied.
      const range = document.createRange();
      const emailText = $(".email-row > a").firstChild;
      const start = emailText.textContent.indexOf(email);
      range.setStart(emailText, start);
      range.setEnd(emailText, start + email.length);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      toast(
        t(
          "Sélectionnez et copiez l’adresse, ou cliquez pour écrire.",
          "Copy the selected address, or click it to send an email.",
        ),
      );
    }
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function motionBehavior() {
    return reducedMotion.matches ? "instant" : "smooth";
  }
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    $$(".reveal").forEach((element) => {
      // Elements already visible never flash away during initialization.
      if (
        !reducedMotion.matches &&
        element.getBoundingClientRect().top > innerHeight
      )
        element.classList.add("will-reveal");
      revealObserver.observe(element);
    });
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          $$(".nav-links a").forEach((link) => {
            if (link.hash === "#" + entry.target.id)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    $$("main > section").forEach((section) => sectionObserver.observe(section));
  }
  let scrollPending = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollPending) return;
      scrollPending = true;
      requestAnimationFrame(() => {
        document.body.classList.toggle("is-scrolled", scrollY > 25);
        scrollPending = false;
      });
    },
    { passive: true },
  );
  document.body.classList.toggle("is-scrolled", scrollY > 25);
  $("#year").textContent = new Date().getFullYear();
  applyLanguage();
  followSectionHash();
})();
