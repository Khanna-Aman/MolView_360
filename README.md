# 🧬 MolView 360 – The Chemist's GitHub

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![React 18](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com)
[![RDKit](https://img.shields.io/badge/RDKit-2024-orange.svg)](https://rdkit.org)

**Upload. Visualize. Analyze. Share.**

A modern web platform for molecular visualization and property calculation.  
Upload PDB/SDF files, view molecules in interactive 3D, and compute chemical properties instantly.

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔬 **3D Visualization** | Interactive WebGL-powered molecular viewer with multiple rendering styles |
| 📊 **Property Calculation** | Automatic computation of MW, LogP, TPSA, H-bond donors/acceptors, and more |
| 📁 **File Support** | Upload PDB, SDF, and MOL2 molecular structure files |
| 🗂️ **Molecule Library** | Organize, search, and filter your molecular collection |
| 📤 **Export Options** | Download properties as CSV or JSON for further analysis |
| 🎨 **Style Controls** | Toggle between cartoon, stick, sphere, and surface representations |

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docker.com) & Docker Compose
- [Node.js 18+](https://nodejs.org) (for local frontend development)
- [Python 3.11+](https://python.org) (for local backend development)

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/molview-360.git
cd molview-360

# Start all services
docker-compose up -d

# Open in browser
# Frontend: http://localhost:5173
# API Docs: http://localhost:8000/docs
```

### Local Development

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🧪 Computed Properties

MolView 360 automatically calculates these molecular properties using RDKit:

| Property | Description | Unit |
|----------|-------------|------|
| **Molecular Weight** | Sum of atomic masses | g/mol |
| **LogP** | Partition coefficient (lipophilicity) | - |
| **TPSA** | Topological Polar Surface Area | Å² |
| **H-Bond Donors** | Number of hydrogen bond donors | count |
| **H-Bond Acceptors** | Number of hydrogen bond acceptors | count |
| **Rotatable Bonds** | Number of rotatable bonds | count |
| **Molecular Formula** | Chemical formula | - |
| **SMILES** | Canonical SMILES representation | - |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  React 18 + TypeScript + 3Dmol.js + Tailwind + shadcn/ui    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     REST API (FastAPI)                       │
│  /molecules  /properties  /export  /health                   │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────────┐
│   Chemistry Engine      │     │        Database             │
│       (RDKit)           │     │   SQLite / PostgreSQL       │
└─────────────────────────┘     └─────────────────────────────┘
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed system design.

---

## 📁 Project Structure

```
molview-360/
├── frontend/          # React + TypeScript application
├── backend/           # FastAPI + RDKit server
├── docs/              # Documentation
├── data/              # Sample data files
├── scripts/           # Development utilities
├── docker-compose.yml # Development orchestration
└── README.md          # This file
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for complete directory layout.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, 3Dmol.js, Tailwind CSS, shadcn/ui |
| Backend | FastAPI, Python 3.11+, RDKit, SQLAlchemy 2.0, Pydantic v2 |
| Database | SQLite (dev) / PostgreSQL (prod) |
| DevOps | Docker, GitHub Actions |

See [docs/TECH_STACK_ANALYSIS.md](docs/TECH_STACK_ANALYSIS.md) for technology decisions.

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [RDKit](https://rdkit.org) - Open-source cheminformatics
- [3Dmol.js](https://3dmol.csb.pitt.edu) - WebGL molecular visualization
- [RCSB PDB](https://rcsb.org) - Protein Data Bank
- [shadcn/ui](https://ui.shadcn.com) - Beautiful UI components

---

<div align="center">

**Built with ❤️ for the chemistry community**

</div>

