import { Switch, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface ProfilePreferenceRowProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function ProfilePreferenceRow({
  title,
  description,
  value,
  onValueChange,
}: ProfilePreferenceRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        accessibilityLabel={title}
        accessibilityHint="Preferencia local de demostración"
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: palette.border, true: '#B9DFCA' }}
        thumbColor={value ? '#3F8C68' : '#F6F8F9'}
        ios_backgroundColor={palette.border}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.border,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
  },
});
