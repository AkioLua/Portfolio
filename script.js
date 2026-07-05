const body = document.body;
const menuButton = document.querySelector(".menu-button");
const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".lang-toggle");
const navLinks = [...document.querySelectorAll(".side-link")];
const mobileNav = window.matchMedia("(max-width: 820px)");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const searchWrap = document.querySelector(".search");
const search = document.querySelector(".search input");
const searchResults = document.querySelector(".search-results");
const projectItems = [...document.querySelectorAll("#projets .story-item")];
const subscribeButton = document.querySelector(".subscribe-row");
const confettiColors = ["#ffd84f", "#c5182a", "#111111", "#f59e0b", "#ffffff"];
const languageStorageKey = "portfolio-language";
const themeStorageKey = "portfolio-theme";

function captureText(selector) {
  return document.querySelector(selector)?.textContent.trim() ?? "";
}

function captureHTML(selector) {
  return document.querySelector(selector)?.innerHTML ?? "";
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
}

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem(languageStorageKey);

  if (savedLanguage === "fr" || savedLanguage === "en") {
    return savedLanguage;
  }

  return "en";
}

const originalContent = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.content ?? "",
  topbarLabel: document.querySelector(".topbar")?.getAttribute("aria-label") ?? "",
  sidebarLabel: document.querySelector(".sidebar")?.getAttribute("aria-label") ?? "",
  publicationLabel: document.querySelector(".publication-card")?.getAttribute("aria-label") ?? "",
  searchWrapLabel: searchWrap?.getAttribute("aria-label") ?? "",
  brandAria: document.querySelector(".brand")?.getAttribute("aria-label") ?? "",
  menuLabel: menuButton?.getAttribute("aria-label") ?? "",
  themeLabel: themeToggle?.getAttribute("aria-label") ?? "",
  languageLabel: languageToggle?.getAttribute("aria-label") ?? "",
  navLabels: navLinks.map((link) => link.textContent.trim()),
  searchLabel: search?.getAttribute("aria-label") ?? "",
  searchPlaceholder: search?.getAttribute("placeholder") ?? "",
  searchResultsLabel: searchResults?.getAttribute("aria-label") ?? "",
  publicationHeading: captureText(".publication-card h2"),
  publicationSummary: captureHTML(".publication-card > p"),
  subscribeText: captureText(".subscribe-row span"),
  heroTitle: captureHTML(".hero h1"),
  lead: captureHTML(".lead"),
  authorName: document.querySelector(".author-row strong")?.textContent.trim() ?? "",
  authorSchool: document.querySelector(".author-row").children[2]?.textContent.trim() ?? "",
  authorAvailability: document.querySelector(".author-row").children[4]?.textContent.trim() ?? "",
  heroButton: captureText(".hero-cta"),
  heroProjects: captureText(".cta-row .text-link"),
  engagementLabel: document.querySelector(".engagement-bar")?.getAttribute("aria-label") ?? "",
  introFirst: captureHTML(".intro-copy p:first-child"),
  introSecond: captureHTML(".intro-copy p:last-child"),
  projectKicker: captureText("#projets .section-kicker"),
  projectHeading: captureText("#projets h2"),
  skillsKicker: captureText("#competences .section-kicker"),
  skillsHeading: captureText("#competences h2"),
  educationKicker: captureText("#education .section-kicker"),
  educationHeading: captureText("#education h2"),
  experienceKicker: captureText("#experience .section-kicker"),
  experienceHeading: captureText("#experience h2"),
  contactKicker: captureText("#contact .section-kicker"),
  contactHeading: captureHTML("#contact h2"),
  contactButton: captureText("#contact .button-dark"),
  contactLink: captureText("#contact .text-link"),
  projectItems: projectItems.map((item) => ({
    title: item.querySelector("h3")?.textContent.trim() ?? "",
    meta: item.querySelector(".story-meta")?.textContent.trim() ?? "",
    points: [...item.querySelectorAll(".story-points li")].map((li) => li.innerHTML),
    date: item.querySelector(":scope > span")?.textContent.trim() ?? "",
    linkText: item.querySelector(".project-link")?.textContent.trim() ?? "",
  })),
  educationItems: [...document.querySelectorAll("#education .timeline article")].map((item) => ({
    date: item.querySelector(":scope > span")?.textContent.trim() ?? "",
    title: item.querySelector("h3")?.textContent.trim() ?? "",
    meta: item.querySelector(".timeline-meta")?.textContent.trim() ?? "",
    points: [...item.querySelectorAll(".timeline-points li")].map((li) => li.innerHTML),
    place: item.querySelector(".timeline-place")?.textContent.trim() ?? "",
    cert: item.querySelector(".timeline-cert")?.innerHTML ?? "",
    logoAlt: item.querySelector(".timeline-logo")?.getAttribute("alt") ?? "",
  })),
  experienceItems: [...document.querySelectorAll("#experience .experience-company")].map((item) => ({
    companyHead: item.querySelector(".company-head span")?.textContent.trim() ?? "",
    roles: [...item.querySelectorAll(".experience-role")].map((role) => ({
      title: role.querySelector("h4")?.textContent.trim() ?? "",
      subtitle: role.querySelector("p")?.textContent.trim() ?? "",
      spans: [...role.querySelectorAll(":scope > span")].map((span) => span.textContent.trim()),
      points: [...role.querySelectorAll(".role-points li")].map((li) => li.innerHTML),
    })),
  })),
};

