# MolView 360 – Development Task List

> **Version:** 1.0 | **Last Updated:** 2025-12-15 | **Status:** Planning Complete

## 📊 Overview

| Metric | Value |
|--------|-------|
| Total Days | 30 |
| Phases | 4 |
| Total Tasks | 48 |
| Est. Hours | ~120-150 hours |

---

## 🎯 Milestone Summary

| Phase | Days | Goal | Key Deliverable |
|-------|------|------|-----------------|
| **Phase 1** | 1-7 | Core Viewer | 3D molecule visualization working |
| **Phase 2** | 8-15 | Backend | Property calculation API live |
| **Phase 3** | 16-24 | Full Dashboard | Complete UI with upload/library |
| **Phase 4** | 25-30 | Polish & Deploy | Production deployment ready |

---

## 📋 Phase 1: Core Viewer (Days 1-7)

**🎯 Goal:** Get a molecule rendering in 3D in the browser

### Day 1-2: Project Setup
- [ ] **SETUP-01:** Initialize Git repository and create .gitignore
- [ ] **SETUP-02:** Create folder structure per PROJECT_STRUCTURE.md
- [ ] **SETUP-03:** Initialize frontend with Vite + React + TypeScript
- [ ] **SETUP-04:** Install and configure Tailwind CSS
- [ ] **SETUP-05:** Install shadcn/ui and add base components
- [ ] **SETUP-06:** Create Docker Compose for development
- [ ] **SETUP-07:** Set up ESLint + Prettier configuration

### Day 3-4: 3Dmol.js Integration
- [ ] **VIEWER-01:** Install 3dmol package and type definitions
- [ ] **VIEWER-02:** Create basic MoleculeViewer component
- [ ] **VIEWER-03:** Load sample PDB from RCSB API (test: 1UBQ)
- [ ] **VIEWER-04:** Add viewer initialization and cleanup
- [ ] **VIEWER-05:** Implement error handling for invalid molecules

### Day 5-7: Viewer Controls & Styling
- [ ] **VIEWER-06:** Add style toggle buttons (cartoon, stick, sphere, surface)
- [ ] **VIEWER-07:** Implement zoom to fit functionality
- [ ] **VIEWER-08:** Add background color picker
- [ ] **VIEWER-09:** Create ViewerControls component
- [ ] **VIEWER-10:** Add loading states and spinners
- [ ] **VIEWER-11:** Write first component tests

**✅ Phase 1 Deliverable:** Working 3D viewer showing protein structure from PDB

---

## 📋 Phase 2: Computational Backend (Days 8-15)

**🎯 Goal:** Build FastAPI backend with RDKit integration

### Day 8-9: FastAPI Setup
- [ ] **API-01:** Initialize backend with FastAPI project structure
- [ ] **API-02:** Create Dockerfile for backend
- [ ] **API-03:** Set up configuration management (pydantic-settings)
- [ ] **API-04:** Create health check endpoint
- [ ] **API-05:** Set up CORS middleware
- [ ] **API-06:** Add request logging middleware

### Day 10-11: Database Layer
- [ ] **DB-01:** Create SQLAlchemy models (Molecule, Tag)
- [ ] **DB-02:** Set up Alembic for migrations
- [ ] **DB-03:** Create initial migration
- [ ] **DB-04:** Implement async session management
- [ ] **DB-05:** Create molecule repository (CRUD operations)

### Day 12-13: Chemistry Service
- [ ] **CHEM-01:** Create ChemistryService class
- [ ] **CHEM-02:** Implement PDB file parsing with RDKit
- [ ] **CHEM-03:** Implement SDF file parsing with RDKit
- [ ] **CHEM-04:** Calculate molecular weight, LogP, H-bond donors/acceptors
- [ ] **CHEM-05:** Calculate TPSA, rotatable bonds, formula
- [ ] **CHEM-06:** Add SMILES generation from structure
- [ ] **CHEM-07:** Write comprehensive unit tests for chemistry

