/**
 * Type declarations for 3Dmol.js
 * @see https://3dmol.csb.pitt.edu/doc/
 */

declare module '3dmol' {
  export interface ViewerSpec {
    backgroundColor?: string;
    id?: string;
    defaultcolors?: unknown;
    nomouse?: boolean;
    callback?: (viewer: GLViewer) => void;
  }

  export interface AtomStyleSpec {
    sphere?: { radius?: number; color?: string; colorscheme?: string };
    stick?: { radius?: number; color?: string; colorscheme?: string };
    cartoon?: { color?: string; style?: string; colorscheme?: string };
    line?: { color?: string; colorscheme?: string };
    cross?: { radius?: number; color?: string };
  }

  export interface SurfaceStyleSpec {
    opacity?: number;
    color?: string;
    colorscheme?: string;
  }

  export interface AtomSelectionSpec {
    model?: number;
    serial?: number | number[];
    atom?: string | string[];
    elem?: string | string[];
    resn?: string | string[];
    resi?: number | number[] | string;
    chain?: string | string[];
    ss?: string;
    bonds?: number;
    clickable?: boolean;
    invert?: boolean;
    byres?: boolean;
    expand?: number;
    within?: { distance: number; sel: AtomSelectionSpec };
    and?: AtomSelectionSpec[];
    or?: AtomSelectionSpec[];
    not?: AtomSelectionSpec;
  }

  export interface LabelSpec {
    font?: string;
    fontSize?: number;
    fontColor?: string;
    fontOpacity?: number;
    borderThickness?: number;
    borderColor?: string;
    borderOpacity?: number;
    backgroundColor?: string;
    backgroundOpacity?: number;
    position?: { x: number; y: number; z: number };
    inFront?: boolean;
    showBackground?: boolean;
    alignment?: string;
  }

  export interface GLModel {
    setStyle(sel: AtomSelectionSpec, style: AtomStyleSpec): void;
    addStyle(sel: AtomSelectionSpec, style: AtomStyleSpec): void;
    getAtoms(sel?: AtomSelectionSpec): unknown[];
    removeAllLabels(): void;
    addLabel(text: string, options?: LabelSpec, sel?: AtomSelectionSpec): void;
  }

  export interface GLViewer {
    addModel(data: string, format: string): GLModel;
    removeAllModels(): void;
    setStyle(sel: AtomSelectionSpec, style: AtomStyleSpec): void;
    addStyle(sel: AtomSelectionSpec, style: AtomStyleSpec): void;
    addSurface(
      type: string,
      style?: SurfaceStyleSpec,
      sel?: AtomSelectionSpec
    ): Promise<unknown>;
    removeSurface(surface: unknown): void;
    removeAllSurfaces(): void;
    setBackgroundColor(color: string, alpha?: number): void;
    zoomTo(sel?: AtomSelectionSpec, animationDuration?: number): void;
    zoom(factor: number, animationDuration?: number): void;
    center(sel?: AtomSelectionSpec, animationDuration?: number): void;
    rotate(angle: number, axis?: string, animationDuration?: number): void;
    spin(axis?: string | boolean, speed?: number): void;
    render(): void;
    resize(): void;
    clear(): void;
    getModel(id?: number): GLModel;
    addLabel(
      text: string,
      options?: LabelSpec,
      sel?: AtomSelectionSpec
    ): unknown;
    removeAllLabels(): void;
    setClickable(
      sel: AtomSelectionSpec,
      clickable: boolean,
      callback?: (atom: unknown) => void
    ): void;
    enableFog(enable: boolean): void;
    setFogStart(start: number): void;
    setFogEnd(end: number): void;
    setSlab(near: number, far: number): void;
    setView(view: unknown[]): void;
    getView(): unknown[];
    pngURI(): string;
  }

  export function createViewer(
    element: HTMLElement | string,
    config?: ViewerSpec
  ): GLViewer;

  export const SurfaceType: {
    VDW: string;
    MS: string;
    SAS: string;
    SES: string;
  };
}

