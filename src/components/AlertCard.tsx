import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import AlertPriorityBadge from '@/features/alerts/AlertPriorityBadge';
import { alertCategoryPresentation, alertPriorityPresentation } from '@/features/alerts/alert-presentation';
import type { SafetyAlert } from '@/types/alert.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface AlertCardProps {
  alert: SafetyAlert;
  onPress: () => void;
}

export default function AlertCard({ alert, onPress }: AlertCardProps) {
  const category = alertCategoryPresentation[alert.category];
  const priority = alertPriorityPresentation[alert.priority];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${priority.label}: ${alert.title}. ${alert.city}, ${alert.timeLabel}. Demostración.`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconContainer, { backgroundColor: priority.backgroundColor }]}>
        <SymbolView name={category.icon} size={21} tintColor={priority.color} />
      </View>
      <View style={styles.details}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{category.label}</Text>
          <AlertPriorityBadge priority={alert.priority} />
        </View>
        <Text style={styles.title}>{alert.title}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {alert.description}
        </Text>
        <View style={styles.metadata}>
          <SymbolView
            name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
            size={14}
            tintColor={palette.muted}
          />
          <Text numberOfLines={1} style={styles.location}>
            {alert.location} · {alert.city}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.date}>{alert.timeLabel}</Text>
          {alert.isDemonstrationData && (
            <View style={styles.demoBadge}>
              <Text style={styles.demoLabel}>DEMOSTRACIÓN</Text>
            </View>
          )}
        </View>
      </View>
      <SymbolView
        name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
        size={15}
        tintColor={palette.muted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  category: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    marginTop: spacing.xs,
    color: palette.ink,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 12,
    lineHeight: 17,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    marginTop: spacing.sm,
  },
  location: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  date: {
    color: palette.muted,
    fontSize: 10,
  },
  demoBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: 10,
    backgroundColor: palette.softYellow,
  },
  demoLabel: {
    color: palette.ink,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.35,
  },
  pressed: {
    opacity: 0.82,
  },
});
