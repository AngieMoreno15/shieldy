import type { IncidentCategory, IncidentSeverity } from '@/types/report.types';

export const incidentCategoryLabels: Record<IncidentCategory, string> = {
  theft: 'Robo',
  harassment: 'Acoso',
  accident: 'Accidente',
  'medical-emergency': 'Emergencia médica',
  other: 'Otros',
};

export const incidentSeverityPresentation: Record<
  IncidentSeverity,
  { label: string; color: string; backgroundColor: string }
> = {
  low: { label: 'Baja', color: '#3F8C68', backgroundColor: '#EAF7F0' },
  medium: { label: 'Media', color: '#B85C12', backgroundColor: '#FFF0E1' },
  high: { label: 'Alta', color: '#C94B50', backgroundColor: '#FCE9E8' },
};
