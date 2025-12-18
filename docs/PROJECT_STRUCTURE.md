# MolView 360 – Project Structure

> **Version:** 1.0 | **Last Updated:** 2025-12-15 | **Status:** Approved

## 📁 Directory Structure

Based on **Cookiecutter Data Science** best practices, adapted for a full-stack scientific application.

```
molview-360/
│
├── 📄 README.md                    # Project overview, quick start
├── 📄 LICENSE                      # MIT License
├── 📄 CONTRIBUTING.md              # Contribution guidelines
├── 📄 CHANGELOG.md                 # Version history
├── 📄 .gitignore                   # Git ignore patterns
├── 📄 .env.example                 # Environment variables template
│
├── 🐳 docker-compose.yml           # Development orchestration
├── 🐳 docker-compose.prod.yml      # Production orchestration
│
├── 📁 docs/                        # Documentation
│   ├── APPROACH_PLAN.md            # Project approach
│   ├── ARCHITECTURE.md             # System architecture
│   ├── TECH_STACK_ANALYSIS.md      # Technology decisions
│   ├── PROJECT_STRUCTURE.md        # This file
│   ├── TASK_LIST.md                # Development tasks
│   ├── API_REFERENCE.md            # API documentation
│   └── DEPLOYMENT.md               # Deployment guide
│
├── 📁 backend/                     # Python FastAPI Backend
│   ├── 📄 Dockerfile               # Backend container
│   ├── 📄 pyproject.toml           # Python dependencies (Poetry)
│   ├── 📄 requirements.txt         # Pip fallback
│   ├── 📄 alembic.ini              # Database migrations config
│   │
│   ├── 📁 app/                     # Application code
│   │   ├── 📄 __init__.py
│   │   ├── 📄 main.py              # FastAPI application entry
│   │   │
│   │   ├── 📁 api/                 # API layer
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 deps.py          # Dependency injection
│   │   │   └── 📁 routes/          # Endpoint definitions
│   │   │       ├── 📄 __init__.py
│   │   │       ├── 📄 molecules.py # /molecules endpoints
│   │   │       ├── 📄 properties.py# /properties endpoints
│   │   │       ├── 📄 export.py    # /export endpoints
│   │   │       └── 📄 health.py    # /health endpoint
│   │   │
│   │   ├── 📁 core/                # Core configuration
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 config.py        # Settings (pydantic-settings)
│   │   │   └── 📄 security.py      # Security utilities
│   │   │
│   │   ├── 📁 models/              # SQLAlchemy models
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 base.py          # Base model class
│   │   │   └── 📄 molecule.py      # Molecule model
│   │   │
│   │   ├── 📁 schemas/             # Pydantic schemas
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 molecule.py      # Molecule schemas
│   │   │   └── 📄 property.py      # Property schemas
│   │   │
│   │   ├── 📁 services/            # Business logic
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 molecule_service.py   # Molecule CRUD
│   │   │   ├── 📄 chemistry_service.py  # RDKit wrapper
│   │   │   └── 📄 file_service.py       # File handling
│   │   │
│   │   └── 📁 db/                  # Database utilities
│   │       ├── 📄 __init__.py
│   │       ├── 📄 session.py       # DB session management
│   │       └── 📄 init_db.py       # Database initialization
│   │
│   ├── 📁 alembic/                 # Database migrations
│   │   ├── 📄 env.py
│   │   └── 📁 versions/            # Migration files
│   │
│   └── 📁 tests/                   # Backend tests
│       ├── 📄 __init__.py
│       ├── 📄 conftest.py          # Pytest fixtures
│       ├── 📁 unit/                # Unit tests
│       │   ├── 📄 test_chemistry_service.py
│       │   └── 📄 test_file_service.py
│       └── 📁 integration/         # Integration tests
│           └── 📄 test_molecules_api.py
│
├── 📁 frontend/                    # React TypeScript Frontend
│   ├── 📄 Dockerfile               # Frontend container
│   ├── 📄 package.json             # Node dependencies
│   ├── 📄 tsconfig.json            # TypeScript config
│   ├── 📄 vite.config.ts           # Vite configuration
│   │
│   ├── 📁 public/                  # Static assets
│   │   └── 📄 favicon.ico
│   │
│   ├── 📁 src/                     # Source code
│   │   ├── 📄 main.tsx             # React entry point
│   │   ├── 📄 App.tsx              # Root component
│   │   ├── 📄 index.css            # Global styles
│   │   │
│   │   ├── 📁 components/          # React components
│   │   │   ├── 📁 ui/              # shadcn/ui components
│   │   │   ├── 📁 viewer/          # 3D viewer components
│   │   │   ├── 📁 molecules/       # Molecule-related components
│   │   │   └── 📁 layout/          # Layout components
│   │   │
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   ├── 📁 store/               # Zustand stores
│   │   ├── 📁 api/                 # API client
│   │   ├── 📁 types/               # TypeScript types
│   │   ├── 📁 lib/                 # Utilities
│   │   └── 📁 pages/               # Page components
│   │
│   └── 📁 tests/                   # Frontend tests
│
├── 📁 data/                        # Data directory (gitignored)
│   ├── 📁 uploads/                 # Uploaded molecule files
│   └── 📁 samples/                 # Sample molecules for testing
│
└── 📁 scripts/                     # Utility scripts
    ├── 📄 seed_db.py               # Database seeding
    └── 📄 setup_dev.ps1            # Development setup
```

---

## 📋 File Naming Conventions

### Python (Backend)
| Type | Convention | Example |
|------|------------|---------|
| Modules | snake_case | `chemistry_service.py` |
| Classes | PascalCase | `MoleculeService` |
| Functions | snake_case | `calculate_properties()` |
| Constants | UPPER_SNAKE | `MAX_FILE_SIZE` |
| Type hints | Used everywhere | `def get(id: int) -> Molecule:` |

### TypeScript (Frontend)
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `MoleculeViewer.tsx` |
| Hooks | camelCase with `use` | `useMolecules.ts` |
| Utils | camelCase | `utils.ts` |
| Types | PascalCase | `MoleculeResponse` |
| Stores | camelCase with `Store` | `moleculeStore.ts` |

---

## 🚀 Quick Reference

### Start Development
```bash
# Clone and setup
git clone https://github.com/yourname/molview-360.git
cd molview-360

# Start all services
docker-compose up -d

# Frontend: http://localhost:5173
# Backend:  http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

*This structure follows best practices from Cookiecutter Data Science, FastAPI best practices, and modern React application patterns.*

