const body = document.body;
const menuButton = document.querySelector(".menu-button");
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = [...document.querySelectorAll(".side-link")];
const mobileNav = window.matchMedia("(max-width: 820px)");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function applyTheme(theme) {
  const isDark = theme === "dark";

  body.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Activer le mode clair" : "Activer le mode sombre"
  );
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
}

applyTheme(getInitialTheme());

function setActiveLink(hash) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
}

function getCurrentSectionHash() {
  if (!sections.length) {
    return "";
  }

  const topbarHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--topbar")
  );
  const anchorLine = (Number.isNaN(topbarHeight) ? 0 : topbarHeight) + window.innerHeight * 0.24;
  const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

  if (pageBottom) {
    return `#${sections[sections.length - 1].id}`;
  }

  const current = sections.reduce((activeSection, section) => {
    return section.getBoundingClientRect().top <= anchorLine ? section : activeSection;
  }, sections[0]);

  return `#${current.id}`;
}

let activeLinkFrame = 0;
let lockedActiveHash = "";
let activeLinkLockUntil = 0;

function syncActiveLink() {
  if (activeLinkFrame) {
    return;
  }

  activeLinkFrame = window.requestAnimationFrame(() => {
    if (lockedActiveHash && performance.now() < activeLinkLockUntil) {
      setActiveLink(lockedActiveHash);
      activeLinkFrame = 0;
      return;
    }

    lockedActiveHash = "";
    setActiveLink(getCurrentSectionHash());
    activeLinkFrame = 0;
  });
}

function syncMenuState() {
  const isMobile = mobileNav.matches;
  const isExpanded = isMobile ? body.classList.contains("nav-open") : !body.classList.contains("nav-collapsed");

  menuButton?.setAttribute("aria-expanded", String(isExpanded));
  menuButton?.setAttribute(
    "aria-label",
    isExpanded ? "Masquer la navigation" : "Ouvrir la navigation"
  );
}

menuButton?.addEventListener("click", () => {
  if (mobileNav.matches) {
    body.classList.toggle("nav-open");
  } else {
    body.classList.toggle("nav-collapsed");
  }

  syncMenuState();
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";

  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const hash = link.getAttribute("href");

    lockedActiveHash = hash;
    activeLinkLockUntil = performance.now() + 900;
    setActiveLink(hash);
    window.setTimeout(syncActiveLink, 920);
    body.classList.remove("nav-open");
    syncMenuState();
  });
});

mobileNav.addEventListener("change", () => {
  body.classList.remove("nav-open");
  syncMenuState();
});

window.addEventListener("scroll", syncActiveLink, { passive: true });
window.addEventListener("resize", syncActiveLink);

const searchWrap = document.querySelector(".search");
const search = document.querySelector(".search input");
const searchResults = document.querySelector(".search-results");
const projectItems = [...document.querySelectorAll("#projets .story-item")];
const projectSearchData = projectItems.map((item) => {
  const title = item.querySelector("h3")?.textContent.trim() || "Projet";
  const meta = item.querySelector(".story-meta")?.textContent.trim() || "";
  const body = item.textContent.trim();

  return {
    item,
    title,
    meta,
    searchable: normalizeSearchText(`${title} ${meta} ${body}`),
  };
});
const subscribeButton = document.querySelector(".subscribe-row");
const confettiColors = ["#ffd84f", "#c5182a", "#111111", "#f59e0b", "#ffffff"];

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function closeSearchResults() {
  if (!searchResults || !search) {
    return;
  }

  searchResults.hidden = true;
  search.setAttribute("aria-expanded", "false");
}

function renderSearchResults(matches, query) {
  if (!searchResults || !search) {
    return;
  }

  searchResults.replaceChildren();

  if (!query) {
    closeSearchResults();
    return;
  }

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "search-empty";
    empty.textContent = "Aucun projet trouve";
    searchResults.append(empty);
    searchResults.hidden = false;
    search.setAttribute("aria-expanded", "true");
    return;
  }

  matches.slice(0, 6).forEach((project) => {
    const option = document.createElement("button");
    const title = document.createElement("strong");
    const meta = document.createElement("span");

    option.className = "search-option";
    option.type = "button";
    option.setAttribute("role", "option");
    title.textContent = project.title;
    meta.textContent = project.meta;

    option.append(title, meta);
    option.addEventListener("click", () => selectProject(project));
    searchResults.append(option);
  });

  searchResults.hidden = false;
  search.setAttribute("aria-expanded", "true");
}

function updateProjectSearch() {
  const query = normalizeSearchText(search?.value.trim() || "");
  const matches = projectSearchData.filter((project) =>
    project.searchable.includes(query)
  );

  projectSearchData.forEach((project) => {
    const matchesQuery = project.searchable.includes(query);

    project.item.style.opacity = !query || matchesQuery ? "1" : "0.28";
  });

  renderSearchResults(matches, query);
}

function resetProjectOpacity() {
  projectItems.forEach((item) => {
    item.style.opacity = "1";
  });
}

function selectProject(project) {
  search.value = project.title;
  closeSearchResults();
  resetProjectOpacity();

  projectItems.forEach((item) => item.classList.remove("is-search-target"));
  project.item.classList.add("is-search-target");
  project.item.scrollIntoView({ behavior: "smooth", block: "center" });

  window.setTimeout(() => {
    project.item.classList.remove("is-search-target");
  }, 1600);
}

search?.addEventListener("input", updateProjectSearch);
search?.addEventListener("focus", updateProjectSearch);
search?.addEventListener("keydown", (event) => {
  const firstOption = searchResults?.querySelector(".search-option");

  if (event.key === "Escape") {
    closeSearchResults();
  }

  if (event.key === "Enter" && firstOption) {
    event.preventDefault();
    firstOption.click();
  }

  if (event.key === "ArrowDown" && firstOption) {
    event.preventDefault();
    firstOption.focus();
  }
});

searchResults?.addEventListener("keydown", (event) => {
  const options = [...searchResults.querySelectorAll(".search-option")];
  const currentIndex = options.indexOf(document.activeElement);

  if (event.key === "Escape") {
    search?.focus();
    closeSearchResults();
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    options[Math.min(currentIndex + 1, options.length - 1)]?.focus();
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    if (currentIndex <= 0) {
      search?.focus();
      return;
    }

    options[currentIndex - 1]?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!searchWrap?.contains(event.target)) {
    closeSearchResults();
  }
});

function burstConfetti(target) {
  const pieces = 16;

  for (let index = 0; index < pieces; index += 1) {
    const piece = document.createElement("span");
    const angle = (Math.PI * 2 * index) / pieces;
    const distance = 22 + Math.random() * 28;

    piece.className = "confetti-piece";
    piece.style.setProperty("--confetti-color", confettiColors[index % confettiColors.length]);
    piece.style.setProperty("--confetti-x", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--confetti-y", `${Math.sin(angle) * distance - 18}px`);
    piece.style.setProperty("--confetti-rotation", `${Math.random() * 260 - 130}deg`);

    target.append(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

subscribeButton?.addEventListener("click", () => {
  const isSubscribed = !subscribeButton.classList.contains("is-subscribed");

  subscribeButton.classList.toggle("is-subscribed", isSubscribed);
  subscribeButton.setAttribute("aria-pressed", String(isSubscribed));

  if (isSubscribed) {
    burstConfetti(subscribeButton);
  }
});

syncMenuState();
syncActiveLink();
