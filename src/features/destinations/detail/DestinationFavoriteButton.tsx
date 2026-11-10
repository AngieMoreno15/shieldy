import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text } from 'react-native';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface DestinationFavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

export default function DestinationFavoriteButton({
  isFavorite,
  onPress,
}: DestinationFavoriteButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      accessibilityState={{ selected: isFavorite }}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <SymbolView
        name={{
          ios: isFavorite ? 'heart.fill' : 'heart',
          android: isFavorite ? 'favorite' : 'favorite_border',
          web: isFavorite ? 'favorite' : 'favorite_border',
        }}
        size={19}
        tintColor={isFavorite ? palette.coral : palette.ink}
      />
      <Text style={styles.label}>{isFavorite ? 'Guardado' : 'Favorito'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 22,
    backgroundColor: palette.white,
  },
  label: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
