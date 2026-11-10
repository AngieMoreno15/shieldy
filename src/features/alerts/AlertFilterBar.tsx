import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { alertFilterOptions } from '@/features/alerts/alert-presentation';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import type { AlertFilter } from '@/types/alert.types';

interface AlertFilterBarProps {
  selectedFilter: AlertFilter;
  onSelectFilter: (filter: AlertFilter) => void;
}

export default function AlertFilterBar({
  selectedFilter,
  onSelectFilter,
}: AlertFilterBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {alertFilterOptions.map((option) => {
        const selected = selectedFilter === option.id;

        return (
          <Pressable
            key={option.id}
            accessibilityRole="button"
            accessibilityLabel={`Filtrar alertas: ${option.label}`}
            accessibilityState={{ selected }}
            onPress={() => onSelectFilter(option.id)}
            style={({ pressed }) => [
              styles.chip,
              selected && styles.selectedChip,
              pressed && styles.pressed,
            ]}>
            <SymbolView
              name={option.icon}
              size={15}
              tintColor={selected ? palette.white : palette.muted}
            />
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  chip: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  selectedChip: {
    borderColor: palette.ink,
    backgroundColor: palette.ink,
  },
  label: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '600',
  },
  selectedLabel: {
    color: palette.white,
  },
  pressed: {
    opacity: 0.78,
  },
});