const englishContent = {
  title: "Mehdi ROBARDET - Portfolio",
  description:
    "Portfolio of Mehdi ROBARDET, EPITA student looking for an internship in artificial intelligence or software development.",
  topbarLabel: "Main navigation",
  sidebarLabel: "Portfolio sections",
  publicationLabel: "Summary",
  searchWrapLabel: "Search a project",
  brandAria: "Back to home",
  menuOpen: "Open navigation",
  menuClose: "Hide navigation",
  themeLight: "Enable light mode",
  themeDark: "Enable dark mode",
  languageLabel: "Switch to French",
  searchLabel: "Search a project",
  searchPlaceholder: "Search a project",
  searchResultsLabel: "Project suggestions",
  emptySearch: "No projects found",
  publicationSummary:
    "A space dedicated to my projects, skills and experience in tech and artificial intelligence.",
  subscribeText: "Subscribe",
  heroTitle:
    'Mehdi ROBARDET <span class="dash">&mdash;</span><br /><span>AI & <br class="mobile-break" />software <br class="mobile-break" />development</span>',
  lead:
    "EPITA student, I am looking for an internship or an opportunity in artificial intelligence or software development.",
  authorName: "Mehdi ROBARDET",
  authorSchool: "EPITA",
  authorAvailability: "Available 2026",
  heroButton: "Contact me",
  heroProjects: "See my projects",
  engagementLabel: "Indicators",
  introFirst:
    'Passionate about <mark>artificial intelligence</mark> and software development, I design useful, efficient and durable solutions.',
  introSecond:
    'Through my <mark>concrete projects</mark>, I explore, learn and build robust systems.',
  projectKicker: "Project selection",
  projectHeading: "Concrete projects.",
  skillsKicker: "Skills",
  skillsHeading: "Technical base.",
  educationKicker: "Education",
  educationHeading: "AI and data training.",
  experienceKicker: "Professional experience",
  experienceHeading: "Professional ground.",
  contactKicker: "Contact",
  contactHeading:
    "Let's discuss an internship, an AI project or a software opportunity.",
  contactButton: "mehdi.robardet@epita.fr",
  contactLink: "LinkedIn",
  navLabels: ["Home", "Projects", "Skills", "Education", "Experience", "Contact"],
  projectItems: [
    {
      title: "Microsoft Azure AI Sport",
      meta: "Multi-agent AI coach and injury prediction - solo project",
      points: [
        "Built an Azure Machine Learning injury prediction pipeline with an inference endpoint.",
        "Designed a multi-agent Azure AI Foundry workflow routing requests to nutrition, fitness and FAQ agents.",
        "Created a React application around an AI sports coach and a tracking dashboard.",
        "Tools used: React, TypeScript, Azure AI Foundry, Azure Machine Learning, Microsoft Entra ID.",
      ],
      linkText: "View the GitHub project",
      date: "2026 - 2 weeks",
    },
    {
      title: "Symbolic Regression",
      meta: "Research project in artificial intelligence - solo project",
      points: [
        "Used PySR to discover mathematical equations with Kolmogorov complexity.",
        "Analyzed the accuracy-complexity Pareto front to identify the best equations.",
        "Compared with classical polynomial regression and kernel methods to highlight the interpretability gain.",
        "Tools used: Python, PySR, NumPy, Pandas, Scikit-learn.",
      ],
      date: "2026 - 2 weeks",
    },
    {
      title: "Multi-agent Modeling",
      meta: "Multi-agent modeling project - team of 4",
      points: [
        "Implemented agents with influence and movement behaviors.",
        "Added social pressure and boomerang effect mechanisms.",
        "Analyzed how parameter changes affect belief diffusion.",
        "Tools used: NetLogo.",
      ],
      date: "2026 - 2 weeks",
    },
    {
      title: "Nutritional Planning",
      meta: "Diet Problem (constraint optimization) - team of 2",
      points: [
        "Modeled the Diet Problem with CP-SAT as a multidimensional knapsack.",
        "Planned weekly menus with variety, budget and seasonality constraints.",
        "Added user preferences through weighted soft constraints.",
        "Benchmarked with USDA FoodData Central and WHO/ANSES recommendations.",
        "Compared CP-SAT / MILP with OR-Tools.",
        "Tools used: Python, OR-Tools, JSON, REST API, Vite, React.",
      ],
      linkText: "View the GitHub project",
      date: "2026 - 2 weeks",
    },
    {
      title: "TinyX / Epitweet",
      meta: "Distributed systems project - team of 15",
      points: [
        "Developed the timeline in Java with Quarkus in a microservices architecture.",
        "Used asynchronous communication through Redis and data storage with MongoDB.",
        "Set up multi-stage Dockerfiles and JUnit unit tests.",
        "Tools used: Java, Quarkus, Redis, MongoDB, Docker, JUnit.",
      ],
      date: "2026 - 1 month",
    },
    {
      title: "Epibazaar",
      meta: "Backend development for a video game - solo project",
      points: [
        "Built a REST API.",
        "Persisted data with Hibernate ORM in a database.",
        "Added asynchronous messaging with Kafka.",
        "Tools used: Java, Quarkus, Maven, PostgreSQL, Git.",
      ],
      date: "2025 - 1 week",
    },
    {
      title: "Tiger",
      meta: "Compiler design - team of 4",
      points: [
        "Implemented a lexer with RE/flex for lexical analysis.",
        "Designed a parser for syntax analysis and AST construction.",
        "Implemented symbol binding and type checking through the Template Method Pattern.",
        "Tools used: C++, Bison, RE/flex, Git, GitLab, Autotools, CMake.",
      ],
      date: "2025 - 4 weeks",
    },
    {
      title: "QRCodeur",
      meta: "QR code generator and decoder - team of 4",
      points: [
        "Built a QR code generation and reading tool following ISO/IEC 18004.",
        "Finished learning Rust.",
        "Tools used: Rust, Git.",
      ],
      date: "2024 - 1 month",
    },
    {
      title: "Sudoku Solver",
      meta: "Handwritten digit recognition - team of 4",
      points: [
        "Solved a Sudoku from an image.",
        "Built a neural network to recognize handwritten digits.",
        "Tools used: C, Git.",
      ],
      date: "2023 - 1 month",
    },
  ],
  skillsParagraphs: [
    '<mark>Python, JavaScript, Java, C++, C, C#, SQL, Rust, OCaml</mark> to move from idea to prototype, then to a robust service.',
    '<mark>TensorFlow, Pandas, NumPy, SciPy, Django, Node.js, React, Quarkus</mark> to explore AI, the web and backend architectures.',
    '<mark>Docker, Kubernetes, GitLab CI, Kafka, Redis, PostgreSQL, MongoDB, Neo4j</mark> to deploy and maintain more reliable systems.',
  ],
  educationItems: [
    {
      date: "Sept 2022 - present",
      meta: "GPA 3.7, final-year student",
      points: [
        "Artificial intelligence: Fundamentals for Machine Learning, Introduction to neural networks, Natural Language Processing, Multi-Agent Systems and symbolic AI.",
        "Data & cloud: Introduction to Data Engineering, Python for Big Data with Pandas, Microsoft Azure and Video Processing.",
        "Advanced modeling: Recommender Systems / Matrix Factorization, Convex Optimization, Constraint Programming, Bayesian & Causality.",
      ],
      place: "Paris, France",
      cert: 'TOEIC <strong>870</strong> - professional English',
    },
    {
      date: "2026",
      meta: "Exchange semester",
      points: ["Content: Artificial Intelligence, Robotics, Data Science."],
      place: "Minxiong, Taiwan",
    },
    {
      date: "Sept 2019 - Jun 2022",
      points: [
        "Earned the French Baccalauréat with Mathematics, Physics-Chemistry and Computer Science specialties, with highest honors.",
        "Languages: French native, English advanced, Italian basic.",
      ],
      place: "Metz, France",
    },
  ],
  experienceItems: [
    {
      companyHead: "9 months",
      roles: [
        {
          title: "Full-Stack Developer",
          subtitle: "Permanent contract",
          spans: ["Feb. 2026 - present · 6 months", "Paris, France · Hybrid"],
          points: [
            "Built CRUD systems for managing application data.",
            "Maintained the codebase through code reviews and merge request management.",
            "Worked on the Kubernetes environment: pod access, migration runs, service restarts.",
            "Developed APIs with Django and built data visualization charts with Recharts.",
            "Technologies used: React.js, Django, Kubernetes, AWS, Git, JavaScript.",
          ],
        },
        {
          title: "Front-End Developer",
          subtitle: "Internship",
          spans: ["Sept. 2025 - Jan. 2026 · 5 months", "Paris and surrounding area · Hybrid"],
          points: [
            "Developed interactive dashboards with Shadcn/UI and React.js.",
            "Migrated and maintained the web pipeline as well as the front-end codebase.",
            "Designed and integrated a landing page from Figma mockups.",
            "Tools used: JavaScript, React.js, Figma, Jira, Git.",
          ],
        },
      ],
    },
    {
      roles: [
        {
          title: "QSE Intern",
          subtitle: "Groupe SOS Seniors · Internship",
          spans: ["Jun. 2023 - Jul. 2023 · 2 months", "Metz, Grand Est, France · On-site"],
          points: [
            "Analyzed the energy consumption of healthcare and social care facilities.",
            "Created interactive awareness materials about safety and sustainable development.",
          ],
        },
      ],
    },
    {
      roles: [
        {
          title: "Volunteer educational support",
          subtitle: "Mathematics support for first-year students",
          spans: ["Jan. 2022 - Jun. 2022 · 6 months", "Metz, France · On-site"],
          points: [
            "Helped first-year students prepare for exams.",
            "Strengthened their problem-solving methodology.",
          ],
        },
      ],
    },
  ],
};

