# 📋 Phase 1: Core Viewer Tasks

**Project:** MolView 360 – The Chemist's GitHub
**Phase:** 1 - Core Viewer (Days 1-7)
**Created:** 15-Dec-2025 06:30
**Status:** 🏃 In Progress (50% Complete)

---

## 🎯 Phase Goal

Get a molecule rendering in 3D in the browser with basic viewer controls.

---

## 📊 Phase Summary

| Metric | Count |
|--------|-------|
| Total Tasks | 18 |
| Completed | 9 |
| In Progress | 0 |
| Not Started | 9 |

---

## 🔧 Block A: Project Foundation (Day 1-2)

### Setup Tasks

- ✅ **SETUP-01: Initialize Git Repository**
  - Create .gitignore for Python, Node.js, IDE files
  - Initialize git repository
  - Create initial commit with documentation
  - Priority: 🔴 HIGH
  - Estimated: 0.5 hours

- ✅ **SETUP-02: Create Folder Structure**
  - Create frontend/, backend/, data/, scripts/ directories
  - Add placeholder files per PROJECT_STRUCTURE.md
  - Priority: 🔴 HIGH
  - Estimated: 0.5 hours

- ✅ **SETUP-03: Initialize Frontend with Vite**
  - Run `npm create vite@latest frontend -- --template react-ts`
  - Verify React + TypeScript working
  - Configure path aliases (@/)
  - Priority: 🔴 HIGH
  - Estimated: 1 hour

---

## 🎨 Block B: Styling & Tooling (Day 2-3)

### Configuration Tasks

- ✅ **SETUP-04: Install and Configure Tailwind CSS**
  - Install tailwindcss, postcss, autoprefixer
  - Create tailwind.config.js and postcss.config.js
  - Add Tailwind directives to index.css
  - Priority: 🔴 HIGH
  - Estimated: 0.5 hours

- ✅ **SETUP-05: Install shadcn/ui Components**
  - Initialize shadcn/ui with `npx shadcn@latest init`
  - Add Button, Card, Input components
  - Verify component rendering
  - Priority: 🟡 MEDIUM
  - Estimated: 1 hour

- ✅ **SETUP-06: Create Docker Compose**
  - Create docker-compose.yml for development
  - Add frontend service configuration
  - Add backend service placeholder
  - Test container startup
  - Priority: 🟡 MEDIUM
  - Estimated: 1 hour

- ✅ **SETUP-07: Configure ESLint + Prettier**
  - Install ESLint with TypeScript support
  - Install Prettier and eslint-config-prettier
  - Create .eslintrc.cjs and .prettierrc
  - Add lint scripts to package.json
  - Priority: 🟢 LOW
  - Estimated: 0.5 hours

---

## 🔬 Block C: 3Dmol.js Integration (Day 3-4)

### Viewer Core Tasks

- ✅ **VIEWER-01: Install 3Dmol Package**
  - Install 3dmol via npm
  - Create type declarations if needed (3dmol.d.ts)
  - Verify import works in React
  - Priority: 🔴 HIGH
  - Estimated: 0.5 hours

- ✅ **VIEWER-02: Create MoleculeViewer Component**
  - Create components/viewer/MoleculeViewer.tsx
  - Set up container div with ref
  - Initialize 3Dmol viewer instance
  - Added sample molecules dropdown for testing
  - Priority: 🔴 HIGH
  - Estimated: 2 hours

- ❄️ **VIEWER-03: Load Sample PDB (1UBQ)**
  - Fetch PDB from RCSB API
  - Parse and render in viewer
  - Apply default cartoon style
  - Priority: 🔴 HIGH
  - Estimated: 1.5 hours

- ❄️ **VIEWER-04: Add Viewer Lifecycle Management**
  - Implement proper cleanup on unmount
  - Handle window resize events
  - Add viewer recreation on prop changes
  - Priority: 🟡 MEDIUM
  - Estimated: 1 hour

- ❄️ **VIEWER-05: Implement Error Handling**
  - Add try-catch for PDB loading
  - Display error messages for invalid files
  - Add fallback UI for loading failures
  - Priority: 🟡 MEDIUM
  - Estimated: 1 hour

---

## 🎮 Block D: Viewer Controls (Day 5-7)

### UI Control Tasks

- ❄️ **VIEWER-06: Add Style Toggle Buttons**
  - Create ViewerControls.tsx component
  - Add buttons: Cartoon, Stick, Sphere, Surface
  - Connect to viewer.setStyle() API
  - Priority: 🔴 HIGH
  - Estimated: 2 hours

- ❄️ **VIEWER-07: Implement Zoom Controls**
  - Add zoom in/out buttons
  - Implement "fit to view" / center molecule
  - Add mouse wheel zoom support
  - Priority: 🟡 MEDIUM
  - Estimated: 1 hour

- ❄️ **VIEWER-08: Add Background Color Picker**
  - Add color picker dropdown/buttons
  - Options: White, Black, Gray, Custom
  - Persist preference in localStorage
  - Priority: 🟢 LOW
  - Estimated: 0.5 hours

---

## 🏁 Phase 1 Completion Criteria

- [x] React app runs without errors (build successful)
- [x] MoleculeViewer component created with 3Dmol.js
- [x] Sample molecules dropdown added (10 molecules)
- [ ] 3D viewer displays protein structure
- [ ] Style toggles work (cartoon, stick, sphere)
- [ ] Zoom and center controls functional
- [ ] Loading states show during fetch

---

*Phase 1 Target: Working 3D molecule viewer*

