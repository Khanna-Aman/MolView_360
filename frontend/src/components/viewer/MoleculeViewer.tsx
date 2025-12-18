/**
 * MoleculeViewer Component
 * 3D molecular visualization using 3Dmol.js
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import * as $3Dmol from '3dmol';
import type { GLViewer, AtomStyleSpec } from '3dmol';

export type ViewStyle = 'cartoon' | 'stick' | 'sphere' | 'line' | 'surface';

export interface MoleculeViewerProps {
  /** PDB data string or URL to fetch */
  pdbData?: string;
  /** PDB ID to fetch from RCSB */
  pdbId?: string;
  /** Visualization style */
  style?: ViewStyle;
  /** Background color */
  backgroundColor?: string;
  /** Enable spin animation */
  spin?: boolean;
  /** Container height */
  height?: string;
  /** Container width */
  width?: string;
  /** Callback when molecule is loaded */
  onLoad?: () => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

const styleMap: Record<ViewStyle, AtomStyleSpec> = {
  cartoon: { cartoon: { color: 'spectrum' } },
  stick: { stick: { radius: 0.15 } },
  sphere: { sphere: { radius: 0.5 } },
  line: { line: {} },
  surface: { cartoon: { color: 'spectrum' } }, // Surface added separately
};

export function MoleculeViewer({
  pdbData,
  pdbId,
  style = 'cartoon',
  backgroundColor = '#1a1a2e',
  spin = false,
  height = '500px',
  width = '100%',
  onLoad,
  onError,
}: MoleculeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<GLViewer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize viewer
  useEffect(() => {
    if (!containerRef.current) return;

    // Create viewer
    viewerRef.current = $3Dmol.createViewer(containerRef.current, {
      backgroundColor,
    });

    // Cleanup on unmount
    return () => {
      if (viewerRef.current) {
        viewerRef.current.clear();
        viewerRef.current = null;
      }
    };
  }, [backgroundColor]);

  // Fetch PDB data from RCSB
  const fetchPdb = useCallback(async (id: string): Promise<string> => {
    const response = await fetch(
      `https://files.rcsb.org/download/${id.toUpperCase()}.pdb`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch PDB ${id}: ${response.statusText}`);
    }
    return response.text();
  }, []);

  // Load molecule
  const loadMolecule = useCallback(
    async (data: string) => {
      if (!viewerRef.current) return;

      const viewer = viewerRef.current;
      viewer.removeAllModels();
      viewer.removeAllSurfaces();

      viewer.addModel(data, 'pdb');
      viewer.setStyle({}, styleMap[style]);

      if (style === 'surface') {
        await viewer.addSurface($3Dmol.SurfaceType.VDW, {
          opacity: 0.8,
          colorscheme: 'whiteCarbon',
        });
      }

      viewer.zoomTo();
      viewer.render();

      if (spin) {
        viewer.spin('y', 1);
      } else {
        viewer.spin(false);
      }
    },
    [style, spin]
  );

  // Handle PDB loading
  useEffect(() => {
    const loadPdb = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let data = pdbData;

        if (!data && pdbId) {
          data = await fetchPdb(pdbId);
        }

        if (data) {
          await loadMolecule(data);
          onLoad?.();
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error.message);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pdbData || pdbId) {
      loadPdb();
    }
  }, [pdbData, pdbId, fetchPdb, loadMolecule, onLoad, onError]);

  // Update style when changed
  useEffect(() => {
    if (!viewerRef.current || (!pdbData && !pdbId)) return;

    const viewer = viewerRef.current;
    viewer.setStyle({}, styleMap[style]);

    if (style === 'surface') {
      viewer.removeAllSurfaces();
      viewer.addSurface($3Dmol.SurfaceType.VDW, {
        opacity: 0.8,
        colorscheme: 'whiteCarbon',
      });
    } else {
      viewer.removeAllSurfaces();
    }

    viewer.render();
  }, [style, pdbData, pdbId]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      viewerRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative" style={{ width, height }}>
      <div
        ref={containerRef}
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{ width: '100%', height: '100%' }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <div className="text-white text-lg">Loading molecule...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 rounded-lg">
          <div className="text-white text-center p-4">
            <p className="font-bold">Error loading molecule</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoleculeViewer;

