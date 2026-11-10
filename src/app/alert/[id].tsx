import { SymbolView } from 'expo-symbols';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AlertPriorityBadge from '@/features/alerts/AlertPriorityBadge';
import { alertCategoryPresentation, alertPriorityPresentation } from '@/features/alerts/alert-presentation';
import { getAlertById } from '@/services/alerts.service';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const alert = typeof id === 'string' ? getAlertById(id) : undefined;

  const returnToAlerts = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/(tabs)/alerts');
  };

  const category = alert ? alertCategoryPresentation[alert.category] : null;
  const priority = alert ? alertPriorityPresentation[alert.priority] : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver a las alertas"
          onPress={returnToAlerts}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={18}
            tintColor={palette.ink}
          />
          <Text style={styles.backLabel}>Volver a alertas</Text>
        </Pressable>

        {alert && category && priority ? (
          <View style={styles.detailCard}>
            <View style={styles.eyebrowRow}>
              <View style={[styles.categoryIcon, { backgroundColor: priority.backgroundColor }]}>
                <SymbolView name={category.icon} size={22} tintColor={priority.color} />
              </View>
              <View style={styles.badges}>
                <AlertPriorityBadge priority={alert.priority} />
                <View style={styles.demoBadge}>
                  <Text style={styles.demoLabel}>DEMOSTRACIÓN</Text>
                </View>
              </View>
            </View>

            <Text style={styles.categoryLabel}>{category.label}</Text>
            <Text style={styles.title}>{alert.title}</Text>
            <Text style={styles.description}>{alert.description}</Text>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <SymbolView
                name={{ ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' }}
                size={18}
                tintColor={palette.coral}
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Ubicación demostrativa</Text>
                <Text style={styles.infoValue}>{alert.location} · {alert.city}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <SymbolView
                name={{ ios: 'clock', android: 'schedule', web: 'schedule' }}
                size={18}
                tintColor={palette.coral}
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Fecha de demostración</Text>
                <Text style={styles.infoValue}>{alert.timeLabel}</Text>
              </View>
            </View>

            <View style={styles.notice}>
              <SymbolView
                name={{ ios: 'info.circle.fill', android: 'info', web: 'info' }}
                size={17}
                tintColor={palette.ink}
              />
              <Text style={styles.noticeText}>
                Este contenido es ficticio, no describe una alerta real y no se actualiza en tiempo real.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.notFoundCard}>
            <Text style={styles.notFoundTitle}>No encontramos esta alerta</Text>
            <Text style={styles.notFoundDescription}>
              El aviso puede no estar disponible en esta demostración.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={returnToAlerts}
              style={({ pressed }) => [styles.returnButton, pressed && styles.pressed]}>
              <Text style={styles.returnButtonText}>Regresar a las alertas</Text>
            </Pressable>
          </View>
        )}
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
    maxWidth: 680,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  backButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: 18,
    backgroundColor: palette.white,
  },
  backLabel: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  detailCard: {
    padding: spacing.lg,
    borderRadius: 26,
    backgroundColor: palette.white,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  badges: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  demoBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: 10,
    backgroundColor: palette.softYellow,
  },
  demoLabel: {
    color: palette.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  categoryLabel: {
    marginTop: spacing.lg,
    color: palette.muted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    marginTop: spacing.xs,
    color: palette.ink,
    fontFamily: typography.fontFamily.rounded,
    fontSize: typography.fontSize.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.fontWeight.extrabold,
  },
  description: {
    marginTop: spacing.sm,
    color: palette.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.lg,
    backgroundColor: palette.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: palette.muted,
    fontSize: 11,
  },
  infoValue: {
    marginTop: spacing.xxs,
    color: palette.ink,
    fontSize: 13,
    fontWeight: '600',
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderRadius: 16,
    backgroundColor: palette.softSky,
  },
  noticeText: {
    flex: 1,
    color: palette.ink,
    fontSize: 11,
    lineHeight: 17,
  },
  notFoundCard: {
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: 24,
    backgroundColor: palette.white,
  },
  notFoundTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  notFoundDescription: {
    marginTop: spacing.xs,
    color: palette.muted,
    fontSize: 13,
    textAlign: 'center',
  },
  returnButton: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: 24,
    backgroundColor: palette.coral,
  },
  returnButtonText: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.78,
  },
});
