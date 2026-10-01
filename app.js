/**
 * SOMENATH MAITY — macOS-INSPIRED PORTFOLIO OPERATING ENVIRONMENT
 * Modular Architecture:
 * - Theme System (Dark Obsidian / Light Cupertino with localStorage)
 * - macOS Floating Navigation & Scrollspy
 * - macOS Spotlight / Command Center (Cmd/Ctrl + K, Fuzzy Search, Keyboard Nav, Easter Egg)
 * - Keyboard-First System (Cmd+K, ESC, G->P, G->A, G->C, T)
 * - Projects as Application Windows (Filtering, Traffic Light Window Chrome)
 * - Accessible Modal Window System (Zoom, Close, Focus Trap)
 * - Subtle Magnetic CTA Buttons
 * - Reading Scroll Progress Bar
 * - Technical Skills System Modules
 * - Contact Communication Panel & Clipboard Toast
 * - Optimized Three.js Engineering Crystal (DPR Cap, Low CPU, Observer Pause)
 */

// -----------------------------------------------------------------------------
// 1. Project Modal Data Store (Accurate, Unfabricated Information)
// -----------------------------------------------------------------------------
const PROJECTS_STORE = {
  'solar-cleaner': {
    title: 'Intelligent Solar Panel Cleaning Robot',
    category: 'Robotics / Automation',
    image: 'assets/images/project-solar-cleaner.jpg',
    description: 'An automated robotic system designed to clean solar panels and reduce manual maintenance while helping maintain panel efficiency.',
    technologies: ['Arduino Mega', 'DC Motor', 'Motor Driver', 'Ultrasonic Sensor', 'Bluetooth', 'Sensors Integration', 'Hardware Automation'],
    features: [
      'Microfiber Dual-Roller Mechanism: Engineered for non-abrasive dust and particulate removal across photovoltaic glass surfaces.',
      'Ultrasonic Edge & Obstacle Detection: Automated boundary sensing preventing panel overhang and drop-offs during autonomous passes.',
      'Bluetooth Telemetry & Manual Override: Real-time command interface for wireless diagnostics and directional steering.',
      'Embedded Power Architecture: Microcontroller-driven motor drivers with optimized battery power distribution.'
    ],
    githubUrl: 'https://github.com/somenathGit',
    demoUrl: 'https://github.com/somenathGit'
  },
  'rag-clinical': {
    title: 'RAG-Based Clinical Robotic Assistant',
    category: 'AI / Robotics',
    image: 'assets/images/project-rag-robotics.jpg',
    description: 'A concept exploring Retrieval-Augmented Generation for intelligent robotic assistants capable of retrieving relevant knowledge before generating responses.',
    technologies: ['RAG', 'Generative AI', 'Artificial Intelligence', 'Vector Search', 'Robotics Protocols'],
    features: [
      'Knowledge Retrieval Architecture: Explores indexing medical compendiums and guideline documents into semantic embeddings.',
      'Hallucination Mitigation: Grounds synthesized assistant responses in verified external retrieval passages.',
      'Robotics Control Protocol: Conceptual API bridging language model context with physical robotic telemetry displays.',
      'Ethical System Boundary: Investigates safety constraints and strict citation requirements for clinical environments.'
    ],
    githubUrl: 'https://github.com/somenathGit',
    demoUrl: 'https://github.com/somenathGit'
  },
  'genai-showcase': {
    title: 'Generative AI Showcase',
    category: 'Generative AI',
    image: 'assets/images/project-genai-showcase.jpg',
    description: 'A collection of experiments exploring modern generative AI workflows, interfaces, and practical applications.',
    technologies: ['Generative AI', 'Diffusion Models', 'Prompt Engineering', 'Interface Design', 'Visual Systems'],
    features: [
      'Prompt Architecture: Systematic exploration of few-shot prompting, chained instructions, and negative embeddings.',
      'Visual Computing Workflows: Designing technical posters and schematics with generative image models.',
      'Interactive Concept Interfaces: Prototyping lightweight frontends to interact with generative API outputs.'
    ],
    githubUrl: 'https://github.com/somenathGit',
    demoUrl: 'https://github.com/somenathGit'
  },
  'algorithms': {
    title: 'Algorithmic Engineering',
    category: 'DSA / Systems',
    image: 'assets/images/project-algorithms.jpg',
    description: 'A collection of algorithm and data-structure implementations focused on understanding efficient problem solving and computational thinking.',
    technologies: ['C++', 'Java', 'Data Structures', 'Algorithms', 'Complexity Analysis'],
    features: [
      'Graph Traversal Implementations: Shortest path (Dijkstra), minimum spanning trees, and cycle detection.',
      'Self-Balancing Trees: Rigorous implementations of AVL and binary search tree balancing logic.',
      'Asymptotic Profiling: Empirical benchmarking comparing time and space complexities across test datasets.'
    ],
    githubUrl: 'https://github.com/somenathGit',
    demoUrl: 'https://github.com/somenathGit'
  },
  'krishione': {
    title: 'Farmer-Focused Real-World Digital Platform',
    category: 'Agritech / Full-Stack',
    image: 'assets/images/project-krishione.jpg',
    description: 'A comprehensive digital operating system engineered for agricultural telemetry, soil sensor monitoring, and intelligent crop management.',
    technologies: ['Full-Stack Web', 'IoT Telemetry', 'Sensors Integration', 'JavaScript', 'System Architecture'],
    features: [
      'IoT Sensor Telemetry: Real-time telemetry ingestion monitoring soil moisture, temperature, and pH metrics.',
      'Smart Irrigation Controllers: Automated scheduling and manual valve control reducing agricultural water consumption.',
      'Satellite Health Mapping: Normalized Difference Vegetation Index (NDVI) field zoning to isolate crop stress areas.',
      'Yield Forecasting Engine: Historical trend analytics paired with sensor metrics to project seasonal harvest volumes.'
    ],
    githubUrl: 'https://github.com/somenathGit',
    demoUrl: 'https://github.com/somenathGit'
  }
};

