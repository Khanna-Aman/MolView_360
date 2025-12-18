# MolView 360 – System Architecture

> **Version:** 1.0 | **Last Updated:** 2025-12-15 | **Status:** Approved

## 🏛️ Architecture Overview

MolView 360 follows a **Modern Full-Stack Architecture** with clear separation of concerns:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              PRESENTATION LAYER                               │
│                                                                               │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐  │
│   │    React    │   │   3Dmol.js  │   │  TanStack   │   │   Zustand       │  │
│   │  Components │   │  3D Viewer  │   │   Query     │   │   State Store   │  │
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘   └────────┬────────┘  │
│          └─────────────────┴─────────────────┴───────────────────┘           │
│                                    │                                          │
└────────────────────────────────────┼──────────────────────────────────────────┘
                                     │ HTTPS / REST API
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              APPLICATION LAYER                                │
│                                                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │                         FastAPI Application                          │    │
│   │  ┌───────────────┐  ┌───────────────┐  ┌────────────────────────┐   │    │
│   │  │ API Routes    │  │ Pydantic      │  │ Dependency Injection   │   │    │
│   │  │ /molecules    │  │ Schemas       │  │ (Services/Repos)       │   │    │
│   │  │ /properties   │  │ Validation    │  │                        │   │    │
│   │  └───────────────┘  └───────────────┘  └────────────────────────┘   │    │
│   └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                          │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │                         SERVICE LAYER                                │    │
│   │  ┌───────────────┐  ┌───────────────┐  ┌────────────────────────┐   │    │
│   │  │ MoleculeService│ │ ChemistryService│ │ FileService           │   │    │
│   │  │ - CRUD ops    │  │ - RDKit wrapper│  │ - Upload/validation   │   │    │
│   │  │ - Search      │  │ - Properties   │  │ - Storage             │   │    │
│   │  └───────────────┘  └───────────────┘  └────────────────────────┘   │    │
│   └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└───────────────────────────────────┬───────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                               DATA LAYER                                      │
│                                                                               │
│   ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────────┐  │
│   │    SQLAlchemy     │   │    File Storage   │   │    Cache (Optional)   │  │
│   │    + SQLite/PG    │   │    Local / S3     │   │    Redis              │  │
│   │                   │   │                   │   │                       │  │
│   │  ┌─────────────┐  │   │  ┌─────────────┐  │   │  ┌─────────────────┐  │  │
│   │  │ Molecules   │  │   │  │ PDB Files   │  │   │  │ Computed Props  │  │  │
│   │  │ Properties  │  │   │  │ SDF Files   │  │   │  │ Session Data    │  │  │
│   │  │ Users (opt) │  │   │  │ Thumbnails  │  │   │  │                 │  │  │
│   │  └─────────────┘  │   │  └─────────────┘  │   │  └─────────────────┘  │  │
│   └───────────────────┘   └───────────────────┘   └───────────────────────┘  │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Details

### 1. Frontend Components

#### React Application (TypeScript)
- **Framework:** React 18 with TypeScript
- **Build:** Vite for fast development and optimized builds
- **Routing:** React Router v6
- **UI Library:** shadcn/ui + Tailwind CSS

#### 3Dmol.js Integration
```typescript
// Core viewer integration pattern
interface MoleculeViewerProps {
  moleculeData: string;      // PDB/SDF content
  format: 'pdb' | 'sdf';     // File format
  style: ViewStyle;          // cartoon | stick | sphere | surface
  onAtomClick?: (atom: AtomInfo) => void;
}
```

#### State Management (Zustand)
```typescript
interface AppState {
  // Molecule state
  currentMolecule: Molecule | null;
  moleculeLibrary: Molecule[];

  // UI state
  viewerStyle: ViewStyle;
  sidebarOpen: boolean;

  // Actions
  setCurrentMolecule: (mol: Molecule) => void;
  addToLibrary: (mol: Molecule) => void;
}
```

### 2. Backend Services

#### FastAPI Application Structure
```
backend/
├── app/
│   ├── main.py              # Application entry point
│   ├── api/
│   │   ├── routes/
│   │   │   ├── molecules.py # Molecule CRUD endpoints
│   │   │   ├── properties.py# Property calculation
│   │   │   └── health.py    # Health checks
│   │   └── deps.py          # Dependency injection
│   ├── services/
│   │   ├── molecule_service.py
│   │   ├── chemistry_service.py
│   │   └── file_service.py
│   ├── models/
│   │   ├── molecule.py      # SQLAlchemy models
│   │   └── property.py
│   ├── schemas/
│   │   ├── molecule.py      # Pydantic schemas
│   │   └── property.py
│   └── core/
│       ├── config.py        # Settings
│       └── security.py      # Auth utilities
```