### Day 14-15: API Endpoints
- [ ] **API-07:** Create POST /molecules (upload)
- [ ] **API-08:** Create GET /molecules (list)
- [ ] **API-09:** Create GET /molecules/{id} (detail)
- [ ] **API-10:** Create GET /molecules/{id}/file (download)
- [ ] **API-11:** Create DELETE /molecules/{id}
- [ ] **API-12:** Create GET /molecules/{id}/properties
- [ ] **API-13:** Write API integration tests

**✅ Phase 2 Deliverable:** Working API that accepts PDB/SDF files and returns properties

---

## 📋 Phase 3: Full Dashboard (Days 16-24)

**🎯 Goal:** Complete UI with file upload, library, and export

### Day 16-17: File Upload
- [ ] **UI-01:** Create file upload component with drag-and-drop
- [ ] **UI-02:** Add file type validation (PDB, SDF)
- [ ] **UI-03:** Implement upload progress indicator
- [ ] **UI-04:** Connect upload to backend API
- [ ] **UI-05:** Display upload success/error messages

### Day 18-19: Dashboard Layout
- [ ] **UI-06:** Create main dashboard page layout
- [ ] **UI-07:** Implement split-screen view (viewer + properties)
- [ ] **UI-08:** Create properties panel component
- [ ] **UI-09:** Display all computed properties with labels
- [ ] **UI-10:** Add copy-to-clipboard for SMILES

### Day 20-21: Molecule Library
- [ ] **UI-11:** Create molecule library page
- [ ] **UI-12:** Implement molecule card grid view
- [ ] **UI-13:** Add search by name functionality
- [ ] **UI-14:** Add filter by property range
- [ ] **UI-15:** Implement molecule selection for viewing

### Day 22-24: Advanced Features
- [ ] **UI-16:** Create molecule comparison view
- [ ] **UI-17:** Add export to CSV button
- [ ] **UI-18:** Add export to JSON button
- [ ] **UI-19:** Implement Zustand stores
- [ ] **UI-20:** Add TanStack Query for data fetching
- [ ] **UI-21:** Create consistent error handling
- [ ] **UI-22:** Add responsive design for tablet/mobile

**✅ Phase 3 Deliverable:** Fully functional dashboard with upload, view, and export

---

## 📋 Phase 4: Polish & Deploy (Days 25-30)

**🎯 Goal:** Production-ready deployment with documentation

### Day 25-26: Testing & Quality
- [ ] **QA-01:** Achieve >80% backend test coverage
- [ ] **QA-02:** Write E2E tests with Playwright
- [ ] **QA-03:** Fix all TypeScript strict mode errors
- [ ] **QA-04:** Run security audit (npm audit, safety)
- [ ] **QA-05:** Performance testing with large molecules

### Day 27-28: DevOps & Deployment
- [ ] **DEPLOY-01:** Create production Docker Compose
- [ ] **DEPLOY-02:** Set up GitHub Actions CI pipeline
- [ ] **DEPLOY-03:** Deploy backend to Render.com
- [ ] **DEPLOY-04:** Deploy frontend to Vercel
- [ ] **DEPLOY-05:** Configure custom domain (optional)
- [ ] **DEPLOY-06:** Set up error monitoring (Sentry - optional)

### Day 29-30: Documentation & Launch
- [ ] **DOC-01:** Complete README.md with badges
- [ ] **DOC-02:** Create API documentation
- [ ] **DOC-03:** Write CONTRIBUTING.md guide
- [ ] **DOC-04:** Record demo video/GIF
- [ ] **DOC-05:** Create sample molecule pack
- [ ] **DOC-06:** Write deployment guide
- [ ] **DOC-07:** Final QA and bug fixes

**✅ Phase 4 Deliverable:** Live demo with complete documentation

---

*This task list will be updated as development progresses. Mark tasks as [x] when complete.*