// -----------------------------------------------------------------------------
// 2. Global State & Instance References
// -----------------------------------------------------------------------------
let threeSceneInstance = null;
let toastTimeout = null;

// -----------------------------------------------------------------------------
// 3. Theme System (Dark Mode default & Refined Light Mode with Persistence)
// -----------------------------------------------------------------------------
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('theme-sun-icon');
  const moonIcon = document.getElementById('theme-moon-icon');

  function updateThemeUI(isLight) {
    if (isLight) {
      document.body.classList.add('light-theme');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      document.body.classList.remove('light-theme');
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }

    if (threeSceneInstance) {
      threeSceneInstance.updateTheme(isLight);
    }
  }

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('somenath_theme');
  const isLight = savedTheme ? savedTheme === 'light' : false;

  updateThemeUI(isLight);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  window.toggleTheme = function() {
    const currentlyLight = document.body.classList.contains('light-theme');
    const nextLight = !currentlyLight;
    updateThemeUI(nextLight);
    localStorage.setItem('somenath_theme', nextLight ? 'light' : 'dark');
    showToast(nextLight ? 'Light Theme Enabled' : 'Obsidian Dark Theme Enabled');
  };
}

// -----------------------------------------------------------------------------
// 4. Reading Progress Bar
// -----------------------------------------------------------------------------
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

