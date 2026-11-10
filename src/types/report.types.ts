export type IncidentCategory =
  | 'theft'
  | 'harassment'
  | 'accident'
  | 'medical-emergency'
  | 'other';

export type IncidentSeverity = 'low' | 'medium' | 'high';

export interface IncidentReportFormValues {
  category: IncidentCategory | null;
  title: string;
  description: string;
  destinationId: string | null;
  severity: IncidentSeverity;
}

export type IncidentReportFormErrors = Partial<
  Record<'category' | 'title' | 'description' | 'destinationId', string>
>;

export interface SubmittedIncidentReport {
  id: string;
  category: IncidentCategory;
  title: string;
  description: string;
  destinationId: string;
  destinationName: string;
  demonstrationLocation: string;
  severity: IncidentSeverity;
  submittedAt: number;
  isDemonstrationData: true;
}