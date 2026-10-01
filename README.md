# Somenath Maity — Personal Developer Portfolio

A production-quality personal portfolio engineered for **Somenath Maity**, third-year Computer Science & Engineering undergraduate specializing in **Robotics & Artificial Intelligence** at the **University of Engineering & Management, Kolkata (UEM Kolkata)**.

Engineered with a modern **Obsidian Engineering** aesthetic, real-time **Three.js 3D WebGL** crystal visualization, interactive capability matrix, accessible project modals, and a dual **Dark/Light theme system**.

---

## ⚡ Core Features

- **Obsidian Engineering Aesthetic**: Technical, minimalist, cinematic dark mode with subtle metallic surfaces, razor-thin borders, and generous whitespace.
- **Dual Theme System**: Full Dark mode (Obsidian default) and an architectural Light mode with persistent state saved in `localStorage`.
- **Three.js 3D Engineering Object**: Lightweight, interactive wireframe crystal with interconnected vertex nodes that responds subtly to mouse coordinates and scroll position. Automatically pauses when out of view or tab is hidden for zero unnecessary CPU load.
- **Accessible Project Architecture Modals**: High-resolution project visual showcase with keyboard navigation (`ESC` to close, focus management, click-outside-to-close).
- **Interactive Skills System**: Real, unfabricated skill categories (Programming, Web, AI / ML, Robotics, Tools) with interactive category filters. No misleading percentage bars.
- **Zero Heavy Framework Bloat**: Pure semantic HTML5, Vanilla CSS design tokens, and modular JavaScript without heavy bundle overhead.
- **Zero-Dependency Local Server**: Built-in Node.js server with auto-port conflict detection and graceful fallback.

---

## 🛠️ Tech Stack

- **Markup**: Semantic HTML5 with complete OpenGraph metadata, Twitter Cards, and schema.org JSON-LD structured data.
- **Styling**: Vanilla CSS3 using custom properties (`--bg-primary`, `--surface`, `--accent`, `--border`), responsive layouts across 375px–1440px+, and `prefers-reduced-motion` support.
- **Logic & Visuals**: Vanilla JavaScript (ES6+), Three.js (WebGL 3D rendering), IntersectionObserver for performance.
- **Dev Environment**: Zero-dependency Node.js HTTP server.

---

## 📁 Folder Structure

```text
portfolio/
├── assets/
│   ├── images/
│   │   ├── project-solar-cleaner.jpg    # Intelligent Solar Panel Cleaning Robot
│   │   ├── project-rag-robotics.jpg     # RAG-Based Clinical Robotic Assistant
│   │   ├── project-genai-showcase.jpg   # Generative AI Showcase
│   │   └── project-algorithms.jpg       # Algorithmic Engineering
│   └── resume.pdf                       # (Place your PDF resume here)
├── favicon.svg                          # Geometric SM monogram vector icon
├── index.html                           # Main semantic HTML structure (9 sections)
├── style.css                            # Obsidian Engineering CSS design system
├── app.js                               # Modular JavaScript architecture
├── server.js                            # Zero-dependency local Node dev server
├── package.json                         # Scripts (npm run dev)
├── README.md                            # Documentation and deployment guide
└── .gitignore                           # Git exclusions
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)

### Quick Start
```bash
# 1. Open the project directory
cd d:/projects/portfolio

# 2. Start the local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## 📝 How to Customize Personal Information

### 1. Updating Contact Links & Email
In [`index.html`](index.html), search for `somenathmaity346@gmail.com`, `somenathGit`, or `somenathmaity` to update:
- Email address
- GitHub profile URL
- LinkedIn profile URL

### 2. Updating Resume PDF
Drop your updated resume PDF file into `assets/resume.pdf`. The download button in the hero section automatically links to this path.

### 3. Adding or Modifying Projects
1. Add your project preview image inside `assets/images/`.
2. In [`index.html`](index.html), update the project card inside `<section id="projects">`.
3. In [`app.js`](app.js), add or edit the project details in the `PROJECTS_STORE` object:
```javascript
'your-project-id': {
  title: 'Project Title',
  category: 'Category Name',
  image: 'assets/images/your-image.jpg',
  description: 'Concise, accurate description.',
  technologies: ['Tech 1', 'Tech 2', 'Tech 3'],
  features: [
    'Key feature 1',
    'Key feature 2'
  ],
  githubUrl: 'https://github.com/your-repo',
  demoUrl: 'https://your-demo-url'
}
```

---

## 🌐 Deployment

### Netlify Deployment
1. Connect your repository to Netlify.
2. Set **Publish directory** to `./` (the root directory).
3. Leave **Build command** empty (since no compilation step is needed).
4. Click **Deploy Site**.

### Vercel Deployment
1. Import your GitHub repository into Vercel.
2. Select **Other** as the framework preset.
3. Deploy directly without any build command.

---

## ⚡ Performance & Accessibility Notes

- **Optimized 3D Rendering**: The Three.js canvas caps pixel ratio at 1.5 and automatically pauses when scrolled out of view or when the browser tab is inactive.
- **No Layout Shift**: Explicit aspect ratios on project media wraps prevent Cumulative Layout Shift (CLS).
- **Reduced Motion**: If a visitor has system reduced motion enabled (`prefers-reduced-motion: reduce`), 3D continuous animations and transitions are automatically disabled.
- **Keyboard Friendly**: Full keyboard navigation support (`Tab`, `Shift+Tab`, `ESC` to close project modals).
