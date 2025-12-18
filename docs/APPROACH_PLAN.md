# MolView 360 – Approach Plan

> **Version:** 1.0 | **Last Updated:** 2025-12-15 | **Status:** Planning Phase

## 🎯 Project Vision

**MolView 360** is a web-based platform that democratizes molecular visualization and analysis—a "GitHub for Molecules." Users can upload chemical files (PDB/SDF), automatically calculate molecular properties using RDKit, and explore structures in interactive 3D.

---

## 📋 Executive Summary

### The Problem
- Chemists and researchers need accessible tools to visualize and analyze molecular structures
- Existing solutions are either expensive, require local installation, or lack computational features
- No unified platform combines 3D visualization with property calculation and collaborative features

### Our Solution
A free, open-source web platform that:
1. **Visualizes** molecules in interactive 3D (protein structures, small molecules)
2. **Computes** molecular properties automatically (MW, LogP, H-bond donors/acceptors, etc.)
3. **Organizes** molecular libraries with search and comparison features
4. **Exports** data in multiple formats for downstream analysis

### Target Hardware
- **Development:** Windows 11 | 16GB RAM | 8GB GPU (NVIDIA RTX-class)
- **Production:** Deployable on standard cloud instances (no GPU required for core features)

---

## 🏗️ Architectural Approach

### Key Architectural Decision: Unified Python Backend

**Original Proposal:** Node.js (API) + Python (Chemistry) + React (Frontend)

**Our Recommendation:** FastAPI (Python) + React (Frontend)

**Rationale:**
| Factor | Node.js + Python | FastAPI Only |
|--------|-----------------|--------------|
| Complexity | Two runtimes, IPC overhead | Single runtime |
| Deployment | Complex Docker setup | Simple single container |
| Latency | Extra hop for chemistry calls | Direct function calls |
| Maintenance | Two codebases | One codebase |
| Chemistry Ecosystem | Requires subprocess/bridge | Native RDKit integration |

> **Decision:** Use **FastAPI** as the unified backend. This eliminates the Node.js layer entirely, reducing complexity while maintaining high performance (FastAPI is as fast as Node.js for I/O-bound operations).

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │   React App     │  │   3Dmol.js      │  │   File Upload UI    │  │
│  │   (TypeScript)  │  │   (3D Viewer)   │  │   (Drag & Drop)     │  │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘  │
└───────────┼────────────────────┼─────────────────────┼──────────────┘
            │                    │                     │
            └────────────────────┴─────────────────────┘
                                 │ REST API / WebSocket
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SERVER (FastAPI + Python)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │   REST API      │  │  Chemistry      │  │   File Manager      │  │
│  │   Endpoints     │  │  Engine (RDKit) │  │   (Validation)      │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │   Auth Service  │  │  Background     │  │   Export Engine     │  │
│  │   (Optional)    │  │  Tasks (Celery) │  │   (CSV/JSON/SDF)    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         STORAGE LAYER                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │   SQLite/       │  │   File Storage  │  │   Cache (Redis)     │  │
│  │   PostgreSQL    │  │   (Local/S3)    │  │   (Optional)        │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technology Stack (Final Selection)

### Frontend
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | **React 18 + TypeScript** | Industry standard, strong ecosystem |
| Build Tool | **Vite** | Faster than CRA, excellent DX |
| 3D Rendering | **3Dmol.js** | Purpose-built for molecules, WebGL |
| UI Components | **shadcn/ui + Tailwind CSS** | Modern, accessible, customizable |
| State Management | **Zustand** | Simpler than Redux, TypeScript-first |
| HTTP Client | **TanStack Query** | Caching, mutations, real-time sync |

### Backend
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | **FastAPI** | Async, automatic OpenAPI docs, Python-native |
| Chemistry | **RDKit** | Gold standard for cheminformatics |
| Database | **SQLite** (dev) / **PostgreSQL** (prod) | Simple start, scalable path |
| ORM | **SQLAlchemy 2.0** | Type-safe, async support |
| Validation | **Pydantic v2** | Built into FastAPI, fast |
| Task Queue | **Celery + Redis** (optional) | For heavy computations |

### DevOps & Tooling
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Containerization | **Docker + Docker Compose** | Reproducible environments |
| Testing | **pytest + React Testing Library** | Standard tools |
| CI/CD | **GitHub Actions** | Free for open source |


---

## 🚀 Implementation Phases

