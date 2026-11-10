import type {
  IncidentCategory,
  IncidentSeverity,
} from '@/types/report.types';

export const incidentCategoryOptions: {
  id: IncidentCategory;
  label: string;
  description: string;
}[] = [
  { id: 'theft', label: 'Robo', description: 'Pérdida o sustracción de pertenencias' },
  { id: 'harassment', label: 'Acoso', description: 'Situación incómoda o de acoso' },
  { id: 'accident', label: 'Accidente', description: 'Incidente o lesión' },
  {
    id: 'medical-emergency',
    label: 'Emergencia médica',
    description: 'Situación de salud de ejemplo',
  },
  { id: 'other', label: 'Otros', description: 'Otro tipo de situación' },
];

export const incidentSeverityOptions: {
  id: IncidentSeverity;
  label: string;
  color: string;
  backgroundColor: string;
}[] = [
  { id: 'low', label: 'Baja', color: '#3F8C68', backgroundColor: '#EAF7F0' },
  { id: 'medium', label: 'Media', color: '#B85C12', backgroundColor: '#FFF0E1' },
  { id: 'high', label: 'Alta', color: '#C94B50', backgroundColor: '#FCE9E8' },
];

export function getDemonstrationReportLocation(destinationName: string): string {
  return `Zona centro · ${destinationName} · Ubicación de demostración (sin GPS)`;
}