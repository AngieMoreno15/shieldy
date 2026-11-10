import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { continentOptions } from '@/features/destinations/continent-options';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import type { DestinationContinent } from '@/types/destination.types';

interface DestinationFilterBarProps {
  selectedContinent: DestinationContinent | 'all';
  onSelectContinent: (continent: DestinationContinent | 'all') => void;
}

export default function DestinationFilterBar({
  selectedContinent,
  onSelectContinent,
}: DestinationFilterBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {continentOptions.map((option) => {
        const selected = selectedContinent === option.id;

        return (
          <Pressable
            key={option.id}
            accessibilityRole="button"
            accessibilityLabel={`Filtrar destinos: ${option.label}`}
            accessibilityState={{ selected }}
            onPress={() => onSelectContinent(option.id)}
            style={({ pressed }) => [
              styles.chip,
              selected && styles.selectedChip,
              pressed && styles.pressed,
            ]}>
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
    alignItems: 'center',
    justifyContent: 'center',
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
