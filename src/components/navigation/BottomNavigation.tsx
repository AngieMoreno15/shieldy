import type { ComponentProps } from 'react';
import { SymbolView } from 'expo-symbols';
import { usePathname, useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const tabs: {
  label: string;
  path: string;
  href: Href;
  icon: ComponentProps<typeof SymbolView>['name'];
}[] = [
  {
    label: 'Inicio',
    path: '/home',
    href: '/(tabs)/home',
    icon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  {
    label: 'Mapa',
    path: '/map',
    href: '/(tabs)/map',
    icon: { ios: 'map.fill', android: 'map', web: 'map' },
  },
  {
    label: 'Destinos',
    path: '/destinations',
    href: '/(tabs)/destinations',
    icon: { ios: 'suitcase.fill', android: 'explore', web: 'explore' },
  },
  {
    label: 'Alertas',
    path: '/alerts',
    href: '/(tabs)/alerts',
    icon: { ios: 'bell.fill', android: 'notifications', web: 'notifications' },
  },
  {
    label: 'Perfil',
    path: '/profile',
    href: '/(tabs)/profile',
    icon: { ios: 'person.crop.circle.fill', android: 'person', web: 'account_circle' },
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.xs) }]}>
      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const selected = pathname === tab.path;

          return (
            <Pressable
              key={tab.path}
              accessibilityLabel={tab.label}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => router.navigate(tab.href)}
              style={({ pressed }) => [
                styles.tab,
                pressed && styles.pressed,
              ]}>
              <SymbolView
                name={tab.icon}
                size={21}
                tintColor={selected ? palette.coral : palette.muted}
              />
              <Text style={[styles.label, selected && styles.selectedLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.border,
    backgroundColor: palette.white,
  },
  tabs: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.sm,
  },
  tab: {
    minWidth: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxs,
    paddingVertical: spacing.xs,
  },
  label: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedLabel: {
    color: palette.ink,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.65,
  },
});