let currentLanguage = getInitialLanguage();
let activeLinkFrame = 0;
let lockedActiveHash = "";
let activeLinkLockUntil = 0;
let projectSearchData = [];

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function setText(target, value) {
  if (!target) {
    return;
  }

  target.textContent = value;
}

function setHTML(target, value) {
  if (!target) {
    return;
  }

  target.innerHTML = value;
}

function setAttribute(target, name, value) {
  if (!target) {
    return;
  }

  target.setAttribute(name, value);
}

function getThemeToggleLabel(theme, language) {
  const labels = language === "en"
    ? { light: englishContent.themeLight, dark: englishContent.themeDark }
    : { light: "Activer le mode sombre", dark: "Activer le mode clair" };

  return theme === "dark" ? labels.light : labels.dark;
}

function getMenuToggleLabel(isExpanded, language) {
  if (language === "en") {
    return isExpanded ? englishContent.menuClose : englishContent.menuOpen;
  }

  return isExpanded ? "Masquer la navigation" : "Ouvrir la navigation";
}

function buildProjectSearchData() {
  return projectItems.map((item) => {
    const title = item.querySelector("h3")?.textContent.trim() || "Project";
    const meta = item.querySelector(".story-meta")?.textContent.trim() || "";
    const body = item.textContent.trim();

    return {
      item,
      title,
      meta,
      searchable: normalizeSearchText(`${title} ${meta} ${body}`),
    };
  });
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  body.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute(
    "aria-label",
    getThemeToggleLabel(theme, currentLanguage)
  );
}

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
  menuButton?.setAttribute("aria-label", getMenuToggleLabel(isExpanded, currentLanguage));
}

