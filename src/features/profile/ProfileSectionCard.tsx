import type { ComponentProps, ReactNode } from 'react';
import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface ProfileSectionCardProps {
  title: string;
  icon: ComponentProps<typeof SymbolView>['name'];
  children: ReactNode;
  action?: ReactNode;
}

export default function ProfileSectionCard({
  title,
  icon,
  children,
  action,
}: ProfileSectionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <SymbolView name={icon} size={19} tintColor={palette.ink} />
        </View>
        <Text style={styles.title}>{title}</Text>
        {action}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  header: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  icon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: palette.softSky,
  },
  title: {
    flex: 1,
    color: palette.ink,
    fontSize: 15,
    fontWeight: '800',
  },
});
