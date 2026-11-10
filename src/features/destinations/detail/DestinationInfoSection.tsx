import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type IconName = ComponentProps<typeof SymbolView>['name'];

interface DestinationInfoSectionProps {
  title: string;
  icon: IconName;
  items: string[];
  displayAsChips?: boolean;
}

export default function DestinationInfoSection({
  title,
  icon,
  items,
  displayAsChips = false,
}: DestinationInfoSectionProps) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <View style={styles.iconContainer}>
          <SymbolView name={icon} size={19} tintColor={palette.ink} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {displayAsChips ? (
        <View style={styles.chips}>
          {items.map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.list}>
          {items.map((item) => (
            <View key={item} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
      <Text style={styles.demoLabel}>Información general de demostración</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    padding: spacing.md,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.softSky,
  },
  title: {
    flex: 1,
    color: palette.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  list: {
    gap: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  bullet: {
    width: 7,
    height: 7,
    marginTop: 6,
    borderRadius: 4,
    backgroundColor: palette.green,
  },
  itemText: {
    flex: 1,
    color: palette.ink,
    fontSize: 12,
    lineHeight: 18,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: palette.softSky,
  },
  chipText: {
    color: palette.ink,
    fontSize: 11,
    fontWeight: '600',
  },
  demoLabel: {
    marginTop: spacing.md,
    color: palette.muted,
    fontSize: 9,
    fontWeight: '600',
  },
});