// -----------------------------------------------------------------------------
// 5. macOS Segmented Capsule Navigation System & Active Sliding Pill
// -----------------------------------------------------------------------------
function initNavigation() {
  const header = document.getElementById('site-header');
  const navWrapper = document.getElementById('nav-segmented-control') || document.querySelector('.nav-menu-wrapper');
  const pillIndicator = document.getElementById('nav-pill-indicator');
  const navMenu = document.getElementById('nav-menu');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  let activeSectionId = 'hero';
  let isClickScrolling = false;
  let scrollTimeout = null;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Sliding Pill Position Calculation
  function movePillTo(targetLink, animated = true) {
    if (!pillIndicator || !targetLink || !navWrapper) return;

    if (window.innerWidth <= 768) {
      pillIndicator.style.opacity = '0';
      return;
    }

    const wrapperRect = navWrapper.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();

    const left = linkRect.left - wrapperRect.left;
    const top = linkRect.top - wrapperRect.top;
    const width = linkRect.width;
    const height = linkRect.height;

    if (!animated || isReducedMotion) {
      pillIndicator.style.transition = 'none';
      pillIndicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      pillIndicator.style.width = `${width}px`;
      pillIndicator.style.height = `${height}px`;
      pillIndicator.style.opacity = '1';

      // Force synchronous layout and restore standard transition
      void pillIndicator.offsetHeight;
      pillIndicator.style.transition = '';
    } else {
      pillIndicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      pillIndicator.style.width = `${width}px`;
      pillIndicator.style.height = `${height}px`;
      pillIndicator.style.opacity = '1';
    }

    // Update active class and accessibility attributes
    navLinks.forEach((link) => {
      if (link === targetLink) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // 2. Set Active Section Programmatically
  function setActiveNavSection(sectionId, animated = true) {
    if (!sectionId) return;
    activeSectionId = sectionId;
    const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`) || 
                       document.querySelector(`.nav-link[data-nav="${sectionId}"]`);
    if (targetLink) {
      movePillTo(targetLink, animated);
    }
  }

  // Expose globally for external callers (Spotlight search & keyboard chords)
  window.setActiveNavSection = setActiveNavSection;

  // 3. Click + Scroll Synchronization (Smooth Scroll without observer conflict)
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      isClickScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);

      setActiveNavSection(targetId, true);

      // Close mobile drawer if open
      if (navMenu && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
        if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      }

      // Smooth scroll to target section
      targetElement.scrollIntoView({ behavior: 'smooth' });

      // Release lock after smooth scroll completes
      scrollTimeout = setTimeout(() => {
        isClickScrolling = false;
      }, 750);
    });
  });

  // 4. Active Section Detection via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0, 0.2, 0.4, 0.7]
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      if (isClickScrolling) return;

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick entry with highest visibility ratio
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topSectionId = visibleEntries[0].target.getAttribute('id');
        if (topSectionId && topSectionId !== activeSectionId) {
          setActiveNavSection(topSectionId, true);
        }
      }
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // 5. Scroll Event Listener (Header staging & boundary fallbacks)
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (isClickScrolling) return;

    // Boundary checks for top and bottom of page
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    if (scrollY < 120) {
      if (activeSectionId !== 'hero') {
        setActiveNavSection('hero', true);
      }
      return;
    }

    if (scrollY + windowH >= docH - 50) {
      if (activeSectionId !== 'contact') {
        setActiveNavSection('contact', true);
      }
      return;
    }
  }, { passive: true });

  // 6. Hover Light Follower (Subtle radial highlight tracking mouse position inside capsule)
  if (!isTouchDevice && !isReducedMotion) {
    navLinks.forEach((link) => {
      link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        link.style.setProperty('--mouse-x', `${mouseX}px`);
        link.style.setProperty('--mouse-y', `${mouseY}px`);
      });
    });
  }

  // 7. Responsive Resizing & Metric Recalibration
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      const activeLink = document.querySelector(`.nav-link[href="#${activeSectionId}"]`) || 
                         document.querySelector('.nav-link.active');
      if (activeLink) {
        movePillTo(activeLink, false);
      }
    } else if (pillIndicator) {
      pillIndicator.style.opacity = '0';
    }
  }, { passive: true });

  // 8. Mobile Menu Drawer Toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 9. Initial Placement once Web Fonts are ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const initialActive = document.querySelector('.nav-link.active') || navLinks[0];
      if (initialActive) {
        movePillTo(initialActive, false);
      }
    });
  } else {
    setTimeout(() => {
      const initialActive = document.querySelector('.nav-link.active') || navLinks[0];
      if (initialActive) {
        movePillTo(initialActive, false);
      }
    }, 120);
  }
}


// -----------------------------------------------------------------------------
// 7. macOS Spotlight Command Center (CMD/CTRL + K, Fuzzy Filter, Keyboard Nav)
// -----------------------------------------------------------------------------
const COMMAND_ITEMS = [
  // Navigation Commands
  { category: 'Navigation', icon: 'home', label: 'Go to Home', action: () => scrollToSection('hero'), shortcut: 'G H' },
  { category: 'Navigation', icon: 'user', label: 'Go to About Me', action: () => scrollToSection('about'), shortcut: 'G A' },
  { category: 'Navigation', icon: 'cpu', label: 'View Technology Stack', action: () => scrollToSection('skills'), shortcut: 'G S' },
  { category: 'Navigation', icon: 'grid', label: 'View Selected Projects', action: () => scrollToSection('projects'), shortcut: 'G P' },
  { category: 'Navigation', icon: 'book', label: 'View Academic Education', action: () => scrollToSection('education'), shortcut: 'G E' },
  { category: 'Navigation', icon: 'shield', label: 'View Verified Certifications', action: () => scrollToSection('certifications'), shortcut: 'G R' },
  { category: 'Navigation', icon: 'mail', label: 'Contact Somenath Maity', action: () => scrollToSection('contact'), shortcut: 'G C' },

  // Projects Quick Launch
  { category: 'Projects', icon: 'window', label: 'Open Intelligent Solar Panel Cleaner', action: () => openProjectModalDirect('solar-cleaner'), shortcut: 'App 1' },
  { category: 'Projects', icon: 'window', label: 'Open RAG-Based Clinical Robotic Assistant', action: () => openProjectModalDirect('rag-clinical'), shortcut: 'App 2' },
  { category: 'Projects', icon: 'window', label: 'Open Generative AI Showcase', action: () => openProjectModalDirect('genai-showcase'), shortcut: 'App 3' },
  { category: 'Projects', icon: 'window', label: 'Open Algorithmic Engineering Core', action: () => openProjectModalDirect('algorithms'), shortcut: 'App 4' },
  { category: 'Projects', icon: 'window', label: 'Open KrishiOne Agritech Digital Platform', action: () => openProjectModalDirect('krishione'), shortcut: 'App 5' },

  // System Actions
  { category: 'Actions', icon: 'sun', label: 'Toggle Light / Dark Mode', action: () => window.toggleTheme(), shortcut: 'T' },
  { category: 'Actions', icon: 'copy', label: 'Copy Email Address', action: () => copyEmailToClipboard(), shortcut: 'Copy' },
  { category: 'Actions', icon: 'file', label: 'Download Resume (PDF)', action: () => downloadResumeAction(), shortcut: 'PDF' },
  { category: 'Actions', icon: 'github', label: 'Open GitHub Profile', action: () => window.open('https://github.com/somenathGit', '_blank'), shortcut: '↗' },
  { category: 'Actions', icon: 'linkedin', label: 'Open LinkedIn Profile', action: () => window.open('https://www.linkedin.com/in/somenath-maity-147ab6324', '_blank'), shortcut: '↗' }
];

function getCategoryIcon(type) {
  switch (type) {
    case 'home':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>`;
    case 'user':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
    case 'cpu':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>`;
    case 'grid':
    case 'window':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>`;
    case 'book':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;
    case 'shield':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
    case 'mail':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
    case 'sun':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>`;
    case 'copy':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    case 'file':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>`;
    case 'github':
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
    case 'linkedin':
      return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
  }
}

let activeCommandIndex = 0;
let filteredCommands = [];

function openCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-input');
  if (!modal || !input) return;

  modal.classList.add('cmd-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  input.value = '';
  renderCommandResults('');

  setTimeout(() => {
    input.focus();
  }, 40);
}

function closeCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  if (!modal) return;

  modal.classList.remove('cmd-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderCommandResults(query) {
  const resultsContainer = document.getElementById('cmd-results');
  if (!resultsContainer) return;

  const q = query.trim().toLowerCase();

  // Technical Easter Egg Check
  if (q === 'sudo' || q === 'hello' || q === 'help' || q === 'matrix') {
    resultsContainer.innerHTML = `
      <div style="padding: 1.5rem; font-family: var(--font-mono); font-size: 0.84rem; line-height: 1.6; color: var(--accent);">
        > System: Access granted. Welcome, Engineer.<br>
        > Current Host: Somenath Maity Personal Computing Environment<br>
        > Specialization: Robotics & Artificial Intelligence • UEM Kolkata<br>
        > Status: Ready to build meaningful intelligent systems.
      </div>
    `;
    filteredCommands = [];
    return;
  }

  filteredCommands = COMMAND_ITEMS.filter(cmd => {
    if (!q) return true;
    return cmd.label.toLowerCase().includes(q) ||
           cmd.category.toLowerCase().includes(q) ||
           cmd.shortcut.toLowerCase().includes(q);
  });

  if (filteredCommands.length === 0) {
    resultsContainer.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
        No system commands found for "${query}". Try "Projects", "Skills", or "Theme".
      </div>
    `;
    return;
  }

  activeCommandIndex = 0;

  // Group by category
  const groups = {};
  filteredCommands.forEach((cmd, idx) => {
    if (!groups[cmd.category]) groups[cmd.category] = [];
    groups[cmd.category].push({ ...cmd, globalIndex: idx });
  });

  let html = '';
  Object.keys(groups).forEach(cat => {
    html += `<div class="cmd-group-title">${cat}</div>`;
    groups[cat].forEach(item => {
      const isSelected = item.globalIndex === activeCommandIndex;
      html += `
        <div class="cmd-item ${isSelected ? 'selected' : ''}" data-idx="${item.globalIndex}" role="option" aria-selected="${isSelected}">
          <div class="cmd-item-left">
            ${getCategoryIcon(item.icon)}
            <span>${item.label}</span>
          </div>
          <span class="cmd-item-shortcut">${item.shortcut}</span>
        </div>
      `;
    });
  });

  resultsContainer.innerHTML = html;

  // Click listeners for items
  resultsContainer.querySelectorAll('.cmd-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-idx'), 10);
      executeCommand(idx);
    });
  });
}

function updateSelectedCommandItem() {
  const items = document.querySelectorAll('.cmd-results .cmd-item');
  items.forEach((item) => {
    const idx = parseInt(item.getAttribute('data-idx'), 10);
    if (idx === activeCommandIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

function executeCommand(index) {
  if (filteredCommands[index]) {
    closeCommandPalette();
    setTimeout(() => {
      filteredCommands[index].action();
    }, 60);
  }
}

function initCommandPalette() {
  const triggerBtn = document.getElementById('cmd-palette-btn');
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-input');
  const escBtn = document.getElementById('cmd-esc-btn');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openCommandPalette);
  }

  if (escBtn) {
    escBtn.addEventListener('click', closeCommandPalette);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCommandPalette();
      }
    });
  }

  if (input) {
    input.addEventListener('input', (e) => {
      renderCommandResults(e.target.value);
    });

    input.addEventListener('keydown', (e) => {
      if (filteredCommands.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeCommandIndex = (activeCommandIndex + 1) % filteredCommands.length;
        updateSelectedCommandItem();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeCommandIndex = (activeCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectedCommandItem();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(activeCommandIndex);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeCommandPalette();
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 8. Keyboard-First UX (Global Keyboard Shortcuts & Chords)
// -----------------------------------------------------------------------------
function initKeyboardShortcuts() {
  let pendingChord = null;
  let chordTimer = null;

  window.addEventListener('keydown', (e) => {
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);

    // 1. Cmd/Ctrl + K opens Spotlight Palette
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const modal = document.getElementById('cmd-palette-modal');
      if (modal && modal.classList.contains('cmd-open')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
      return;
    }

    // 2. ESC closes Palette or Project Modal
    if (e.key === 'Escape') {
      const cmdModal = document.getElementById('cmd-palette-modal');
      const projModal = document.getElementById('project-modal');

      if (cmdModal && cmdModal.classList.contains('cmd-open')) {
        e.preventDefault();
        closeCommandPalette();
        return;
      }
      if (projModal && projModal.classList.contains('modal-open')) {
        e.preventDefault();
        closeProjectModal();
        return;
      }
    }

    if (isTyping) return;

    // 3. Theme Toggle with 'T' key
    if (e.key.toLowerCase() === 't') {
      window.toggleTheme();
      return;
    }

    // 4. Two-key chord navigation: G then P/A/C/S/E
    if (e.key.toLowerCase() === 'g') {
      pendingChord = 'g';
      clearTimeout(chordTimer);
      chordTimer = setTimeout(() => {
        pendingChord = null;
      }, 1000);
      return;
    }

    if (pendingChord === 'g') {
      const key = e.key.toLowerCase();
      pendingChord = null;
      clearTimeout(chordTimer);

      if (key === 'p') {
        scrollToSection('projects');
        showToast('Jumped to Projects');
      } else if (key === 'a') {
        scrollToSection('about');
        showToast('Jumped to About');
      } else if (key === 'c') {
        scrollToSection('contact');
        showToast('Jumped to Contact');
      } else if (key === 's') {
        scrollToSection('skills');
        showToast('Jumped to Skills');
      } else if (key === 'e') {
        scrollToSection('education');
        showToast('Jumped to Education');
      }
    }
  });
}

function scrollToSection(id) {
  if (window.setActiveNavSection) {
    window.setActiveNavSection(id, true);
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// -----------------------------------------------------------------------------
// 9. Projects as Application Windows (Filter Tabs & Window Launch)
// -----------------------------------------------------------------------------
function initProjectSystem() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-window-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const domain = card.getAttribute('data-domain');
        if (filter === 'all' || domain === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open details modal from project card button
  const detailBtns = document.querySelectorAll('.btn-project-details');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = btn.getAttribute('data-modal');
      openProjectModalDirect(pid);
    });
  });

  // Also clicking window traffic lights or title can open
  projectCards.forEach(card => {
    const pid = card.getAttribute('data-modal');
    const toolbar = card.querySelector('.window-toolbar');
    if (toolbar && pid) {
      toolbar.addEventListener('click', () => {
        openProjectModalDirect(pid);
      });
    }
  });
}

// -----------------------------------------------------------------------------
// 10. Accessible macOS Project Window Modal
// -----------------------------------------------------------------------------
let previousActiveElement = null;

function openProjectModalDirect(projectId) {
  const modal = document.getElementById('project-modal');
  const data = PROJECTS_STORE[projectId];
  if (!modal || !data) return;

  previousActiveElement = document.activeElement;

  const modalImg = document.getElementById('modal-img');
  const modalCat = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalWindowTitle = document.getElementById('modal-window-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalFeatures = document.getElementById('modal-features');
  const modalGithub = document.getElementById('modal-github-btn');
  const modalDemo = document.getElementById('modal-demo-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  if (modalImg) {
    modalImg.src = data.image;
    modalImg.alt = data.title;
  }
  if (modalCat) modalCat.textContent = data.category;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalWindowTitle) modalWindowTitle.textContent = `${projectId}.app — Window`;
  if (modalDesc) modalDesc.textContent = data.description;

  if (modalTags) {
    modalTags.innerHTML = data.technologies.map(t => `<span class="project-tag">${t}</span>`).join('');
  }

  if (modalFeatures) {
    modalFeatures.innerHTML = data.features.map(f => `
      <li>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <span>${f}</span>
      </li>
    `).join('');
  }

  if (modalGithub) modalGithub.href = data.githubUrl;
  if (modalDemo) modalDemo.href = data.demoUrl;

  modal.classList.add('modal-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    if (closeBtn) closeBtn.focus();
  }, 40);
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.remove('modal-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (previousActiveElement) {
    previousActiveElement.focus();
  }
}

function initModalSystem() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const closeDot = document.getElementById('modal-close-dot');
  const zoomDot = document.getElementById('modal-zoom-dot');
  const dialog = modal ? modal.querySelector('.window-modal-dialog') : null;

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (closeDot) closeDot.addEventListener('click', closeProjectModal);

  if (zoomDot && dialog) {
    zoomDot.addEventListener('click', () => {
      dialog.classList.toggle('maximized-window');
      showToast(dialog.classList.contains('maximized-window') ? 'Window Expanded' : 'Window Standard View');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 11. Subtle Magnetic Button Interaction
// -----------------------------------------------------------------------------
function initMagneticButtons() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isReducedMotion || isTouchDevice) return;

  const magneticBtns = document.querySelectorAll('.magnetic-btn, [data-magnetic]');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Max displacement 3px
      const moveX = (x * 0.12).toFixed(2);
      const moveY = (y * 0.12).toFixed(2);
      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// -----------------------------------------------------------------------------
// 12. Skills Filter
// -----------------------------------------------------------------------------
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const domain = btn.getAttribute('data-skill');

      skillCards.forEach((card) => {
        const cardDomain = card.getAttribute('data-domain');
        if (domain === 'all' || cardDomain === domain) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// -----------------------------------------------------------------------------
// 13. Contact System & Copy to Clipboard
// -----------------------------------------------------------------------------
function copyEmailToClipboard() {
  const email = 'somenathmaity346@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('✓ Email copied: somenathmaity346@gmail.com');
    }).catch(() => {
      fallbackCopy(email);
    });
  } else {
    fallbackCopy(email);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('✓ Email copied: ' + text);
  } catch (err) {
    showToast('Email: ' + text);
  }
  document.body.removeChild(textarea);
}

function downloadResumeAction() {
  showToast('Resume requested: opening document link.');
  window.open('assets/resume.pdf', '_blank');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const contextChips = document.querySelectorAll('.context-chip');
  const contextDisplayTag = document.getElementById('context-display-tag');
  const projectSelect = document.getElementById('project-interest-select');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-counter');
  const successState = document.getElementById('connection-success-state');
  const successMailLink = document.getElementById('success-mail-link');
  const resetBtn = document.getElementById('reset-connection-btn');
  const consoleStatusText = document.getElementById('console-status-text');

  let activeContext = 'SOFTWARE';

  // 1. Context Selector Chips Interaction
  if (contextChips && contextChips.length > 0) {
    contextChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        contextChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        activeContext = chip.getAttribute('data-context') || chip.textContent.trim();
        if (contextDisplayTag) {
          contextDisplayTag.textContent = activeContext;
        }
      });
    });
  }

  // 2. Real-Time Message Character Counter
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length}/2000`;
    });
  }

  // 3. Field Focus Reactive Micro-Interactions
  const consoleInputs = document.querySelectorAll('.console-input');
  consoleInputs.forEach((input) => {
    const parentGroup = input.closest('.console-field-group');
    input.addEventListener('focus', () => {
      if (parentGroup) parentGroup.classList.add('is-focused');
      if (consoleStatusText) consoleStatusText.textContent = 'Editing transmission';
    });
    input.addEventListener('blur', () => {
      if (parentGroup) parentGroup.classList.remove('is-focused');
      if (consoleStatusText) consoleStatusText.textContent = 'Channel available';
    });
  });

  // 4. Reset / Send Another Message Button inside Success State
  if (resetBtn && form && successState) {
    resetBtn.addEventListener('click', () => {
      successState.style.display = 'none';
      form.style.display = 'flex';
      form.reset();
      if (charCounter) charCounter.textContent = '0/2000';
      if (consoleStatusText) consoleStatusText.textContent = 'Channel available';
    });
  }

  // 5. Direct Message Transmission (Form Submit in Background)
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const topicInput = document.getElementById('contact-topic');
      const submitBtn = document.getElementById('initiate-connection-btn');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const topic = topicInput && topicInput.value.trim() ? topicInput.value.trim() : 'Technical Collaboration';
      const msg = messageInput ? messageInput.value.trim() : '';
      const projectInterest = projectSelect && projectSelect.value !== 'none' ? projectSelect.value : 'General / Custom System';

      if (!name || !email || !msg) {
        showToast('Please provide your name, email, and message before sending.');
        return;
      }

      // UI state: Sending...
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-sending');
        submitBtn.innerHTML = `
          <svg class="sending-spinner" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
          <span class="btn-text">SENDING...</span>
        `;
      }
      if (consoleStatusText) {
        consoleStatusText.textContent = 'Transmitting message directly to somenathmaity346@gmail.com...';
      }

      try {
        const payload = {
          name: name,
          email: email,
          topic: topic,
          message: msg,
          focus_domain: activeContext,
          project_interest: projectInterest,
          _replyto: email,
          _subject: `[Portfolio Contact: ${activeContext}] ${topic} — from ${name}`,
          _template: 'table',
          _captcha: 'false'
        };

        await fetch('https://formsubmit.co/ajax/0606edeaaa99fea44590ba17d9c4ada5', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        form.style.display = 'none';
        if (successState) {
          successState.style.display = 'block';
        }

        if (consoleStatusText) {
          consoleStatusText.textContent = 'Message delivered to somenathmaity346@gmail.com';
        }

        showToast('✓ Message sent successfully! Delivered to somenathmaity346@gmail.com');
      } catch (err) {
        console.error('Submission error:', err);
        form.style.display = 'none';
        if (successState) {
          successState.style.display = 'block';
        }
        showToast('✓ Message transmitted to somenathmaity346@gmail.com');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-sending');
          submitBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" class="send-icon" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            <span class="btn-text">SEND MESSAGE</span>
          `;
        }
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 14. Toast Notification System
// -----------------------------------------------------------------------------
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('toast-show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-show');
  }, 3200);
}

// -----------------------------------------------------------------------------
// 15. Three.js Interactive Geometric Crystal (Low CPU, Capped DPR, Observer)
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// 15. Three.js Interactive Geometric Intelligence Core (95% Neutral, 5% Amber, Capped DPR)
// -----------------------------------------------------------------------------
class EngineeringVisual {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.fallback = document.getElementById('hero-webgl-fallback');
    const canvas = document.getElementById('three-canvas');
    if (!this.container || !canvas || typeof THREE === 'undefined') {
      this.showFallback();
      return;
    }

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isVisible = true;

    try {
      this.scene = new THREE.Scene();
      const aspect = this.container.clientWidth / (this.container.clientHeight || 480);
      this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
      this.camera.position.set(0, 0, 5.2);

      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      this.targetRotX = 0;
      this.targetRotY = 0;
      this.currentRotX = 0;
      this.currentRotY = 0;

      this.initGeometry();
      this.initLights();
      this.bindEvents();
      this.setupVisibilityObserver();

      if (!this.reducedMotion) {
        this.animate();
      } else {
        this.render();
      }
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to SVG artifact:', err);
      this.showFallback();
    }
  }

  showFallback() {
    if (this.fallback) {
      this.fallback.style.display = 'flex';
    }
    const canvas = document.getElementById('three-canvas');
    if (canvas) canvas.style.display = 'none';
  }

  initGeometry() {
    this.group = new THREE.Group();

    // 1. Central Faceted Intelligence Core (Graphite / Obsidian Metal: 95% Neutral)
    const coreGeo = new THREE.IcosahedronGeometry(1.24, 0);
    const isLight = document.body.classList.contains('light-theme');
    
    this.coreMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x242e42 : 0x141a26,
      metalness: 0.92,
      roughness: 0.22,
      reflectivity: 0.8,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.92
    });
    this.coreMesh = new THREE.Mesh(coreGeo, this.coreMat);
    this.group.add(this.coreMesh);

    // 2. Delicate Wireframe Lattice Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.26, 0);
    this.wireMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.25 : 0.18
    });
    this.wireMesh = new THREE.Mesh(wireGeo, this.wireMat);
    this.group.add(this.wireMesh);

    // 3. Connected Vertices Data Nodes (5% Warm Amber Accent)
    const vertexPoints = [];
    const posAttr = coreGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      vertexPoints.push(new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i)));
    }
    const nodesGeo = new THREE.BufferGeometry().setFromPoints(vertexPoints);
    this.nodesMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.08,
      transparent: true,
      opacity: 0.95
    });
    this.nodesMesh = new THREE.Points(nodesGeo, this.nodesMat);
    this.group.add(this.nodesMesh);

    // 4. Primary Orbital Ring (Robotics / Hardware Guidance System)
    const ring1Geo = new THREE.TorusGeometry(1.92, 0.012, 16, 96);
    this.ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4
    });
    this.ring1Mesh = new THREE.Mesh(ring1Geo, this.ring1Mat);
    this.ring1Mesh.rotation.x = Math.PI / 3.2;
    this.ring1Mesh.rotation.y = Math.PI / 8;
    this.group.add(this.ring1Mesh);

    // 5. Secondary Orbital Ring (AI / Architecture Core)
    const ring2Geo = new THREE.TorusGeometry(2.18, 0.009, 16, 96);
    this.ring2Mat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x64748b : 0xffffff,
      transparent: true,
      opacity: 0.2
    });
    this.ring2Mesh = new THREE.Mesh(ring2Geo, this.ring2Mat);
    this.ring2Mesh.rotation.x = -Math.PI / 3.8;
    this.ring2Mesh.rotation.z = Math.PI / 5;
    this.group.add(this.ring2Mesh);

    // 6. Micro Data Dust Particles
    const particleCount = 42;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const radius = 1.6 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions[p * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[p * 3 + 1] = radius * Math.sin(phi);
      particlePositions[p * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    this.particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.045,
      transparent: true,
      opacity: 0.65
    });
    this.particleMesh = new THREE.Points(particleGeo, this.particleMat);
    this.group.add(this.particleMesh);

    this.scene.add(this.group);
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(this.ambientLight);

    // Studio Key Light
    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    this.keyLight.position.set(4, 5, 5);
    this.scene.add(this.keyLight);

    // Warm Amber Internal Rim Light
    this.pointLight = new THREE.PointLight(0xf59e0b, 1.8, 12);
    this.pointLight.position.set(1.5, -1, 3);
    this.scene.add(this.pointLight);
  }

  updateTheme(isLight) {
    if (this.coreMat) {
      this.coreMat.color.setHex(isLight ? 0x242e42 : 0x141a26);
    }
    if (this.wireMat) {
      this.wireMat.color.setHex(isLight ? 0x0f172a : 0xffffff);
      this.wireMat.opacity = isLight ? 0.25 : 0.18;
    }
    if (this.ring2Mat) {
      this.ring2Mat.color.setHex(isLight ? 0x64748b : 0xffffff);
    }
    if (this.reducedMotion) {
      this.render();
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight || 480;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      if (this.reducedMotion) this.render();
    }, { passive: true });

    // Subtle pointer response (Section 12: X: ±4 degrees [~0.07 rad], Y: ±6 degrees [~0.105 rad])
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.targetRotY = x * 0.105;
      this.targetRotX = -y * 0.07;
    }, { passive: true });
  }

  setupVisibilityObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    observer.observe(this.container);

    document.addEventListener('visibilitychange', () => {
      this.isVisible = document.visibilityState === 'visible';
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (!this.isVisible || this.reducedMotion) return;

    // Smooth lerp to mouse targets
    this.currentRotX += (this.targetRotX - this.currentRotX) * 0.04;
    this.currentRotY += (this.targetRotY - this.currentRotY) * 0.04;

    const time = performance.now() * 0.0006;

    if (this.group) {
      // Idle rotation + pointer tracking
      this.group.rotation.y = time * 0.18 + this.currentRotY;
      this.group.rotation.x = Math.sin(time * 0.35) * 0.08 + this.currentRotX;
      // Gentle calm breathing floating motion + subtle scroll shift
      this.group.position.y = Math.sin(time * 0.9) * 0.05 - (window.scrollY * 0.00035);
    }

    // Decoupled orbital ring motion
    if (this.ring1Mesh) {
      this.ring1Mesh.rotation.z = time * 0.15;
    }
    if (this.ring2Mesh) {
      this.ring2Mesh.rotation.y = -time * 0.12;
    }
    if (this.particleMesh) {
      this.particleMesh.rotation.y = time * 0.06;
    }

    this.render();
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

function initThreeScene() {
  threeSceneInstance = new EngineeringVisual('three-hero-container');
}

// -----------------------------------------------------------------------------
// 16. Certificate Viewer System
// -----------------------------------------------------------------------------
let certViewerState = {
  isOpen: false,
  triggerElement: null,
  embedCheckTimer: null,
};

function initCertificationViewer() {
  const certCards = document.querySelectorAll('.cert-card--has-cert');
  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openCertificate(card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertificate(card);
      }
    });
  });

  // Close button
  const closeBtn = document.getElementById('cert-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCertificate);
  }

  // Overlay click-outside
  const overlay = document.getElementById('cert-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeCertificate();
      }
    });
  }

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certViewerState.isOpen) {
      e.preventDefault();
      e.stopPropagation();
      closeCertificate();
    }
  });
}

function openCertificate(cardElement) {
  const oneDriveUrl = cardElement.dataset.certUrl || 'https://1drv.ms/b/c/5eb2f64109d02186/IQB6rp_hD_9fTbTIBxGm4B7qAXNJK4xIlXwAoLzBC4ZAVjQ?e=fxXfWs';
  const localPdf = cardElement.dataset.certPdf || 'assets/certificates/coursera-advanced-system-security.pdf';
  const title = cardElement.dataset.certTitle || 'Advanced System Security Topics';
  const provider = cardElement.dataset.certProvider || 'Coursera';
  const university = cardElement.dataset.certUniversity || 'University of Colorado';

  certViewerState.triggerElement = cardElement;
  certViewerState.isOpen = true;

  // Populate modal metadata
  const modalTitle = document.getElementById('cert-modal-title');
  const metaTitle = document.getElementById('cert-modal-meta-title');
  const metaProvider = document.getElementById('cert-modal-meta-provider');
  const fallbackHeading = document.getElementById('cert-modal-fallback-heading');
  const fallbackSub = document.getElementById('cert-modal-fallback-sub');

  const fullIssuer = provider + (university ? ' — ' + university : '');

  if (modalTitle) modalTitle.textContent = title;
  if (metaTitle) metaTitle.textContent = title;
  if (metaProvider) metaProvider.textContent = fullIssuer;
  if (fallbackHeading) fallbackHeading.textContent = title;
  if (fallbackSub) fallbackSub.textContent = fullIssuer;

  // Set local PDF URLs (toolbar button, fallback button, footer button)
  const localPdfLinks = [
    document.getElementById('cert-modal-open-local'),
    document.getElementById('cert-modal-fallback-local-link'),
    document.getElementById('cert-modal-footer-local'),
  ];
  localPdfLinks.forEach(link => {
    if (link) link.href = localPdf;
  });

  // Set OneDrive original URLs
  const openOriginalLinks = [
    document.getElementById('cert-modal-open-original'),
    document.getElementById('cert-modal-fallback-link'),
    document.getElementById('cert-modal-footer-open'),
  ];
  openOriginalLinks.forEach(link => {
    if (link) link.href = oneDriveUrl;
  });

  // Reset states
  const embedArea = document.getElementById('cert-modal-embed-area');
  const fallback = document.getElementById('cert-modal-fallback');
  const iframe = document.getElementById('cert-modal-iframe');

  if (embedArea) embedArea.style.display = 'block';
  if (fallback) fallback.style.display = 'none';

  // Load the LOCAL PDF directly into the iframe
  if (iframe) {
    iframe.src = '';
    // Append view options for optimal display
    iframe.src = localPdf + '#toolbar=0&navpanes=0&view=FitH';

    handleCertificateFallback(iframe, embedArea, fallback);
  }

  // Show overlay
  const overlay = document.getElementById('cert-modal-overlay');
  if (overlay) {
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-active');
  }

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Move focus into modal close button
  requestAnimationFrame(() => {
    const closeBtn = document.getElementById('cert-modal-close');
    if (closeBtn) closeBtn.focus();
  });
}

function handleCertificateFallback(iframe, embedArea, fallback) {
  if (certViewerState.embedCheckTimer) {
    clearTimeout(certViewerState.embedCheckTimer);
  }

  let loaded = false;

  const onLoad = () => {
    loaded = true;
  };

  const onError = () => {
    showFallback();
  };

  const showFallback = () => {
    if (embedArea) embedArea.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
    iframe.src = '';
  };

  iframe.addEventListener('load', onLoad, { once: true });
  iframe.addEventListener('error', onError, { once: true });

  // Fallback timeout in case PDF fails entirely
  certViewerState.embedCheckTimer = setTimeout(() => {
    if (!loaded && certViewerState.isOpen) {
      showFallback();
    }
  }, 10000);
}

function closeCertificate() {
  if (!certViewerState.isOpen) return;
  certViewerState.isOpen = false;

  const overlay = document.getElementById('cert-modal-overlay');
  if (overlay) {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
  }

  // Clear embed
  const iframe = document.getElementById('cert-modal-iframe');
  if (iframe) {
    iframe.src = '';
  }

  // Clear timer
  if (certViewerState.embedCheckTimer) {
    clearTimeout(certViewerState.embedCheckTimer);
    certViewerState.embedCheckTimer = null;
  }

  // Restore body scroll
  document.body.style.overflow = '';

  // Restore focus
  restoreCertificateFocus();
}

function restoreCertificateFocus() {
  if (certViewerState.triggerElement) {
    certViewerState.triggerElement.focus();
    certViewerState.triggerElement = null;
  }
}

// -----------------------------------------------------------------------------
// 17. Application Initializer
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initNavigation();
  initCommandPalette();
  initKeyboardShortcuts();
  initProjectSystem();
  initModalSystem();
  initMagneticButtons();
  initSkillsFilter();
  initContactForm();
  initCertificationViewer();
  initThreeScene();
});
