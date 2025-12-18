/**
 * MolView 360 - Main Application Component
 * 3D Molecular Visualization Platform
 */

import { useState } from 'react';
import { MoleculeViewer, type ViewStyle } from '@/components/viewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STYLE_OPTIONS: { value: ViewStyle; label: string }[] = [
  { value: 'cartoon', label: '🎭 Cartoon' },
  { value: 'stick', label: '🥢 Stick' },
  { value: 'sphere', label: '⚪ Sphere' },
  { value: 'line', label: '📏 Line' },
  { value: 'surface', label: '🫧 Surface' },
];

// Sample molecules for easy testing
const SAMPLE_MOLECULES = [
  { id: '1UBQ', name: 'Ubiquitin', desc: 'Small protein (76 residues)' },
  { id: '1CRN', name: 'Crambin', desc: 'Tiny protein (46 residues)' },
  { id: '2POR', name: 'Porin', desc: 'Membrane protein' },
  { id: '1HHO', name: 'Hemoglobin', desc: 'Oxygen transport protein' },
  { id: '3J3Y', name: 'Ribosome', desc: 'Large complex (caution: slow)' },
  { id: '1BNA', name: 'DNA B-Form', desc: 'Classic DNA double helix' },
  { id: '4HHB', name: 'Deoxy-Hemoglobin', desc: 'Hemoglobin (deoxy form)' },
  { id: '1AKE', name: 'Adenylate Kinase', desc: 'Enzyme with ligand' },
  { id: '2HYY', name: 'GFP', desc: 'Green Fluorescent Protein' },
  { id: '1MBO', name: 'Myoglobin', desc: 'Oxygen storage protein' },
];

function App() {
  const [pdbId, setPdbId] = useState('1UBQ');
  const [inputValue, setInputValue] = useState('1UBQ');
  const [style, setStyle] = useState<ViewStyle>('cartoon');
  const [spin, setSpin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setPdbId(inputValue.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧬</span>
              <h1 className="text-2xl font-bold text-white">
                MolView <span className="text-cyan-400">360</span>
              </h1>
            </div>
            <nav className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                The Chemist's GitHub
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Hero Section */}
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              3D Molecular Visualization
            </h2>
            <p className="max-w-2xl text-lg text-slate-400">
              Upload, visualize, and analyze molecular structures with
              interactive 3D rendering and property calculations.
            </p>
          </div>

          {/* Controls */}
          <Card className="w-full max-w-4xl border-slate-700 bg-slate-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-white">Load Molecule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {/* Sample Molecules Dropdown */}
                <div className="flex flex-1 gap-2">
                  <select
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setPdbId(e.target.value);
                    }}
                    className="flex-1 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="" disabled>Select a molecule...</option>
                    {SAMPLE_MOLECULES.map((mol) => (
                      <option key={mol.id} value={mol.id}>
                        {mol.id} - {mol.name} ({mol.desc})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Manual PDB ID Input */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Or enter PDB ID"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleLoad()}
                    className="w-32 border-slate-600 bg-slate-700 text-white placeholder:text-slate-400"
                  />
                  <Button onClick={handleLoad} variant="default">
                    Load
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((opt) => (
                    <Button
                      key={opt.value}
                      variant={style === opt.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStyle(opt.value)}
                      className={style !== opt.value ? 'border-slate-600 text-slate-300' : ''}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
                <Button
                  variant={spin ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSpin(!spin)}
                  className={!spin ? 'border-slate-600 text-slate-300' : ''}
                >
                  {spin ? '⏸️ Stop' : '🔄 Spin'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 3D Viewer */}
          <div className="w-full max-w-4xl rounded-xl border border-slate-700 bg-slate-800/50 p-4">
            <MoleculeViewer
              pdbId={pdbId}
              style={style}
              spin={spin}
              height="500px"
              onLoad={() => setIsLoaded(true)}
              onError={(err) => console.error('Viewer error:', err)}
            />
            {isLoaded && (
              <p className="mt-2 text-center text-sm text-slate-400">
                Viewing: <span className="font-mono text-cyan-400">{pdbId}</span> |
                Style: <span className="text-cyan-400">{style}</span> |
                Drag to rotate, scroll to zoom
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

