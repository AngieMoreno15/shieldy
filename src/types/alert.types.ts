export type AlertCategory = 'security' | 'transport' | 'health';
export type AlertPriority = 'high' | 'caution' | 'preventive' | 'transport';
export type AlertFilter = 'all' | 'nearby' | AlertCategory;

export interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  timeLabel: string;
  category: AlertCategory;
  priority: AlertPriority;
  isNearDemoLocation: boolean;
  isDemonstrationData: true;
}