# MolView 360 – Quick Reference Card

> One-page summary of key information for quick lookup
> **Last Updated:** 15-Dec-2025 | **Status:** Phase 1 - 50% Complete

---

## 🛠️ Tech Stack At-A-Glance

```
Frontend:  React 18 + TypeScript 5.x + Vite 5.x + 3Dmol.js 2.x + Tailwind v4 + shadcn/ui
Backend:   FastAPI + Python 3.11+ + RDKit + SQLAlchemy 2.0 + Pydantic v2
Database:  SQLite (dev) / PostgreSQL (prod)
DevOps:    Docker + GitHub Actions
```

---

## 📁 Key Directories

| Path | Purpose |
|------|---------|
| `frontend/src/components/viewer/` | 3D viewer components |
| `frontend/src/components/molecules/` | Molecule management UI |
| `backend/app/services/` | Business logic (chemistry, file handling) |
| `backend/app/api/routes/` | API endpoints |
| `data/uploads/` | Uploaded molecule files |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/molecules` | Upload molecule file |
| GET | `/molecules` | List all molecules |
| GET | `/molecules/{id}` | Get molecule details |
| GET | `/molecules/{id}/properties` | Get computed properties |
| GET | `/molecules/{id}/file` | Download original file |
| DELETE | `/molecules/{id}` | Delete molecule |
| GET | `/export/csv` | Export library to CSV |
| GET | `/health` | Health check |

---

## 🧪 Computed Properties

| Property | RDKit Function | Unit |
|----------|----------------|------|
| Molecular Weight | `Descriptors.MolWt()` | g/mol |
| LogP | `Descriptors.MolLogP()` | - |
| TPSA | `Descriptors.TPSA()` | Å² |
| H-Bond Donors | `Descriptors.NumHDonors()` | count |
| H-Bond Acceptors | `Descriptors.NumHAcceptors()` | count |
| Rotatable Bonds | `Descriptors.NumRotatableBonds()` | count |
| SMILES | `Chem.MolToSmiles()` | string |

---

## 🚀 Quick Commands

```bash
# Start development (Docker)
docker-compose up -d

# Start frontend only
cd frontend && npm run dev

# Start backend only
cd backend && uvicorn app.main:app --reload

# Run tests
cd backend && pytest
cd frontend && npm test

# Database migration
cd backend && alembic upgrade head
```

---

## 🌐 Development URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |

---

## 📦 Key Dependencies

### Python (backend/requirements.txt)
```
fastapi>=0.100.0
uvicorn[standard]
rdkit>=2024.3.1
sqlalchemy>=2.0.0
pydantic>=2.0.0
python-multipart
aiosqlite
alembic
pytest
httpx
```

### Node.js (frontend/package.json)
```
react: ^18.2.0
3dmol: ^2.0.0
@tanstack/react-query: ^5.0.0
zustand: ^4.4.0
tailwindcss: ^4.0.0
typescript: ^5.2.0
vite: ^5.0.0
```

---

## 📋 File Formats Supported

| Format | Extension | Description |
|--------|-----------|-------------|
| PDB | `.pdb` | Protein Data Bank format |
| SDF | `.sdf` | Structure Data File (MDL) |
| MOL2 | `.mol2` | Tripos molecular format |

---

## 🎯 30-Day Phases

| Phase | Days | Focus |
|-------|------|-------|
| 1 | 1-7 | Core 3D Viewer |
| 2 | 8-15 | Backend + RDKit |
| 3 | 16-24 | Full Dashboard |
| 4 | 25-30 | Polish & Deploy |

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| [README.md](../README.md) | Project overview |
| [APPROACH_PLAN.md](APPROACH_PLAN.md) | Implementation strategy |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design |
| [TECH_STACK_ANALYSIS.md](TECH_STACK_ANALYSIS.md) | Technology decisions |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Folder layout |
| [TASK_LIST.md](TASK_LIST.md) | Development tasks |

---

## 🧬 Sample Molecules (for testing)

| PDB ID | Name | Size |
|--------|------|------|
| 1UBQ | Ubiquitin | Small |
| 1CRN | Crambin | Tiny |
| 1HHO | Hemoglobin | Medium |
| 1BNA | DNA B-Form | Medium |
| 2HYY | GFP | Medium |

---

*Keep this card handy during development!*

