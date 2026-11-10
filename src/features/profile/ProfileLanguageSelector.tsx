import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ProfileLanguage } from '@/types/user.types';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const languageOptions: { value: ProfileLanguage; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
];

interface ProfileLanguageSelectorProps {
  value: ProfileLanguage;
  onChange: (language: ProfileLanguage) => void;
}

export default function ProfileLanguageSelector({
  value,
  onChange,
}: ProfileLanguageSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Idioma preferido</Text>
      <View style={styles.options}>
        {languageOptions.map((option) => {
          const selected = value === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityLabel={`Idioma: ${option.label}`}
              accessibilityState={{ selected }}
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.selectedOption,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.optionText, selected && styles.selectedText]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.hint}>
        Preferencia de demostración; la interfaz se mantiene en español.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm,
  },
  label: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  option: {
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.canvas,
  },
  selectedOption: {
    borderColor: palette.green,
    backgroundColor: palette.softGreen,
  },
  optionText: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '700',
  },
  selectedText: {
    color: '#347452',
  },
  hint: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 9,
    lineHeight: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});
