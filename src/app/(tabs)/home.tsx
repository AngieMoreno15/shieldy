import { SymbolView } from 'expo-symbols';
import { useMemo, useState, type ComponentProps } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, type Href } from 'expo-router';

import AlertCard from '@/components/AlertCard';
import DestinationCard from '@/components/DestinationCard';
import { getRecentAlerts } from '@/services/alerts.service';
import { searchDestinations } from '@/services/destinations.service';
import { getCurrentUser } from '@/services/user.service';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

type IconName = ComponentProps<typeof SymbolView>['name'];

const quickActions: {
  label: string;
  href: Href;
  icon: IconName;
  backgroundColor: string;
}[] = [
  {
    label: 'Mapa',
    href: '/(tabs)/map',
    icon: { ios: 'map.fill', android: 'map', web: 'map' },
    backgroundColor: palette.softGreen,
  },
  {
    label: 'Alertas',
    href: '/(tabs)/alerts',
    icon: { ios: 'bell.fill', android: 'notifications', web: 'notifications' },
    backgroundColor: palette.softYellow,
  },
  {
    label: 'Destinos',
    href: '/(tabs)/destinations',
    icon: { ios: 'suitcase.fill', android: 'luggage', web: 'luggage' },
    backgroundColor: palette.softSky,
  },
  {
    label: 'Reportar',
    href: '/report',
    icon: { ios: 'square.and.pencil', android: 'edit_square', web: 'edit_square' },
    backgroundColor: palette.softCoral,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const router = useRouter();
  const user = getCurrentUser();
  const alerts = getRecentAlerts();
  const matchingDestinations = useMemo(
    () => searchDestinations(searchQuery),
    [searchQuery],
  );
  const compact = width < 680;

  const openDestination = (id: string) => {
    router.push({ pathname: '/destination/[id]', params: { id } });
  };

  const openAlert = (id: string) => {
    router.push({ pathname: '/alert/[id]', params: { id } });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingHorizontal: width < 360 ? spacing.md : spacing.lg }]}>
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>¡Hola, {user.firstName}!</Text>
            <Text style={styles.subtitle}>¿Lista para tu próxima aventura?</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver todas las alertas"
            onPress={() => router.navigate('/(tabs)/alerts')}
            style={({ pressed }) => [styles.notificationButton, pressed && styles.pressed]}>
            <SymbolView
              name={{ ios: 'bell.badge', android: 'notifications_active', web: 'notifications_active' }}
              size={22}
              tintColor={palette.ink}
            />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <SymbolView
              name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
              size={14}
              tintColor={palette.ink}
            />
            <Text style={styles.heroBadgeText}>TU COMPAÑERA DE VIAJE</Text>
          </View>
          <Text style={styles.heroTitle}>Explora con confianza, viaja con tranquilidad.</Text>
          <Text style={styles.heroDescription}>
            Encuentra inspiración, descubre destinos y conoce esta demostración local.
          </Text>

          <View style={styles.searchBox}>
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              size={20}
              tintColor={palette.muted}
            />
            <TextInput
              accessibilityLabel="Buscar por ciudad o país"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={setSearchQuery}
              placeholder="Busca un país o una ciudad"
              placeholderTextColor={palette.muted}
              returnKeyType="search"
              style={styles.searchInput}
              value={searchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Limpiar búsqueda"
                onPress={() => setSearchQuery('')}
                hitSlop={8}>
                <SymbolView
                  name={{ ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' }}
                  size={18}
                  tintColor={palette.muted}
                />
              </Pressable>
            )}
          </View>
          {searchQuery.trim().length > 0 && (
            <Text accessibilityLiveRegion="polite" style={styles.searchCount}>
              {matchingDestinations.length === 1
                ? '1 destino encontrado'
                : `${matchingDestinations.length} destinos encontrados`}
            </Text>
          )}
        </View>

        <SectionHeading title="Accesos rápidos" />
        <View style={[styles.quickGrid, !compact && styles.quickGridWide]}>
          {quickActions.map((action) => (
            <Pressable
              key={action.label}
              accessibilityRole="button"
              accessibilityLabel={`Ir a ${action.label}`}
              onPress={() => router.navigate(action.href)}
              style={({ pressed }) => [
                styles.quickAction,
                { backgroundColor: action.backgroundColor },
                !compact && styles.quickActionWide,
                pressed && styles.pressed,
              ]}>
              <View style={styles.quickIconContainer}>
                <SymbolView name={action.icon} size={20} tintColor={palette.ink} />
              </View>
              <Text style={styles.quickActionText}>{action.label}</Text>
              <SymbolView
                name={{ ios: 'arrow.up.right', android: 'arrow_outward', web: 'arrow_outward' }}
                size={13}
                tintColor={palette.ink}
              />
            </Pressable>
          ))}
        </View>

        <SectionHeading
          title={searchQuery.trim() ? 'Resultados' : 'Destinos destacados'}
          actionLabel={searchQuery.trim() ? undefined : 'Ver destinos'}
          onActionPress={() => router.navigate('/(tabs)/destinations')}
        />
        <View style={[styles.destinationGrid, compact && styles.destinationGridCompact]}>
          {matchingDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onPress={() => openDestination(destination.id)}
            />
          ))}
        </View>
        {matchingDestinations.length === 0 && (
          <View style={styles.emptySearch}>
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search_off', web: 'search_off' }}
              size={27}
              tintColor={palette.muted}
            />
            <Text style={styles.emptySearchTitle}>Aún no encontramos ese destino</Text>
            <Text style={styles.emptySearchDescription}>
              Prueba con Bogotá, Ciudad de México, Marrakech, Colombia, México o Marruecos.
            </Text>
            <Pressable accessibilityRole="button" onPress={() => setSearchQuery('')}>
              <Text style={styles.clearSearch}>Borrar búsqueda</Text>
            </Pressable>
          </View>
        )}
        {searchQuery.trim().length > 0 && matchingDestinations.length > 0 && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setSearchQuery('')}
            style={styles.showAllButton}>
            <Text style={styles.showAllText}>Mostrar todos los destinos</Text>
          </Pressable>
        )}

        <View style={styles.alertHeading}>
          <SectionHeading
            title="Alertas recientes"
            actionLabel="Ver todas"
            onActionPress={() => router.navigate('/(tabs)/alerts')}
          />
        </View>
        <View style={styles.demoNotice}>
          <SymbolView
            name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
            size={17}
            tintColor={palette.ink}
          />
          <Text style={styles.demoNoticeText}>
            Datos de demostración; no son alertas reales ni información en tiempo real.
          </Text>
        </View>
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onPress={() => openAlert(alert.id)}
          />
        ))}

        <View style={styles.footer}>
          <SymbolView
            name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
            size={21}
            tintColor={palette.coral}
          />
          <Text style={styles.footerTitle}>Cada viaje merece una historia bonita.</Text>
          <Text style={styles.footerDescription}>
            La información de esta vista es simulada para una demostración académica.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SectionHeadingProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

