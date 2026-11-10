export type ProjectCategory = 'commercial' | 'narrative' | 'ad-reel' | 'aerial-fpv' | 'studio-macro';

export interface Project {
  id: string;
  title: string;
  client: string;
  director: string;
  camera: string;
  format: string;
  year: string;
  category: ProjectCategory;
  synopsis: string;
  metrics: string;
  tags: string[];
  aspectRatio: string;
  colorGrade: {
    primaryTone: string;
    lutName: string;
    ambientHex: string;
  };
}

export interface CineRigElement {
  id: string;
  partNumber: string;
  name: string;
  category: 'OPTICS' | 'APERTURE' | 'SENSOR' | 'CHASSIS' | 'RIGGING';
  specs: string;
  description: string;
  pipelineStage: string;
  explodedOffset: number; // Y or Z percentage displacement
}

export interface StudioZone {
  id: string;
  title: string;
  callsign: string;
  timecode: string;
  badge: string;
  description: string;
  technicalSpecs: { label: string; value: string }[];
  isFeatured?: boolean;
}

export interface MetricProof {
  id: string;
  value: string;
  suffix: string;
  label: string;
  context: string;
}

export interface ColorGradePreset {
  id: string;
  name: string;
  projectTitle: string;
  camera: string;
  filmStock: string;
  highlights: string;
  shadows: string;
}
