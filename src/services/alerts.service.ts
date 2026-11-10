import { demoAlerts } from '@/data/mock/alerts.mock';
import type { AlertFilter, SafetyAlert } from '@/types/alert.types';

export const demoNearbyLocation = 'Centro de Bogotá · Ubicación de demostración';

export interface AlertSummary {
  total: number;
  highPriority: number;
  nearby: number;
}

export function getAlerts(): SafetyAlert[] {
  return demoAlerts;
}

export function getRecentAlerts(limit = 2): SafetyAlert[] {
  return demoAlerts.slice(0, limit);
}

export function getAlertById(id: string): SafetyAlert | undefined {
  return demoAlerts.find((alert) => alert.id === id);
}

export function filterAlerts(alerts: SafetyAlert[], filter: AlertFilter): SafetyAlert[] {
  if (filter === 'all') return alerts;
  if (filter === 'nearby') return alerts.filter((alert) => alert.isNearDemoLocation);
  return alerts.filter((alert) => alert.category === filter);
}

export function getAlertSummary(alerts: SafetyAlert[]): AlertSummary {
  return {
    total: alerts.length,
    highPriority: alerts.filter((alert) => alert.priority === 'high').length,
    nearby: alerts.filter((alert) => alert.isNearDemoLocation).length,
  };
}