function SectionHeading({ title, actionLabel, onActionPress }: SectionHeadingProps) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel && onActionPress && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onActionPress}
          hitSlop={8}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  content: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.extrabold,
  },
  subtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: typography.fontSize.body,
  },
  notificationButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: palette.white,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.coral,
  },
  hero: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderRadius: 28,
    backgroundColor: palette.softGreen,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: palette.white,
  },
  heroBadgeText: {
    color: palette.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  heroTitle: {
    maxWidth: 580,
    marginTop: spacing.md,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 27,
    fontWeight: typography.fontWeight.extrabold,
    lineHeight: 35,
  },
  heroDescription: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    color: palette.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  searchBox: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 17,
    backgroundColor: palette.white,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.sm,
    color: palette.ink,
    fontSize: typography.fontSize.body,
  },
  searchCount: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: typography.fontSize.caption,
  },
  sectionHeading: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    flex: 1,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.bold,
  },
  sectionAction: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  quickGridWide: {
    flexWrap: 'nowrap',
  },
  quickAction: {
    width: '48%',
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 19,
  },
  quickActionWide: {
    flex: 1,
    width: undefined,
    paddingHorizontal: spacing.sm,
  },
  quickIconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: palette.white,
  },
  quickActionText: {
    flex: 1,
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  destinationGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  destinationGridCompact: {
    flexDirection: 'column',
  },
  emptySearch: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: 22,
    backgroundColor: palette.softSky,
  },
  emptySearchTitle: {
    marginTop: spacing.md,
    color: palette.ink,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptySearchDescription: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  clearSearch: {
    marginTop: spacing.md,
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  showAllButton: {
    alignSelf: 'center',
    padding: spacing.sm,
    marginTop: -spacing.lg,
    marginBottom: spacing.lg,
  },
  showAllText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  alertHeading: {
    marginTop: spacing.xs,
  },
  demoNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 16,
    backgroundColor: palette.softYellow,
  },
  demoNoticeText: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
    lineHeight: 17,
  },
  footer: {
    alignItems: 'center',
    padding: spacing.lg,
    marginTop: spacing.md,
    borderRadius: 22,
    backgroundColor: palette.softSky,
  },
  footerTitle: {
    marginTop: spacing.sm,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  footerDescription: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
});