### Phase 1: Core Viewer (Days 1-7)
**Goal:** Display a molecule on screen

- [ ] Project scaffolding (Vite + React + TypeScript)
- [ ] 3Dmol.js integration and basic viewer component
- [ ] Load molecule from RCSB PDB API (demo mode)
- [ ] Basic viewer controls (rotate, zoom, pan)
- [ ] Style toggles (cartoon, stick, sphere, surface)

### Phase 2: Computational Backend (Days 8-15)
**Goal:** Calculate molecular properties from uploaded files

- [ ] FastAPI project setup with proper structure
- [ ] File upload endpoint with validation
- [ ] RDKit integration for property calculation
- [ ] Database schema and SQLAlchemy models
- [ ] API endpoints for molecules CRUD operations
- [ ] Unit tests for chemistry calculations

### Phase 3: Full Dashboard (Days 16-24)
**Goal:** Complete user interface with library management

- [ ] Drag-and-drop file upload zone
- [ ] Split-screen layout (3D viewer + properties panel)
- [ ] Molecule library view with search/filter
- [ ] Property comparison view (side-by-side)
- [ ] Export functionality (CSV, JSON, SDF)
- [ ] Error handling and user feedback

### Phase 4: Polish & Deploy (Days 25-30)
**Goal:** Production-ready deployment

- [ ] Performance optimization
- [ ] Comprehensive test coverage
- [ ] Docker containerization
- [ ] Deployment scripts (Render/Vercel)
- [ ] Documentation and README
- [ ] Demo video and screenshots

---

## 🎯 Kaggle Competition Readiness

### BELKA Competition Alignment
The NeurIPS 2024 BELKA competition focuses on predicting binding affinity of small molecules. Our platform can be extended for this:

1. **Data Pipeline:** Import competition datasets (SMILES → 3D structure)
2. **Feature Engineering:** Use RDKit descriptors as ML features
3. **Model Integration:** Add prediction endpoints for trained models
4. **Visualization:** Display predicted binding scores alongside structure

### Extension Points for ML
```python
# Future extension: model prediction endpoint
@router.post("/predict/binding")
async def predict_binding(molecule_id: int, target_protein: str):
    molecule = await get_molecule(molecule_id)
    features = compute_ml_features(molecule)  # RDKit descriptors
    prediction = model.predict(features)
    return {"binding_affinity": prediction, "confidence": 0.85}
```

---

## 🔐 Security Considerations

### File Upload Security
1. **File Type Validation:** Whitelist PDB, SDF, MOL2 extensions
2. **Magic Byte Verification:** Check file headers, not just extensions
3. **Size Limits:** Max 10MB per file (configurable)
4. **Sanitization:** Parse files through RDKit before storage
5. **Isolated Processing:** Run chemistry in sandboxed environment

### API Security
- Rate limiting on all endpoints
- Input validation with Pydantic
- CORS configuration for production
- SQL injection prevention via ORM
- XSS prevention in React (default escaped)

---

## 📊 Performance Targets (8GB GPU Constraint)

| Operation | Target Time | Notes |
|-----------|-------------|-------|
| Page Load | < 2s | With code splitting |
| 3D Render (small molecule) | < 100ms | 3Dmol.js is fast |
| 3D Render (protein ~1000 residues) | < 500ms | May need LOD |
| Property Calculation | < 200ms | Most RDKit ops are instant |
| File Upload (5MB) | < 3s | Including validation |

> **Note:** GPU is not required for core functionality. 3Dmol.js uses WebGL which runs on any modern GPU. The 8GB GPU can be leveraged for future ML features.

---

## 📁 Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed system architecture
- [TECH_STACK_ANALYSIS.md](./TECH_STACK_ANALYSIS.md) - Technology decisions
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Folder organization
- [TASK_LIST.md](./TASK_LIST.md) - Detailed task breakdown
- [README.md](../README.md) - Project overview

---

## ✅ Success Criteria

1. **Functional:** Upload PDB/SDF, view in 3D, see computed properties
2. **Performance:** Meets all timing targets on reference hardware
3. **Quality:** >80% test coverage, no critical security issues
4. **Documentation:** Complete README, API docs, deployment guide
5. **GitHub Ready:** CI/CD pipeline, contributing guide, license
6. **Kaggle Ready:** Export features for ML, extensible architecture

---

*Document maintained by the MolView 360 development team.*
