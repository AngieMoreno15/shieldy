import { StyleSheet, Text, View } from 'react-native';

import { alertPriorityPresentation } from '@/features/alerts/alert-presentation';
import type { AlertPriority } from '@/types/alert.types';

interface AlertPriorityBadgeProps {
  priority: AlertPriority;
}

export default function AlertPriorityBadge({ priority }: AlertPriorityBadgeProps) {
  const presentation = alertPriorityPresentation[priority];

  return (
    <View style={[styles.badge, { backgroundColor: presentation.backgroundColor }]}>
      <Text style={[styles.label, { color: presentation.color }]}>
        {presentation.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
