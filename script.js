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
  const photoCards = new Map();
  const decodedPhotos = new Map();
  let photoRequestId = 0;
  let displayedPhotoIndex = 0;
  let photoTransitionId = 0;
  let photoAnimations = [];
  let lightboxClosing = false;
  let lightboxCloseAnimation = null;
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
    settleTabTransition();
    syncTabIndicator();
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
    document.documentElement.style.setProperty(
      "--scrollbar-compensation",
      `${window.innerWidth - document.documentElement.clientWidth}px`,
    );
    dialog.showModal();
    document.body.classList.add("modal-open");
    if (dialog === lightbox) fitLightboxImages();
    $(".dialog-close", dialog).focus({ preventScroll: true });
  }
  [projectDialog, lightbox].forEach((dialog) => {
    $(".dialog-close", dialog).addEventListener("click", () => {
      if (dialog === lightbox) closeLightbox();
      else dialog.close();
    });
    dialog.addEventListener("cancel", (event) => {
      if (dialog !== lightbox) return;
      event.preventDefault();
      closeLightbox();
    });
    dialog.addEventListener("close", () => {
      if (dialog === lightbox) {
        photoRequestId++;
        clearPhotoTransition();
        lightboxCloseAnimation?.cancel();
        lightboxCloseAnimation = null;
        lightboxClosing = false;
        lightbox.classList.remove("is-closing");
        $(".lightbox-stage").setAttribute("aria-busy", "false");
      }
      document.body.classList.remove("modal-open");
      document.documentElement.style.removeProperty("--scrollbar-compensation");
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
      pressedOutside =
        dialog === lightbox ? event.target === lightbox : outside(event);
    });
    dialog.addEventListener("click", (event) => {
      if (dialog === projectDialog && pressedOutside && outside(event))
        dialog.close();
      if (dialog === lightbox && pressedOutside && event.target === lightbox)
        closeLightbox();
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
  const journeyPanels = $(".journey-panels");
  let tabAnimations = [];
  let tabTransitionId = 0;

  function syncTabIndicator() {
    const tab = $('.journey-tabs [aria-selected="true"]');
    const tablist = $(".journey-tabs");
    tablist.style.setProperty("--indicator-x", `${tab.offsetLeft}px`);
    tablist.style.setProperty("--indicator-width", `${tab.offsetWidth}px`);
    tablist.classList.add("has-indicator");
  }

  function settleTabTransition() {
    tabTransitionId++;
    tabAnimations.forEach((animation) => animation.cancel());
    tabAnimations = [];
    journeyPanels.classList.remove("is-transitioning");
    tabs.forEach((tab) => {
      const panel = $("#" + tab.getAttribute("aria-controls"));
      panel.hidden = tab.getAttribute("aria-selected") !== "true";
      panel.classList.remove("is-leaving");
      panel.removeAttribute("aria-hidden");
      panel.inert = false;
    });
  }

  function selectTab(tab, focus = false) {
    if (focus) tab.focus();
    if (tab.getAttribute("aria-selected") === "true") return;
    const height = journeyPanels.getBoundingClientRect().height;
    settleTabTransition();
    const previous = $(".journey-panels > [role='tabpanel']:not([hidden])");
    const next = $("#" + tab.getAttribute("aria-controls"));
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    syncTabIndicator();
    next.hidden = false;
    if (reducedMotion.matches || !journeyPanels.animate) {
      previous.hidden = true;
      return;
    }
    previous.classList.add("is-leaving");
    previous.setAttribute("aria-hidden", "true");
    previous.inert = true;
    journeyPanels.classList.add("is-transitioning");
    const targetHeight = next.getBoundingClientRect().height;
    const currentTransition = tabTransitionId;
    const easing = "cubic-bezier(.22, 1, .36, 1)";
    tabAnimations = [
      journeyPanels.animate(
        [{ height: `${height}px` }, { height: `${targetHeight}px` }],
        { duration: 480, easing },
      ),
      previous.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-6px)" },
        ],
        { duration: 160, easing, fill: "forwards" },
      ),
      next.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 380, delay: 70, easing, fill: "both" },
      ),
    ];
    Promise.allSettled(
      tabAnimations.map((animation) => animation.finished),
    ).then(() => {
      if (currentTransition === tabTransitionId) settleTabTransition();
    });
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
  if ("ResizeObserver" in window) {
    const tabResizeObserver = new ResizeObserver(syncTabIndicator);
    tabs.forEach((tab) => tabResizeObserver.observe(tab));
  }
  window.addEventListener("resize", () => {
    settleTabTransition();
    syncTabIndicator();
  });

  // Animate disclosure height in both directions while keeping native details semantics.
  const disclosureAnimations = new Map();
  $$(".journey-item").forEach((details) => {
    $("summary", details).addEventListener("click", (event) => {
      if (reducedMotion.matches || !details.animate) return;
      event.preventDefault();
      settleTabTransition();
      const pending = disclosureAnimations.get(details);
      const opening = pending ? !pending.opening : !details.open;
      const start = details.getBoundingClientRect().height;
      pending?.animation.cancel();
      details.open = true;
      const end = opening
        ? details.getBoundingClientRect().height
        : $("summary", details).getBoundingClientRect().height + 1;
      details.classList.add("is-expanding");
      const animation = details.animate(
        [{ height: `${start}px` }, { height: `${end}px` }],
        { duration: 340, easing: "cubic-bezier(.22, 1, .36, 1)" },
      );
      disclosureAnimations.set(details, { animation, opening });
      animation.onfinish = () => {
        details.open = opening;
        details.classList.remove("is-expanding");
        disclosureAnimations.delete(details);
        animation.cancel();
      };
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
  function loadPhoto(src) {
    if (decodedPhotos.has(src)) {
      const cached = decodedPhotos.get(src);
      decodedPhotos.delete(src);
      decodedPhotos.set(src, cached);
      return cached;
    }
    const image = new Image();
    image.decoding = "async";
    const promise = new Promise((resolve, reject) => {
      image.onload = async () => {
        try {
          if (image.decode) await image.decode();
          resolve(image);
        } catch (error) {
          reject(error);
        }
      };
      image.onerror = () => reject(new Error("Photo unavailable"));
      image.src = src;
    });
    decodedPhotos.set(src, promise);
    // Retain a small, useful neighborhood rather than decoding the entire gallery.
    while (decodedPhotos.size > 8)
      decodedPhotos.delete(decodedPhotos.keys().next().value);
    promise.catch(() => {
      if (decodedPhotos.get(src) === promise) decodedPhotos.delete(src);
    });
    return promise;
  }

  function renderPhotos() {
    const photos = filteredPhotos();
    const grid = $("#photo-grid");
    const cards = photos.slice(0, photoLimit).map((photo, index) => {
      let button = photoCards.get(photo.thumb);
      if (!button) {
        button = node("button", "photo-card");
        button.type = "button";
        const img = node("img");
        img.src = photo.thumb;
        img.width = photo.width;
        img.height = photo.height;
        img.loading = "lazy";
        img.decoding = "async";
        img.draggable = false;
        const label = node("span", "photo-label");
        label.append(node("span"), node("span", "", "↗"));
        label.setAttribute("aria-hidden", "true");
        button.append(img, label);
        button.addEventListener("click", () => {
          photoIndex = Number(button.dataset.photoIndex);
          renderLightbox(0, true);
          openDialog(lightbox);
        });
        const warmPhoto = () => loadPhoto(photo.large).catch(() => {});
        button.addEventListener("pointerenter", (event) => {
          if (event.pointerType !== "touch") warmPhoto();
        });
        button.addEventListener("focus", warmPhoto);
        button.addEventListener("animationend", (event) => {
          if (event.target === button) button.classList.remove("is-new");
        });
        photoCards.set(photo.thumb, button);
      }
      button.dataset.photoIndex = index;
      button.setAttribute(
        "aria-label",
        t("Agrandir : ", "Enlarge: ") +
          photo.alt[language] +
          " · " +
          photo.label[language] +
          ` (${index + 1}/${photos.length})`,
      );
      $("img", button).alt = photo.alt[language];
      $(".photo-label > span", button).textContent = photo.label[language];
      return button;
    });
    const wanted = new Set(cards);
    [...grid.children].forEach((card) => {
      if (!wanted.has(card)) card.remove();
    });
    cards.forEach((card, index) => {
      if (grid.children[index] === card) return;
      if (!card.isConnected) card.classList.add("is-new");
      grid.insertBefore(card, grid.children[index] ?? null);
    });
    $(".photo-count").textContent =
      `${Math.min(photoLimit, photos.length)} / ${photos.length} photos`;
    $("#more-photos").hidden = photoLimit >= photos.length;
  }
  $$("[data-destination]").forEach((button) =>
    button.addEventListener("click", () => {
      if (destination === button.dataset.destination) return;
      destination = button.dataset.destination;
      photoLimit = 8;
      $$("[data-destination]").forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      renderPhotos();
    }),
  );
  $("#more-photos").addEventListener("click", (event) => {
    const oldLimit = photoLimit;
    photoLimit += 8;
    renderPhotos();
    if (event.detail === 0)
      $$(".photo-card")[oldLimit]?.focus({ preventScroll: true });
  });

  function clearPhotoTransition() {
    photoTransitionId++;
    photoAnimations.forEach((animation) => animation.cancel());
    photoAnimations = [];
    $$(".lightbox-outgoing").forEach((image) => image.remove());
  }

  function fitLightboxImages() {
    if (!lightbox.open) return;
    const bounds = $(".lightbox-stage").getBoundingClientRect();
    $$(".lightbox-stage img").forEach((image) => {
      if (!image.width || !image.height) return;
      const width = Number(image.getAttribute("width"));
      const height = Number(image.getAttribute("height"));
      const scale = Math.min(bounds.width / width, bounds.height / height);
      image.style.width = `${width * scale}px`;
      image.style.height = `${height * scale}px`;
    });
  }
  if ("ResizeObserver" in window) {
    new ResizeObserver(fitLightboxImages).observe($(".lightbox-stage"));
  } else {
    window.addEventListener("resize", fitLightboxImages);
  }

  function updatePhotoCaption(photo, index) {
    $("#lightbox-image").alt = photo.alt[language];
    $("#lightbox-counter").textContent =
      `${photo.label[language]} · ${index + 1} / ${filteredPhotos().length}`;
    $("#lightbox-caption").textContent = photo.alt[language];
    displayedPhotoIndex = index;
  }

  async function renderLightbox(direction = 0, initial = false) {
    const photos = filteredPhotos();
    const index = photoIndex;
    const photo = photos[index];
    const request = ++photoRequestId;
    const img = $("#lightbox-image");
    const stage = $(".lightbox-stage");
    stage.setAttribute("aria-busy", "true");
    if (initial) {
      clearPhotoTransition();
      img.src = photo.thumb;
      img.width = photo.width;
      img.height = photo.height;
      updatePhotoCaption(photo, index);
    }
    try {
      const decoded = await loadPhoto(photo.large);
      // A late response must never replace a more recently requested photograph.
      if (request !== photoRequestId || !lightbox.open || lightboxClosing)
        return;
      clearPhotoTransition();
      const shouldAnimate =
        !reducedMotion.matches && img.animate && img.src !== decoded.src;
      let outgoing;
      if (shouldAnimate) {
        outgoing = img.cloneNode();
        outgoing.removeAttribute("id");
        outgoing.alt = "";
        outgoing.setAttribute("aria-hidden", "true");
        outgoing.className = "lightbox-outgoing";
        stage.prepend(outgoing);
      }
      img.src = decoded.src;
      img.width = photo.width;
      img.height = photo.height;
      fitLightboxImages();
      updatePhotoCaption(photo, index);
      stage.setAttribute("aria-busy", "false");
      if (shouldAnimate) {
        const transition = photoTransitionId;
        const options = {
          duration: 280,
          easing: "cubic-bezier(.22, 1, .36, 1)",
        };
        photoAnimations = [
          img.animate(
            [
              { opacity: 0, transform: `translate3d(${direction * 12}px,0,0)` },
              { opacity: 1, transform: "translate3d(0,0,0)" },
            ],
            options,
          ),
          outgoing.animate(
            [
              { opacity: 1, transform: "translate3d(0,0,0)" },
              {
                opacity: 0,
                transform: `translate3d(${-direction * 12}px,0,0)`,
              },
            ],
            { ...options, fill: "forwards" },
          ),
        ];
        Promise.allSettled(
          photoAnimations.map((animation) => animation.finished),
        ).then(() => {
          if (transition === photoTransitionId) clearPhotoTransition();
        });
      }
      for (const offset of [-1, 1]) {
        loadPhoto(
          photos[(index + offset + photos.length) % photos.length].large,
        ).catch(() => {});
      }
    } catch {
      if (request !== photoRequestId || !lightbox.open || lightboxClosing)
        return;
      photoIndex = displayedPhotoIndex;
      stage.setAttribute("aria-busy", "false");
      // Announce inside the modal: content outside a native dialog is inert.
      $("#lightbox-caption").textContent = t(
        "Cette photo n’a pas pu être chargée. Réessayez avec les flèches.",
        "This photo could not be loaded. Try again using the arrows.",
      );
    }
  }

  function closeLightbox() {
    if (!lightbox.open || lightboxClosing) return;
    photoRequestId++;
    if (reducedMotion.matches || !lightbox.animate) {
      lightbox.close();
      return;
    }
    lightboxClosing = true;
    lightbox.classList.add("is-closing");
    lightboxCloseAnimation = lightbox.animate(
      [{ opacity: getComputedStyle(lightbox).opacity }, { opacity: 0 }],
      { duration: 180, easing: "ease-in", fill: "forwards" },
    );
    lightboxCloseAnimation.finished
      .then(() => lightbox.close())
      .catch(() => {});
  }

  function nextPhoto(delta) {
    if (lightboxClosing) return;
    const length = filteredPhotos().length;
    photoIndex = (photoIndex + delta + length) % length;
    renderLightbox(delta);
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
        event.touches.length === 1 && !event.target.closest("button")
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
  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    settleTabTransition();
    clearPhotoTransition();
    lightboxCloseAnimation?.finish();
    disclosureAnimations.forEach(({ animation, opening }, details) => {
      animation.cancel();
      details.open = opening;
      details.classList.remove("is-expanding");
    });
    disclosureAnimations.clear();
  });
  function motionBehavior() {
    return reducedMotion.matches ? "instant" : "smooth";
  }
  if ("IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-in-view", entry.isIntersecting),
      );
    });
    heroObserver.observe($(".hero"));
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