#### Chemistry Service (RDKit Wrapper)
```python
from rdkit import Chem
from rdkit.Chem import Descriptors, AllChem

class ChemistryService:
    """Wrapper for RDKit operations"""

    def calculate_properties(self, mol_file: str, format: str) -> dict:
        """Calculate molecular properties from file"""
        if format == 'pdb':
            mol = Chem.MolFromPDBFile(mol_file)
        elif format == 'sdf':
            mol = Chem.MolFromMolFile(mol_file)

        return {
            "molecular_weight": Descriptors.MolWt(mol),
            "logp": Descriptors.MolLogP(mol),
            "hbd": Descriptors.NumHDonors(mol),
            "hba": Descriptors.NumHAcceptors(mol),
            "tpsa": Descriptors.TPSA(mol),
            "rotatable_bonds": Descriptors.NumRotatableBonds(mol),
        }
```

---

## 🔄 Data Flow Diagrams

### File Upload Flow
```
User                    Frontend              Backend                 Storage
 │                         │                     │                       │
 │ 1. Select PDB file      │                     │                       │
 │ ───────────────────────>│                     │                       │
 │                         │ 2. POST /molecules  │                       │
 │                         │ ───────────────────>│                       │
 │                         │                     │ 3. Validate format    │
 │                         │                     │ ──────────────────────│
 │                         │                     │                       │
 │                         │                     │ 4. Calculate props    │
 │                         │                     │ (RDKit)               │
 │                         │                     │                       │
 │                         │                     │ 5. Save file          │
 │                         │                     │ ─────────────────────>│
 │                         │                     │                       │
 │                         │                     │ 6. Save to DB         │
 │                         │                     │ ─────────────────────>│
 │                         │                     │                       │
 │                         │ 7. Return molecule  │                       │
 │                         │ <───────────────────│                       │
 │ 8. Display in viewer    │                     │                       │
 │ <───────────────────────│                     │                       │
```

---

## 🗄️ Database Schema

```sql
-- Core molecule table
CREATE TABLE molecules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_format VARCHAR(10) NOT NULL,  -- 'pdb', 'sdf', 'mol2'
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Computed properties (cached)
    molecular_weight FLOAT,
    logp FLOAT,
    hbd INTEGER,  -- H-bond donors
    hba INTEGER,  -- H-bond acceptors
    tpsa FLOAT,   -- Topological polar surface area
    rotatable_bonds INTEGER,
    formula VARCHAR(100),
    smiles VARCHAR(1000),

    -- Metadata
    source VARCHAR(100),  -- 'upload', 'rcsb', 'pubchem'
    pdb_id VARCHAR(10),   -- If from RCSB
    description TEXT
);

-- Index for search
CREATE INDEX idx_molecules_name ON molecules(name);
CREATE INDEX idx_molecules_formula ON molecules(formula);
```

---

## 🔌 API Endpoints

### Molecules API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/molecules` | List all molecules (paginated) |
| GET | `/api/v1/molecules/{id}` | Get molecule details |
| GET | `/api/v1/molecules/{id}/file` | Download molecule file |
| POST | `/api/v1/molecules` | Upload new molecule |
| PUT | `/api/v1/molecules/{id}` | Update molecule metadata |
| DELETE | `/api/v1/molecules/{id}` | Delete molecule |

### Properties API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/molecules/{id}/properties` | Get computed properties |
| POST | `/api/v1/molecules/{id}/recalculate` | Force recalculation |
| GET | `/api/v1/properties/compare` | Compare multiple molecules |

### Export API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/export/csv` | Export library as CSV |
| GET | `/api/v1/export/json` | Export as JSON |
| GET | `/api/v1/export/sdf` | Export as SDF bundle |

---

## 🚀 Deployment Architecture

### Development
```
┌─────────────────────────────────────────────┐
│              Docker Compose                  │
│  ┌───────────────┐  ┌───────────────────┐   │
│  │   Frontend    │  │     Backend       │   │
│  │   (Vite Dev)  │  │   (FastAPI+Uvicorn│   │
│  │   Port 5173   │  │   Port 8000       │   │
│  └───────────────┘  └───────────────────┘   │
│            │                  │              │
│            └──────┬───────────┘              │
│                   │                          │
│          ┌────────▼────────┐                 │
│          │    SQLite DB    │                 │
│          │   ./data/db.sqlite│               │
│          └─────────────────┘                 │
└─────────────────────────────────────────────┘
```

---

*For implementation details, see [APPROACH_PLAN.md](./APPROACH_PLAN.md)*