function applyFrenchContent() {
  document.title = originalContent.title;
  setAttribute(document.querySelector('meta[name="description"]'), "content", originalContent.description);
  setAttribute(document.querySelector(".topbar"), "aria-label", originalContent.topbarLabel);
  setAttribute(document.querySelector(".sidebar"), "aria-label", originalContent.sidebarLabel);
  setAttribute(document.querySelector(".publication-card"), "aria-label", originalContent.publicationLabel);
  setAttribute(searchWrap, "aria-label", originalContent.searchWrapLabel);
  setAttribute(document.querySelector(".brand"), "aria-label", originalContent.brandAria);
  setAttribute(search, "aria-label", originalContent.searchLabel);
  setAttribute(search, "placeholder", originalContent.searchPlaceholder);
  setAttribute(searchResults, "aria-label", originalContent.searchResultsLabel);

  navLinks.forEach((link, index) => {
    setText(link, originalContent.navLabels[index]);
  });

  setText(document.querySelector(".publication-card h2"), originalContent.publicationHeading);
  setHTML(document.querySelector(".publication-card > p"), originalContent.publicationSummary);
  setText(document.querySelector(".subscribe-row span"), originalContent.subscribeText);
  setHTML(document.querySelector(".hero h1"), originalContent.heroTitle);
  setHTML(document.querySelector(".lead"), originalContent.lead);
  setText(document.querySelector(".author-row strong"), originalContent.authorName);
  setText(document.querySelector(".author-row").children[2], originalContent.authorSchool);
  setText(document.querySelector(".author-row").children[4], originalContent.authorAvailability);
  setText(document.querySelector(".hero-cta"), originalContent.heroButton);
  setText(document.querySelector(".cta-row .text-link"), originalContent.heroProjects);
  setAttribute(document.querySelector(".engagement-bar"), "aria-label", originalContent.engagementLabel);
  setHTML(document.querySelector(".intro-copy p:first-child"), originalContent.introFirst);
  setHTML(document.querySelector(".intro-copy p:last-child"), originalContent.introSecond);
  setText(document.querySelector("#projets .section-kicker"), originalContent.projectKicker);
  setText(document.querySelector("#projets h2"), originalContent.projectHeading);
  setText(document.querySelector("#competences .section-kicker"), originalContent.skillsKicker);
  setText(document.querySelector("#competences h2"), originalContent.skillsHeading);
  setText(document.querySelector("#education .section-kicker"), originalContent.educationKicker);
  setText(document.querySelector("#education h2"), originalContent.educationHeading);
  setText(document.querySelector("#experience .section-kicker"), originalContent.experienceKicker);
  setText(document.querySelector("#experience h2"), originalContent.experienceHeading);
  setText(document.querySelector("#contact .section-kicker"), originalContent.contactKicker);
  setHTML(document.querySelector("#contact h2"), originalContent.contactHeading);
  setText(document.querySelector("#contact .button-dark"), originalContent.contactButton);
  setText(document.querySelector("#contact .text-link"), originalContent.contactLink);

  projectItems.forEach((item, index) => {
    const copy = originalContent.projectItems[index];

    setText(item.querySelector("h3"), copy.title);
    setText(item.querySelector(".story-meta"), copy.meta);
    item.querySelectorAll(".story-points li").forEach((li, pointIndex) => {
      if (li.querySelector(".project-link")) {
        setText(li.querySelector(".project-link"), copy.linkText);
      } else {
        setHTML(li, copy.points[pointIndex]);
      }
    });
    setText(item.querySelector(":scope > span"), copy.date);
  });

  document.querySelectorAll("#education .timeline article").forEach((item, index) => {
    const copy = originalContent.educationItems[index];

    setText(item.querySelector(":scope > span"), copy.date);
    setText(item.querySelector("h3"), copy.title);
    setText(item.querySelector(".timeline-meta"), copy.meta);
    item.querySelectorAll(".timeline-points li").forEach((li, pointIndex) => {
      setHTML(li, copy.points[pointIndex]);
    });
    setText(item.querySelector(".timeline-place"), copy.place);
    if (item.querySelector(".timeline-cert")) {
      setHTML(item.querySelector(".timeline-cert"), copy.cert);
    }
    setAttribute(item.querySelector(".timeline-logo"), "alt", copy.logoAlt);
  });

  document.querySelectorAll("#experience .experience-company").forEach((company, index) => {
    const copy = originalContent.experienceItems[index];
    const headSpan = company.querySelector(".company-head span");

    setText(headSpan, copy.companyHead);

    company.querySelectorAll(".experience-role").forEach((role, roleIndex) => {
      const roleCopy = copy.roles[roleIndex];

      setText(role.querySelector("h4"), roleCopy.title);
      setText(role.querySelector("p"), roleCopy.subtitle);
      role.querySelectorAll(":scope > span").forEach((span, spanIndex) => {
        setText(span, roleCopy.spans[spanIndex]);
      });
      role.querySelectorAll(".role-points li").forEach((li, pointIndex) => {
        setHTML(li, roleCopy.points[pointIndex]);
      });
    });
  });
}

