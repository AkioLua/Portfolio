/* Portfolio content and optimized photo assets. Originals are preserved in assets/. */
const portfolioData = {
  projects: [
    {
      id: 0,
      category: "data",
      tech: "Scala · Spark · Kafka",
      fr: {
        title: "AgriSense",
        meta: "Ingestion et traitement de données en temps réel -\n                    équipe de 4 membres",
        points: [
          "Simulation et traitement de millions de mesures de capteurs\n                      avec Kafka et Spark dans un data lake\n                      Bronze-Silver-Gold.",
          "Mise en place d'alertes de gel en temps réel et de\n                      tableaux de bord Metabase pour l'analyse des données\n                      sur le long terme avec DuckDB.",
          "Outils utilisés : Scala, Spark, Kafka, DuckDB,\n                      Metabase.",
        ],
        date: "2026 - 1 mois",
      },
      en: {
        title: "AgriSense",
        meta: "Real-time data ingestion and processing - team of 4",
        points: [
          "Simulated and processed millions of sensor readings with Kafka and Spark using a Bronze-Silver-Gold data lake.",
          "Built real-time frost alerts and Metabase dashboards for long-term data analysis with DuckDB.",
          "Tools used: Scala, Spark, Kafka, DuckDB, Metabase.",
        ],
        linkText: "View the GitHub project",
        date: "2026 - 1 month",
      },
      short: {
        fr: "Des données aux décisions.",
        en: "From data to decisions.",
      },
      url: "https://github.com/AkioLua/Projet-INDE-AgriSense",
    },
    {
      id: 1,
      category: "ai",
      tech: "Python · PyTorch",
      fr: {
        title: "Mobile SemiDenseNet 3D - iSeg 2017",
        meta: "Segmentation d'images médicales - projet seul",
        points: [
          "Adaptation du modèle au jeu de données\n                      iSeg 2017 pour la segmentation des tissus\n                      cérébraux du nourrisson sur des IRM.",
          "Développement d'un SemiDenseNet 3D compact\n                      d'environ 330 000 paramètres exploitant les\n                      séquences T1/T2.",
          "Préparation pour smartphones avec\n                      inférence 3D par blocs et export TorchScript.",
          "Outils utilisés : Python, PyTorch, NumPy, NiBabel.",
        ],
        date: "2026 - 2 semaines",
      },
      en: {
        title: "Mobile SemiDenseNet 3D - iSeg 2017",
        meta: "Medical image segmentation - solo project",
        points: [
          "Adapted the model to the iSeg 2017 dataset for infant brain MRI tissue segmentation.",
          "Built a compact 3D SemiDenseNet with approximately 330,000 parameters using T1/T2 scans.",
          "Targeted smartphones with tiled 3D inference and TorchScript export.",
          "Tools used: Python, PyTorch, NumPy, NiBabel.",
        ],
        date: "2026 - 2 weeks",
      },
      short: {
        fr: "L’IA, au plus près du vivant.",
        en: "AI, closer to life.",
      },
      url: null,
    },
    {
      id: 2,
      category: "ai",
      tech: "VLM · iRAG",
      fr: {
        title: "Attribution visuelle au niveau du pixel pour iRAG",
        meta: "Analyse et présentation d'un article scientifique -\n                    projet seul",
        points: [
          "Analyse et présentation de l'article\n                      « Chain of Evidence » sur l'attribution visuelle\n                      pour iRAG.",
          "Étude du raisonnement des modèles\n                      vision-langage (VLM) sur des captures de documents et de\n                      la localisation des preuves au niveau du pixel.",
          "Analyse des résultats sur Wiki-CoE et SlideVQA\n                      par rapport aux approches de référence\n                      fondées sur le texte.",
        ],
        date: "2026 - 1 mois",
      },
      en: {
        title: "Pixel-Level Visual Attribution for iRAG",
        meta: "Scientific paper analysis and presentation - solo project",
        points: [
          "Analyzed and presented the Chain of Evidence paper on visual attribution for iRAG.",
          "Studied vision-language model (VLM) reasoning over document screenshots and pixel-level evidence localization.",
          "Reviewed Wiki-CoE and SlideVQA results against text-based baselines.",
        ],
        date: "2026 - 1 month",
      },
      short: {
        fr: "Comprendre ce que voit l’IA.",
        en: "Understanding what AI sees.",
      },
      url: null,
    },
    {
      id: 3,
      category: "ai",
      tech: "React · Azure AI",
      fr: {
        title: "Microsoft Azure IA Sport",
        meta: "Coach IA multi-agent et prédiction de blessure -\n                    projet seul",
        points: [
          "Mise en place d'un Pipeline Azure Machine Learning de\n                      prédiction de blessure avec endpoint\n                      d'inférence.",
          "Conception d'un Workflow Multi-Agent Azure AI Foundry\n                      routant les demandes vers des agents nutrition, fitness et\n                      FAQ.",
          "Création d'une application React autour d'un coach\n                      sportif IA et d'un tableau de bord de suivi.",
          "Outils utilisés : React, TypeScript, Azure AI\n                      Foundry, Azure Machine Learning, Microsoft Entra ID.",
        ],
        date: "2026 - 2 semaines",
      },
      en: {
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
      short: {
        fr: "Un coach. Plusieurs intelligences.",
        en: "One coach. Multiple intelligences.",
      },
      url: "https://github.com/AkioLua/Microsoft-Azure-IA-Sport",
    },
    {
      id: 4,
      category: "ai",
      tech: "Python · PySR",
      fr: {
        title: "Régression symbolique",
        meta: "Projet de recherche en Intelligence Artificielle - projet\n                    seul",
        points: [
          "Utilisation de PySR pour découvrir des\n                      équations mathématiques avec\n                      complexité de Kolmogorov.",
          "Analyse du front de Pareto\n                      précision-complexité afin d'identifier les\n                      équations optimales.",
          "Comparaison avec la régression polynomiale\n                      classique et les méthodes à noyau afin\n                      d'illustrer le gain en interprétabilité.",
          "Outils utilisés : Python, PySR, NumPy, Pandas,\n                      Scikit-learn.",
        ],
        date: "2026 - 2 semaines",
      },
      en: {
        title: "Symbolic Regression",
        meta: "Research project in artificial intelligence - solo project",
        points: [
          "Used PySR to discover mathematical equations with Kolmogorov complexity.",
          "Analyzed the accuracy-complexity Pareto front to identify the best equations.",
          "Compared with classical polynomial regression and kernel methods to highlight the interpretability gain.",
          "Tools used: Python, PySR, NumPy, Pandas, Scikit-learn.",
        ],
        linkText: "View the GitHub project",
        date: "2026 - 2 weeks",
      },
      short: {
        fr: "Retrouver l’équation cachée.",
        en: "Finding the hidden equation.",
      },
      url: "https://github.com/AkioLua/Symbolic-Equation-Discovery",
    },
    {
      id: 5,
      category: "ai",
      tech: "Python · OR-Tools",
      fr: {
        title: "Planification nutritionnelle",
        meta: "Diet Problem (optimisation sous contraintes) - équipe\n                    de 2 membres",
        points: [
          "Modélisation CP-SAT du Diet Problem comme knapsack\n                      multi-dimensionnel.",
          "Planification de menus hebdomadaires avec contraintes de\n                      variété, budget et saisonnalité,\n                      et préférences utilisateur pondérées.",
          "Comparaison CP-SAT / PLNE avec OR-Tools et benchmark\n                      sur USDA FoodData Central et les apports OMS/ANSES.",
          "Outils utilisés : Python, OR-Tools, JSON, API REST,\n                      Vite, React.",
        ],
        date: "2026 - 2 semaines",
      },
      en: {
        title: "Nutritional Planning",
        meta: "Diet Problem (constraint optimization) - team of 2",
        points: [
          "Modeled the Diet Problem with CP-SAT as a multidimensional knapsack.",
          "Planned weekly menus with variety, budget and seasonality constraints, plus weighted user preferences.",
          "Compared CP-SAT / MILP with OR-Tools and benchmarked with USDA FoodData Central and WHO/ANSES recommendations.",
          "Tools used: Python, OR-Tools, JSON, REST API, Vite, React.",
        ],
        linkText: "View the GitHub project",
        date: "2026 - 2 weeks",
      },
      short: {
        fr: "Mieux manger, sous contraintes.",
        en: "Better meals, within constraints.",
      },
      url: "https://github.com/AkioLua/Planification-nutritionnelle-DIET-Problem",
    },
    {
      id: 6,
      category: "ai",
      tech: "NetLogo",
      fr: {
        title: "Modélisation multi-agents",
        meta: "Projet de modélisation multi-agents - équipe\n                    de 4 membres",
        points: [
          "Implémentation d'agents avec comportements\n                      d'influence et de déplacement.",
          "Ajout de mécanismes de pression sociale et d'effet\n                      boomerang.",
          "Analyse de l'impact des paramètres sur la diffusion\n                      des croyances.",
          "Outils utilisés : NetLogo.",
        ],
        date: "2026 - 2 semaines",
      },
      en: {
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
      short: {
        fr: "Quand les idées se propagent.",
        en: "How ideas spread.",
      },
      url: null,
    },
    {
      id: 7,
      category: "software",
      tech: "Java · Quarkus · Redis",
      fr: {
        title: "TinyX / Epitweet",
        meta: "Projet de systèmes distribués - équipe\n                    de 15 membres",
        points: [
          "Développement de la timeline en Java avec Quarkus\n                      dans une architecture micro-services.",
          "Communication asynchrone via Redis et stockage des\n                      données avec MongoDB.",
          "Mise en place de Dockerfiles multi-stage et de tests\n                      unitaires JUnit.",
          "Outils utilisés : Java, Quarkus, Redis, MongoDB,\n                      Docker, JUnit.",
        ],
        date: "2026 - 1 mois",
      },
      en: {
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
      short: {
        fr: "Connecter, à grande échelle.",
        en: "Connecting, at scale.",
      },
      url: null,
    },
    {
      id: 8,
      category: "software",
      tech: "Java · PostgreSQL",
      fr: {
        title: "Epibazaar",
        meta: "Développement backend d'un jeu vidéo - projet\n                    seul",
        points: [
          "Développement d'une API REST.",
          "Persistance des données avec Hibernate et ORM dans\n                      une base de données.",
          "Messagerie asynchrone avec Kafka.",
          "Outils utilisés : Java, Quarkus, Maven, PostgreSQL,\n                      Git.",
        ],
        date: "2025 - 1 semaine",
      },
      en: {
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
      short: {
        fr: "Les fondations d’un univers.",
        en: "The foundations of a world.",
      },
      url: null,
    },
    {
      id: 9,
      category: "software",
      tech: "C++ · Bison",
      fr: {
        title: "Tiger",
        meta: "Conception d'un compilateur - équipe de 4 membres",
        points: [
          "Implémentation d'un lexer avec RE/flex pour\n                      l'analyse lexicale.",
          "Conception d'un parser pour l'analyse syntaxique et\n                      construction de l'AST.",
          "Implémentation de la liaison des symboles et du\n                      type-checking via le Template Method Pattern.",
          "Outils utilisés : C++, Bison, RE/flex, Git, GitLab,\n                      Autotools, CMake.",
        ],
        date: "2025 - 4 semaines",
      },
      en: {
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
      short: {
        fr: "Du langage à l’exécution.",
        en: "From language to execution.",
      },
      url: null,
    },
    {
      id: 10,
      category: "software",
      tech: "Rust",
      fr: {
        title: "QRCodeur",
        meta: "Générateur et décodeur de QRCode -\n                    équipe de 4 membres",
        points: [
          "Implémentation d'un outil de\n                      génération et lecture de QRCode selon la\n                      norme ISO/IEC 18004.",
          "Finalisation de l'apprentissage du Rust.",
          "Outils utilisés : Rust, Git.",
        ],
        date: "2024 - 1 mois",
      },
      en: {
        title: "QRCodeur",
        meta: "QR code generator and decoder - team of 4",
        points: [
          "Built a QR code generation and reading tool following ISO/IEC 18004.",
          "Finished learning Rust.",
          "Tools used: Rust, Git.",
        ],
        date: "2024 - 1 month",
      },
      short: {
        fr: "Encoder. Décoder. Simplement.",
        en: "Encode. Decode. Simply.",
      },
      url: null,
    },
    {
      id: 11,
      category: "ai",
      tech: "C · Réseaux de neurones",
      fr: {
        title: "Sudoku Solver",
        meta: "Reconnaissance de chiffres manuscrits - équipe de 4\n                    membres",
        points: [
          "Résolution d'un Sudoku à partir d'une image.",
          "Développement d'un réseau de neurones pour\n                      reconnaître les chiffres manuscrits.",
          "Outils utilisés : C, Git.",
        ],
        date: "2023 - 1 mois",
      },
      en: {
        title: "Sudoku Solver",
        meta: "Handwritten digit recognition - team of 4",
        points: [
          "Solved a Sudoku from an image.",
          "Built a neural network to recognize handwritten digits.",
          "Tools used: C, Git.",
        ],
        date: "2023 - 1 month",
      },
      short: {
        fr: "Voir une grille. Trouver la solution.",
        en: "See a grid. Find the solution.",
      },
      url: null,
    },
  ],
  photos: [
    {
      destination: "Philippines",
      label: {
        fr: "Philippines",
        en: "Philippines",
      },
      alt: {
        fr: "Palmiers face à une mer turquoise",
        en: "Palm trees facing a turquoise sea",
      },
      thumb: "assets/photos/philippines-img_1403-thumb.webp",
      large: "assets/photos/philippines-img_1403-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Architecture traditionnelle sous un ciel bleu",
        en: "Traditional architecture under a blue sky",
      },
      thumb: "assets/photos/seoul-img_2038-thumb.webp",
      large: "assets/photos/seoul-img_2038-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Façades colorées le long du canal",
        en: "Colorful facades along the canal",
      },
      thumb: "assets/photos/danemark-img_0817-thumb.webp",
      large: "assets/photos/danemark-img_0817-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Enseignes lumineuses dans la nuit",
        en: "Illuminated signs at night",
      },
      thumb: "assets/photos/taiwan-img_1653-thumb.webp",
      large: "assets/photos/taiwan-img_1653-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "La ville illuminée à l’heure bleue",
        en: "City lights at blue hour",
      },
      thumb: "assets/photos/paris-img_1772-thumb.webp",
      large: "assets/photos/paris-img_1772-large.webp",
      width: 2160,
      height: 2880,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Les détails d’un temple vers le ciel",
        en: "Temple details reaching for the sky",
      },
      thumb: "assets/photos/bangkok-img_2461-thumb.webp",
      large: "assets/photos/bangkok-img_2461-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Philippines",
      label: {
        fr: "Philippines",
        en: "Philippines",
      },
      alt: {
        fr: "Reliefs verdoyants sous les nuages",
        en: "Green hills beneath the clouds",
      },
      thumb: "assets/photos/philippines-img_1349-thumb.webp",
      large: "assets/photos/philippines-img_1349-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Terrasses et végétation en ville",
        en: "Terraces and greenery in the city",
      },
      thumb: "assets/photos/seoul-img_2190-thumb.webp",
      large: "assets/photos/seoul-img_2190-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2492-thumb.webp",
      large: "assets/photos/bangkok-img_2492-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2509-thumb.webp",
      large: "assets/photos/bangkok-img_2509-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2567-thumb.webp",
      large: "assets/photos/bangkok-img_2567-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2598-thumb.webp",
      large: "assets/photos/bangkok-img_2598-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2604-thumb.webp",
      large: "assets/photos/bangkok-img_2604-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2611-thumb.webp",
      large: "assets/photos/bangkok-img_2611-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2651-thumb.webp",
      large: "assets/photos/bangkok-img_2651-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2683-thumb.webp",
      large: "assets/photos/bangkok-img_2683-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Bangkok",
      label: {
        fr: "Bangkok",
        en: "Bangkok",
      },
      alt: {
        fr: "Instant de voyage · Bangkok",
        en: "Travel moment · Bangkok",
      },
      thumb: "assets/photos/bangkok-img_2703-thumb.webp",
      large: "assets/photos/bangkok-img_2703-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0783-thumb.webp",
      large: "assets/photos/danemark-img_0783-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0788-thumb.webp",
      large: "assets/photos/danemark-img_0788-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0795-thumb.webp",
      large: "assets/photos/danemark-img_0795-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0806-thumb.webp",
      large: "assets/photos/danemark-img_0806-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0822-thumb.webp",
      large: "assets/photos/danemark-img_0822-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0833-thumb.webp",
      large: "assets/photos/danemark-img_0833-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0838-thumb.webp",
      large: "assets/photos/danemark-img_0838-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0840-thumb.webp",
      large: "assets/photos/danemark-img_0840-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Danemark",
      label: {
        fr: "Danemark",
        en: "Denmark",
      },
      alt: {
        fr: "Instant de voyage · Danemark",
        en: "Travel moment · Denmark",
      },
      thumb: "assets/photos/danemark-img_0848-thumb.webp",
      large: "assets/photos/danemark-img_0848-large.webp",
      width: 1242,
      height: 2208,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_0052-thumb.webp",
      large: "assets/photos/paris-img_0052-large.webp",
      width: 2160,
      height: 2880,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_0174-thumb.webp",
      large: "assets/photos/paris-img_0174-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_0281-thumb.webp",
      large: "assets/photos/paris-img_0281-large.webp",
      width: 2160,
      height: 2880,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_0297-thumb.webp",
      large: "assets/photos/paris-img_0297-large.webp",
      width: 2160,
      height: 2880,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_0542-thumb.webp",
      large: "assets/photos/paris-img_0542-large.webp",
      width: 2160,
      height: 2880,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_0741-thumb.webp",
      large: "assets/photos/paris-img_0741-large.webp",
      width: 2160,
      height: 2880,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_1869-thumb.webp",
      large: "assets/photos/paris-img_1869-large.webp",
      width: 1080,
      height: 1920,
    },
    {
      destination: "Paris",
      label: {
        fr: "Paris",
        en: "Paris",
      },
      alt: {
        fr: "Instant de voyage · Paris",
        en: "Travel moment · Paris",
      },
      thumb: "assets/photos/paris-img_5540-thumb.webp",
      large: "assets/photos/paris-img_5540-large.webp",
      width: 2160,
      height: 2880,
    },
    {
      destination: "Philippines",
      label: {
        fr: "Philippines",
        en: "Philippines",
      },
      alt: {
        fr: "Instant de voyage · Philippines",
        en: "Travel moment · Philippines",
      },
      thumb:
        "assets/photos/philippines-a3589d74-ae6d-4a4b-bad9-20fa37f6c09a-thumb.webp",
      large:
        "assets/photos/philippines-a3589d74-ae6d-4a4b-bad9-20fa37f6c09a-large.webp",
      width: 1179,
      height: 2026,
    },
    {
      destination: "Philippines",
      label: {
        fr: "Philippines",
        en: "Philippines",
      },
      alt: {
        fr: "Instant de voyage · Philippines",
        en: "Travel moment · Philippines",
      },
      thumb: "assets/photos/philippines-img_1295-thumb.webp",
      large: "assets/photos/philippines-img_1295-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Philippines",
      label: {
        fr: "Philippines",
        en: "Philippines",
      },
      alt: {
        fr: "Instant de voyage · Philippines",
        en: "Travel moment · Philippines",
      },
      thumb: "assets/photos/philippines-img_1314-thumb.webp",
      large: "assets/photos/philippines-img_1314-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Philippines",
      label: {
        fr: "Philippines",
        en: "Philippines",
      },
      alt: {
        fr: "Instant de voyage · Philippines",
        en: "Travel moment · Philippines",
      },
      thumb: "assets/photos/philippines-img_1320-thumb.webp",
      large: "assets/photos/philippines-img_1320-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Philippines",
      label: {
        fr: "Philippines",
        en: "Philippines",
      },
      alt: {
        fr: "Instant de voyage · Philippines",
        en: "Travel moment · Philippines",
      },
      thumb: "assets/photos/philippines-img_1337-thumb.webp",
      large: "assets/photos/philippines-img_1337-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_1990-thumb.webp",
      large: "assets/photos/seoul-img_1990-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_1995-thumb.webp",
      large: "assets/photos/seoul-img_1995-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2002-thumb.webp",
      large: "assets/photos/seoul-img_2002-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2119-thumb.webp",
      large: "assets/photos/seoul-img_2119-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2145-thumb.webp",
      large: "assets/photos/seoul-img_2145-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2179-thumb.webp",
      large: "assets/photos/seoul-img_2179-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2195-thumb.webp",
      large: "assets/photos/seoul-img_2195-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2199-thumb.webp",
      large: "assets/photos/seoul-img_2199-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2246-thumb.webp",
      large: "assets/photos/seoul-img_2246-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2262-thumb.webp",
      large: "assets/photos/seoul-img_2262-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2302-thumb.webp",
      large: "assets/photos/seoul-img_2302-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Seoul",
      label: {
        fr: "Séoul",
        en: "Seoul",
      },
      alt: {
        fr: "Instant de voyage · Séoul",
        en: "Travel moment · Seoul",
      },
      thumb: "assets/photos/seoul-img_2323-thumb.webp",
      large: "assets/photos/seoul-img_2323-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1549-thumb.webp",
      large: "assets/photos/taiwan-img_1549-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1555-thumb.webp",
      large: "assets/photos/taiwan-img_1555-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1629-thumb.webp",
      large: "assets/photos/taiwan-img_1629-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1798-thumb.webp",
      large: "assets/photos/taiwan-img_1798-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1807-thumb.webp",
      large: "assets/photos/taiwan-img_1807-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1832-thumb.webp",
      large: "assets/photos/taiwan-img_1832-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1885-thumb.webp",
      large: "assets/photos/taiwan-img_1885-large.webp",
      width: 2160,
      height: 3840,
    },
    {
      destination: "Taiwan",
      label: {
        fr: "Taïwan",
        en: "Taiwan",
      },
      alt: {
        fr: "Instant de voyage · Taïwan",
        en: "Travel moment · Taiwan",
      },
      thumb: "assets/photos/taiwan-img_1903-thumb.webp",
      large: "assets/photos/taiwan-img_1903-large.webp",
      width: 2160,
      height: 3840,
    },
  ],
};
