import { SymbolView } from 'expo-symbols';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import AlertCard from '@/components/AlertCard';
import AlertFilterBar from '@/features/alerts/AlertFilterBar';
import { demoNearbyLocation, filterAlerts, getAlerts, getAlertSummary } from '@/services/alerts.service';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import type { AlertFilter } from '@/types/alert.types';

export default function AlertsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<AlertFilter>('all');
  const { width } = useWindowDimensions();
  const router = useRouter();
  const alerts = useMemo(() => getAlerts(), []);
  const summary = useMemo(() => getAlertSummary(alerts), [alerts]);
  const visibleAlerts = useMemo(
    () => filterAlerts(alerts, selectedFilter),
    [alerts, selectedFilter],
  );
  const compact = width < 360;

  const openAlert = (id: string) => {
    router.push({ pathname: '/alert/[id]', params: { id } });
  };

  const summaryItems = [
    { value: summary.total, label: 'Alertas demo', color: palette.ink, backgroundColor: palette.softSky },
    { value: summary.highPriority, label: 'Riesgo alto', color: '#C94B50', backgroundColor: '#FCE9E8' },
    { value: summary.nearby, label: 'Cerca de mí', color: '#347FB4', backgroundColor: palette.softGreen },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: compact ? spacing.md : spacing.lg },
        ]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Alertas de seguridad</Text>
            <Text style={styles.subtitle}>Avisos locales para viajar con más calma</Text>
          </View>
          <View style={styles.headerIcon}>
            <SymbolView
              name={{ ios: 'bell.badge.fill', android: 'notifications_active', web: 'notifications_active' }}
              size={22}
              tintColor={palette.coral}
            />
          </View>
        </View>

        <View style={styles.summaryRow}>
          {summaryItems.map((item) => (
            <View
              key={item.label}
              style={[styles.summaryCard, { backgroundColor: item.backgroundColor }]}>
              <Text style={[styles.summaryValue, { color: item.color }]}>{item.value}</Text>
              <Text numberOfLines={1} style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Filtrar alertas cercanas a la ubicación de demostración: ${demoNearbyLocation}`}
          accessibilityState={{ selected: selectedFilter === 'nearby' }}
          onPress={() => setSelectedFilter('nearby')}
          style={({ pressed }) => [styles.locationNotice, pressed && styles.pressed]}>
          <View style={styles.locationIcon}>
            <SymbolView
              name={{ ios: 'location.fill', android: 'location_on', web: 'location_on' }}
              size={18}
              tintColor="#347FB4"
            />
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationTitle}>Cerca de mí · ubicación demo</Text>
            <Text style={styles.locationText}>{demoNearbyLocation}</Text>
          </View>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={16}
            tintColor={palette.muted}
          />
        </Pressable>

        <Text style={styles.filterHeading}>Explora por categoría</Text>
        <AlertFilterBar
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
        />

        <View style={styles.listHeading}>
          <Text style={styles.listTitle}>
            {selectedFilter === 'all' ? 'Alertas recientes' : 'Resultados'}
          </Text>
          <Text style={styles.listCount}>
            {visibleAlerts.length} {visibleAlerts.length === 1 ? 'aviso' : 'avisos'}
          </Text>
        </View>

        {visibleAlerts.length > 0 ? (
          visibleAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onPress={() => openAlert(alert.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <SymbolView
                name={{ ios: 'bell.slash.fill', android: 'notifications_off', web: 'notifications_off' }}
                size={25}
                tintColor={palette.muted}
              />
            </View>
            <Text style={styles.emptyTitle}>No hay alertas en este filtro</Text>
            <Text style={styles.emptyDescription}>
              Prueba otra categoría para ver los avisos de esta demostración.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedFilter('all')}
              style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}>
              <Text style={styles.resetButtonText}>Ver todas</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.disclaimer}>
          Los avisos y contadores son ficticios y se muestran únicamente con fines demostrativos.
          No son alertas reales ni información en tiempo real.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.fontWeight.extrabold,
  },
  subtitle: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 13,
  },
  headerIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: palette.softCoral,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 76,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: 18,
  },
  summaryValue: {
    fontFamily: typography.fontFamily.rounded,
    fontSize: 22,
    fontWeight: '800',
  },
  summaryLabel: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontSize: 10,
    fontWeight: '600',
  },
  locationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.white,
  },
  locationIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: palette.softSky,
  },
  locationDetails: {
    flex: 1,
    minWidth: 0,
  },
  locationTitle: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  locationText: {
    marginTop: spacing.xxs,
    color: palette.muted,
    fontSize: 10,
  },
  filterHeading: {
    marginBottom: spacing.xs,
    color: palette.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  listHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  listTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  listCount: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderRadius: 22,
    backgroundColor: palette.white,
  },
  emptyIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: palette.softSky,
  },
  emptyTitle: {
    marginTop: spacing.md,
    color: palette.ink,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  resetButton: {
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: 22,
    backgroundColor: palette.ink,
  },
  resetButtonText: {
    color: palette.white,
    fontSize: 12,
    fontWeight: '700',
  },
  disclaimer: {
    marginTop: spacing.md,
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
