import { getDemonstrationReportLocation } from '@/data/mock/reports.mock';
import { getDestinationById } from '@/services/destinations.service';
import type {
  IncidentReportFormErrors,
  IncidentReportFormValues,
  SubmittedIncidentReport,
} from '@/types/report.types';

export type ReportsChangeListener = () => void;

let submittedReports: SubmittedIncidentReport[] = [];
let nextReportSequence = 1;
const listeners = new Set<ReportsChangeListener>();

export function validateIncidentReport(
  values: IncidentReportFormValues,
): IncidentReportFormErrors {
  const errors: IncidentReportFormErrors = {};

  if (!values.category) {
    errors.category = 'Selecciona una categoría para el reporte.';
  }
  if (!values.title.trim()) {
    errors.title = 'Escribe un título para continuar.';
  }
  if (!values.description.trim()) {
    errors.description = 'Describe brevemente el reporte.';
  }
  if (!values.destinationId || !getDestinationById(values.destinationId)) {
    errors.destinationId = 'Selecciona un destino de la lista.';
  }

  return errors;
}

export function submitIncidentReport(
  values: IncidentReportFormValues,
): SubmittedIncidentReport | undefined {
  if (Object.keys(validateIncidentReport(values)).length > 0 || !values.category) {
    return undefined;
  }

  const destination = values.destinationId
    ? getDestinationById(values.destinationId)
    : undefined;
  if (!destination) return undefined;

  const report: SubmittedIncidentReport = {
    id: `demo-report-${Date.now()}-${nextReportSequence++}`,
    category: values.category,
    title: values.title.trim(),
    description: values.description.trim(),
    destinationId: destination.id,
    destinationName: `${destination.city}, ${destination.country}`,
    demonstrationLocation: getDemonstrationReportLocation(destination.city),
    severity: values.severity,
    submittedAt: Date.now(),
    isDemonstrationData: true,
  };

  submittedReports = [report, ...submittedReports];
  listeners.forEach((listener) => listener());
  return report;
}

export function getSubmittedIncidentReports(): SubmittedIncidentReport[] {
  return submittedReports;
}

export function subscribeToSubmittedIncidentReports(
  listener: ReportsChangeListener,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}