function applyEnglishContent() {
  document.title = englishContent.title;
  setAttribute(document.querySelector('meta[name="description"]'), "content", englishContent.description);
  setAttribute(document.querySelector(".topbar"), "aria-label", englishContent.topbarLabel);
  setAttribute(document.querySelector(".sidebar"), "aria-label", englishContent.sidebarLabel);
  setAttribute(document.querySelector(".publication-card"), "aria-label", englishContent.publicationLabel);
  setAttribute(searchWrap, "aria-label", englishContent.searchWrapLabel);
  setAttribute(document.querySelector(".brand"), "aria-label", englishContent.brandAria);
  setAttribute(search, "aria-label", englishContent.searchLabel);
  setAttribute(search, "placeholder", englishContent.searchPlaceholder);
  setAttribute(searchResults, "aria-label", englishContent.searchResultsLabel);

  navLinks.forEach((link, index) => {
    setText(link, englishContent.navLabels[index]);
  });

  setText(document.querySelector(".publication-card h2"), originalContent.publicationHeading);
  setHTML(document.querySelector(".publication-card > p"), englishContent.publicationSummary);
  setText(document.querySelector(".subscribe-row span"), englishContent.subscribeText);
  setHTML(document.querySelector(".hero h1"), englishContent.heroTitle);
  setHTML(document.querySelector(".lead"), englishContent.lead);
  setText(document.querySelector(".author-row strong"), englishContent.authorName);
  setText(document.querySelector(".author-row").children[2], englishContent.authorSchool);
  setText(document.querySelector(".author-row").children[4], englishContent.authorAvailability);
  setText(document.querySelector(".hero-cta"), englishContent.heroButton);
  setText(document.querySelector(".cta-row .text-link"), englishContent.heroProjects);
  setAttribute(document.querySelector(".engagement-bar"), "aria-label", englishContent.engagementLabel);
  setHTML(document.querySelector(".intro-copy p:first-child"), englishContent.introFirst);
  setHTML(document.querySelector(".intro-copy p:last-child"), englishContent.introSecond);
  setText(document.querySelector("#projets .section-kicker"), englishContent.projectKicker);
  setText(document.querySelector("#projets h2"), englishContent.projectHeading);
  setText(document.querySelector("#competences .section-kicker"), englishContent.skillsKicker);
  setText(document.querySelector("#competences h2"), englishContent.skillsHeading);
  setText(document.querySelector("#education .section-kicker"), englishContent.educationKicker);
  setText(document.querySelector("#education h2"), englishContent.educationHeading);
  setText(document.querySelector("#experience .section-kicker"), englishContent.experienceKicker);
  setText(document.querySelector("#experience h2"), englishContent.experienceHeading);
  setText(document.querySelector("#contact .section-kicker"), englishContent.contactKicker);
  setHTML(document.querySelector("#contact h2"), englishContent.contactHeading);
  setText(document.querySelector("#contact .button-dark"), englishContent.contactButton);
  setText(document.querySelector("#contact .text-link"), englishContent.contactLink);

  projectItems.forEach((item, index) => {
    const copy = englishContent.projectItems[index];

    setText(item.querySelector("h3"), copy.title);
    setText(item.querySelector(".story-meta"), copy.meta);
    item.querySelectorAll(".story-points li").forEach((li, pointIndex) => {
      const link = li.querySelector(".project-link");

      if (link) {
        setText(link, copy.linkText);
      } else {
        setText(li, copy.points[pointIndex]);
      }
    });
    setText(item.querySelector(":scope > span"), copy.date);
  });

  document.querySelectorAll("#education .timeline article").forEach((item, index) => {
    const copy = englishContent.educationItems[index];

    setText(item.querySelector(":scope > span"), copy.date);
    setText(item.querySelector(".timeline-meta"), copy.meta);
    item.querySelectorAll(".timeline-points li").forEach((li, pointIndex) => {
      setText(li, copy.points[pointIndex]);
    });
    setText(item.querySelector(".timeline-place"), copy.place);
    if (item.querySelector(".timeline-cert")) {
      setHTML(item.querySelector(".timeline-cert"), copy.cert ?? "");
    }
  });

  document.querySelectorAll("#experience .experience-company").forEach((company, index) => {
    const copy = englishContent.experienceItems[index];
    const headSpan = company.querySelector(".company-head span");

    setText(headSpan, copy.companyHead ?? "");

    company.querySelectorAll(".experience-role").forEach((role, roleIndex) => {
      const roleCopy = copy.roles[roleIndex];

      setText(role.querySelector("h4"), roleCopy.title);
      setText(role.querySelector("p"), roleCopy.subtitle);
      role.querySelectorAll(":scope > span").forEach((span, spanIndex) => {
        setText(span, roleCopy.spans[spanIndex]);
      });
      role.querySelectorAll(".role-points li").forEach((li, pointIndex) => {
        setText(li, roleCopy.points[pointIndex]);
      });
    });
  });
}

function updateLanguageToggleLabel() {
  languageToggle?.setAttribute(
    "aria-label",
    currentLanguage === "fr" ? "Switch to English" : "Passer en français"
  );
}

function applyLanguage(language) {
  currentLanguage = language;
  body.dataset.language = language;
  document.documentElement.lang = language;
  localStorage.setItem(languageStorageKey, language);

  if (language === "en") {
    applyEnglishContent();
  } else {
    applyFrenchContent();
  }

  updateLanguageToggleLabel();
  applyTheme(body.dataset.theme === "dark" ? "dark" : getInitialTheme());
  syncMenuState();
  projectSearchData = buildProjectSearchData();
  if (search?.value.trim()) {
    updateProjectSearch();
  } else {
    closeSearchResults();
    resetProjectOpacity();
  }
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
    empty.textContent = currentLanguage === "en" ? englishContent.emptySearch : "Aucun projet trouve";
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
  if (!search) {
    return;
  }

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

  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
});

languageToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "fr" ? "en" : "fr");
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

applyLanguage(currentLanguage);
applyTheme(getInitialTheme());
syncMenuState();
syncActiveLink();
